import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from "@zxing/library"
import jsQR from "jsqr"
import { SCAN_CONFIG, type ScanMode } from "@/config/scanConfig"

export interface BarcodeScanResult {
  text: string
  format?: string
  codeType: "barcode" | "qrcode"
}

// 1. Danh sách định dạng Barcode 1D (Mã vạch sọc công nghiệp)
const BARCODE_1D_FORMATS: BarcodeFormat[] = [
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.CODE_93,
  BarcodeFormat.CODABAR,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.ITF,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
]

// 2. Danh sách định dạng QR Code 2D
const QRCODE_2D_FORMATS: BarcodeFormat[] = [
  BarcodeFormat.QR_CODE,
  BarcodeFormat.DATA_MATRIX,
]

// 3. Toàn bộ định dạng (Both)
const ALL_FORMATS: BarcodeFormat[] = [
  ...BARCODE_1D_FORMATS,
  ...QRCODE_2D_FORMATS,
]

// Tạo các Reader tương ứng cho từng chế độ để tối ưu hiệu năng
function createReader(formats: BarcodeFormat[]) {
  const hints = new Map<DecodeHintType, any>()
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
  hints.set(DecodeHintType.TRY_HARDER, true)
  const reader = new MultiFormatReader()
  reader.setHints(hints)
  return reader
}

const barcodeOnlyReader = createReader(BARCODE_1D_FORMATS)
const qrOnlyReader = createReader(QRCODE_2D_FORMATS)
const bothReader = createReader(ALL_FORMATS)

/**
 * Đọc mã vạch Barcode hoặc QR Code từ HTMLCanvasElement theo chế độ (ScanMode)
 *
 * @param canvas Canvas chứa hình ảnh frame video hoặc ảnh chụp
 * @param mode Chế độ quét ("barcode" | "qrcode" | "both") - Mặc định lấy từ SCAN_CONFIG.ACTIVE_MODE
 */
export async function scanBarcodeFromCanvas(
  canvas: HTMLCanvasElement,
  mode: ScanMode = SCAN_CONFIG.ACTIVE_MODE
): Promise<BarcodeScanResult | null> {
  if (!canvas || canvas.width === 0 || canvas.height === 0) return null

  // Xác định danh sách format tương ứng cho BarcodeDetector native
  const nativeBarcodeFormats = [
    "code_128",
    "code_39",
    "code_93",
    "codabar",
    "ean_13",
    "ean_8",
    "itf",
    "upc_a",
    "upc_e",
  ]
  const nativeQRFormats = ["qr_code", "data_matrix"]

  const targetNativeFormats =
    mode === "barcode"
      ? nativeBarcodeFormats
      : mode === "qrcode"
      ? nativeQRFormats
      : [...nativeBarcodeFormats, ...nativeQRFormats]

  // 1. Thử BarcodeDetector native của trình duyệt (Chrome Android, Edge)
  if (typeof window !== "undefined" && "BarcodeDetector" in window) {
    try {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: targetNativeFormats,
      })
      const detected = await barcodeDetector.detect(canvas)
      if (detected && detected.length > 0 && detected[0].rawValue?.trim()) {
        const rawFormat = (detected[0].format || "").toLowerCase()
        const isQR = rawFormat.includes("qr") || rawFormat.includes("matrix")
        return {
          text: detected[0].rawValue.trim(),
          format: detected[0].format || (isQR ? "QR_CODE" : "CODE_128"),
          codeType: isQR ? "qrcode" : "barcode",
        }
      }
    } catch {
      // BarcodeDetector không khả dụng hoặc lỗi -> tiếp tục sang ZXing
    }
  }

  // 2. Sử dụng @zxing/library theo chế độ đã cấu hình
  const activeReader =
    mode === "barcode"
      ? barcodeOnlyReader
      : mode === "qrcode"
      ? qrOnlyReader
      : bothReader

  let ctx: CanvasRenderingContext2D | null = null
  let imageData: ImageData | null = null

  try {
    ctx = canvas.getContext("2d")
    if (!ctx) return null

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const luminanceSource = new RGBLuminanceSource(
      new Uint8ClampedArray(imageData.data.buffer),
      canvas.width,
      canvas.height
    )
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource))
    const result = activeReader.decode(binaryBitmap)

    if (result && result.getText()?.trim()) {
      const formatEnum = result.getBarcodeFormat()
      const formatName = BarcodeFormat[formatEnum] || "BARCODE"
      const isQR =
        formatEnum === BarcodeFormat.QR_CODE ||
        formatEnum === BarcodeFormat.DATA_MATRIX ||
        formatName.toLowerCase().includes("qr")

      return {
        text: result.getText().trim(),
        format: formatName,
        codeType: isQR ? "qrcode" : "barcode",
      }
    }
  } catch {
    // Không tìm thấy mã trong ZXing
  }

  // 3. Fallback chuyên biệt cho QR Code (jsQR) khi ở chế độ "qrcode" hoặc "both"
  if (mode !== "barcode" && imageData) {
    const legacyQRText = scanQRCodeLegacy(imageData)
    if (legacyQRText) {
      return {
        text: legacyQRText,
        format: "QR_CODE (jsQR)",
        codeType: "qrcode",
      }
    }
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
