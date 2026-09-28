import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from "@zxing/library"
import jsQR from "jsqr"

export interface BarcodeScanResult {
  text: string
  format?: string
}

/**
 * Danh sách định dạng mã vạch Barcode 1D & 2D được hỗ trợ:
 * Ưu tiên các mã vạch công nghiệp 1D phổ biến trên phiếu chỉ thị PO / nhãn đóng gói:
 * - Code 128 (mã vạch PO tiêu chuẩn công nghiệp)
 * - Code 39 / Code 93
 * - EAN-13 / EAN-8 / UPC-A / UPC-E
 * - ITF (Interleaved 2 of 5 - thường in trên thùng carton)
 * - Codabar
 * Và hỗ trợ cả 2D: QR Code, Data Matrix
 */
const SUPPORTED_FORMATS: BarcodeFormat[] = [
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.CODE_93,
  BarcodeFormat.CODABAR,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.ITF,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.QR_CODE,
  BarcodeFormat.DATA_MATRIX,
]

// Khởi tạo Reader với cấu hình hints
const hints = new Map<DecodeHintType, any>()
hints.set(DecodeHintType.POSSIBLE_FORMATS, SUPPORTED_FORMATS)
hints.set(DecodeHintType.TRY_HARDER, true)

const zxingReader = new MultiFormatReader()
zxingReader.setHints(hints)

/**
 * Đọc mã vạch Barcode từ HTMLCanvasElement
 * 1. Thử BarcodeDetector native của trình duyệt (nếu thiết bị/trình duyệt hỗ trợ)
 * 2. Fallback sang @zxing/library (hỗ trợ toàn diện Code 128, Code 39, EAN, ITF...)
 */
export async function scanBarcodeFromCanvas(
  canvas: HTMLCanvasElement
): Promise<BarcodeScanResult | null> {
  if (!canvas || canvas.width === 0 || canvas.height === 0) return null

  // 1. Thử BarcodeDetector API (rất nhanh trên Chrome Android / Edge)
  if (typeof window !== "undefined" && "BarcodeDetector" in window) {
    try {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: [
          "code_128",
          "code_39",
          "code_93",
          "codabar",
          "ean_13",
          "ean_8",
          "itf",
          "upc_a",
          "upc_e",
          "qr_code",
          "data_matrix",
        ],
      })
      const detected = await barcodeDetector.detect(canvas)
      if (detected && detected.length > 0 && detected[0].rawValue?.trim()) {
        return {
          text: detected[0].rawValue.trim(),
          format: detected[0].format || "barcode",
        }
      }
    } catch {
      // BarcodeDetector lỗi hoặc chưa hỗ trợ định dạng này -> fallback sang ZXing
    }
  }

  // 2. Fallback sang @zxing/library
  try {
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const luminanceSource = new RGBLuminanceSource(
      new Uint8ClampedArray(imageData.data.buffer),
      canvas.width,
      canvas.height
    )
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource))
    const result = zxingReader.decode(binaryBitmap)

    if (result && result.getText()?.trim()) {
      const formatEnum = result.getBarcodeFormat()
      const formatName = BarcodeFormat[formatEnum] || "BARCODE"
      return {
        text: result.getText().trim(),
        format: formatName,
      }
    }
  } catch {
    // Không tìm thấy mã vạch hợp lệ trong frame này
  }

  return null
}

/**
 * =============================================================================
 * [MÃ NGUỒN THAM KHẢO - ĐỌC QRCODE BẰNG JSQR TRƯỚC ĐÂY]
 * =============================================================================
 * Hàm này giữ lại để bạn tham khảo cách đọc mã QR bằng thư viện jsQR.
 * Nếu muốn sử dụng lại jsQR cho QR Code, bạn có thể gọi trực tiếp hàm này.
 *
 * @param imageData Đối tượng ImageData từ canvas.getContext("2d").getImageData()
 * @returns Nội dung chuỗi đọc được từ QR Code hoặc null nếu không tìm thấy
 */
export function scanQRCodeLegacy(imageData: ImageData): string | null {
  try {
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "attemptBoth",
    })
    if (code?.data?.trim()) {
      return code.data.trim()
    }
  } catch (error) {
    console.warn("Lỗi khi đọc QRCode bằng jsQR:", error)
  }
  return null
}
