# Hướng dẫn Quét Mã Vạch Barcode (1D) và Mã QR Code (2D) trong Photo Packing

Tài liệu này giải thích cơ chế đọc mã vạch **Barcode** hiện tại của ứng dụng, đồng thời lưu giữ toàn bộ mã nguồn và hướng dẫn về cơ chế đọc **QR Code (jsQR)** trước đây để bạn dễ dàng tham khảo hoặc chuyển đổi khi cần.

---

## 1. Tổng quan cơ chế đọc mã hiện tại (Barcode Engine)

Hệ thống hiện tại sử dụng cơ chế đọc mã vạch đa định dạng kết hợp 2 lớp (Two-tier Scanning Engine) tại file [`src/services/barcodeScanner.ts`](file:///d:/Workspace/ReactJS/DemoWithAI/src/services/barcodeScanner.ts):

1. **Lớp 1 - Native BarcodeDetector API**: 
   - Tận dụng phần cứng xử lý hình ảnh trực tiếp trên trình duyệt (Chrome trên Android, Edge).
   - Tốc độ đọc cực nhanh (gần như tức thì) và tiết kiệm pin cho thiết bị di động của công nhân.
2. **Lớp 2 - Fallback `@zxing/library` (Zebra Crossing)**:
   - Thư viện đọc mã vạch mã nguồn mở chuẩn công nghiệp cho JavaScript/TypeScript.
   - Hỗ trợ toàn diện các mã vạch công nghiệp 1D và 2D:
     - **Code 128**: Định dạng mã vạch phổ biến nhất trên phiếu PO / phiếu xuất xưởng.
     - **Code 39 / Code 93**: Dùng rộng rãi trong logistics và phụ tùng cơ khí.
     - **EAN-13 / EAN-8 / UPC**: Mã vạch thương mại sản phẩm.
     - **ITF (Interleaved 2 of 5)**: Thường in trên thùng carton vận chuyển.
     - **QR Code & Data Matrix**: Mã 2D công nghiệp.

---

## 2. Mã nguồn đọc QR Code (jsQR) trước đây để tham khảo

Trước khi chuyển sang Barcode, ứng dụng sử dụng thư viện `jsQR` để đọc mã QR 2D từ dữ liệu điểm ảnh `ImageData`.

### 2.1. Cài đặt thư viện jsQR
```bash
npm install jsqr
npm install --save-dev @types/jsqr # nếu cần types
```

### 2.2. Đoạn mã đọc QR Code từ Canvas (trong CameraPage sau khi bấm chụp)
```typescript
import jsQR from "jsqr"

function scanQRCodeFromCanvas(canvas: HTMLCanvasElement): string | null {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  // Lấy dữ liệu điểm ảnh thô (RGBA)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  try {
    // Gọi thuật toán nhận diện QR Code
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "attemptBoth", // Thử cả nền trắng chữ đen và nền đen chữ trắng
    })

    if (code && code.data && code.data.trim()) {
      return code.data.trim()
    }
  } catch (error) {
    console.error("Lỗi khi giải mã QR Code:", error)
  }

  return null
}
```

### 2.3. Đoạn mã quét QR Code Real-time liên tục (trong ScanPage)
```typescript
import jsQR from "jsqr"

// Vòng lặp quét mỗi 250ms từ Video stream
scanIntervalRef.current = window.setInterval(() => {
  const video = videoRef.current
  const canvas = canvasRef.current
  if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) return

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.drawImage(video, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "attemptBoth",
  })

  if (code?.data?.trim()) {
    const scannedValue = code.data.trim()
    // Tra cứu PO tương ứng
    const po = lookupPOByBarcode(scannedValue)
    if (po) {
      onPODetected(po)
    }
  }
}, 250)
```

---

## 3. So sánh: Barcode 1D (Code 128) vs. QR Code (2D)

| Tiêu chí | Mã vạch Barcode 1D (Code 128 / Code 39) | Mã QR Code 2D |
|---|---|---|
| **Hình dạng** | Các sọc dọc đen trắng xếp thành hàng ngang (chữ nhật rộng) | Ma trận các điểm vuông (hình vuông) |
| **Ứng dụng thực tế** | In trực tiếp trên phiếu chỉ thị PO, tem nhãn phụ tùng, súng bắn barcode của máy quét công nghiệp | Nhãn QR điện tử, link web, tem kiểm định thông tin phong phú |
| **Khung nhắm camera** | Khung chữ nhật nằm ngang (`w-80 h-44`) | Khung vuông (`w-64 h-64`) |
| **Khả năng quét từ xa** | Dễ nhận diện ở góc chụp rộng ngang | Cần căn chỉnh trực diện 4 góc vuông |

---

## 4. Xử lý định dạng chuỗi PO nhiều thành phần

Trong nhà máy, mã vạch in trên phiếu chỉ thị PO thường chứa nhiều trường thông tin ngăn cách nhau bởi dấu chấm phẩy `;`:
```text
101008211704;KXL06150M-N2-F;XSDD2026031200994;1;
└── Số PO ──┘ └─── Mã hàng ───┘ └── Số lệnh sản xuất ──┘ └─ Qty ─┘
```

Hàm tra cứu tại [`src/services/poLookup.ts`](file:///d:/Workspace/ReactJS/DemoWithAI/src/services/poLookup.ts) đã được xây dựng sẵn để:
1. Tự động nhận diện chuỗi đầy đủ.
2. Tách chuỗi theo dấu `;` và lấy thành phần đầu tiên `101008211704` để đối chiếu PO.
3. Hỗ trợ tìm kiếm theo mã sản phẩm hoặc số lệnh trong cùng một mã vạch.

---

## 5. Quy tắc đọc mã và kiểm tra hợp lệ hiện tại

Hệ thống đã được chuẩn hóa để **chỉ còn chế độ đọc cả hai ("both")**:

1. **Chế độ quét duy nhất**:
   - Quét đồng thời cả **Barcode 1D** và **QR Code 2D**.
   - Bắt mã đầu tiên phát hiện được trong khung ngắm hoặc trên ảnh chụp.
   - Đã loại bỏ thanh chuyển đổi 3 chế độ (UI Switcher) để thao tác quét diễn ra nhanh chóng, công nhân không cần chọn chế độ thủ công.

2. **Quy tắc kiểm tra mã QR Code**:
   - Nếu mã bắt được là **QR Code**:
     - Ứng dụng tiến hành tách chuỗi theo ký tự `;` (`split(";")`).
     - Số PO được lấy từ phần tử đầu tiên sau khi tách: `const po = parts[0]?.trim()`.
     - **Kiểm tra tính hợp lệ**: Số PO bắt buộc phải là **chuỗi 12 ký tự số** (`/^\d{12}$/`).
     - Nếu không thỏa mãn (ví dụ: chứa chữ cái, ít hơn hoặc nhiều hơn 12 chữ số): **Trả về thông báo lỗi ngay lập tức** và không cho phép gửi ảnh hoặc chuyển màn hình.

3. **Quy tắc mã Barcode 1D**:
   - Đọc giá trị mã vạch và tra cứu trực tiếp trong cơ sở dữ liệu PO.

4. **Nhận biết loại mã trong Dialog Xác nhận**:
   - 🏷️ **`Barcode (CODE_128)`** (màu xanh Cyan) nếu nhận diện từ mã vạch sọc.
   - 📱 **`QR Code`** (màu tím Violet) nếu nhận diện từ mã vuông QR.


