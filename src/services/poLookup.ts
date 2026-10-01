import { MOCK_PHOTO_PACKING_SUMMARIES } from "@/data/mockPhotoPacking"
import type { PhotoPackingSummary } from "@/types/photoPackingSummary"

export interface ProcessScannedCodeResult {
  success: boolean
  poCode?: string
  poSummary?: PhotoPackingSummary
  codeType: "barcode" | "qrcode"
  format?: string
  rawText: string
  errorMessage?: string
}

/**
 * Tra cứu PO theo mã barcode/QR đã quét
 * Tìm trong danh sách MOCK_PHOTO_PACKING_SUMMARIES theo trường pO
 */
export function lookupPOByBarcode(barcodeValue: string): PhotoPackingSummary | null {
  if (!barcodeValue) return null
  const normalized = barcodeValue.trim().toLowerCase()

  const found = MOCK_PHOTO_PACKING_SUMMARIES.find((item) => {
    const itemPO = item.pO.trim().toLowerCase()

    // 1. Khớp chính xác
    if (itemPO === normalized) return true

    // 2. Tách các thành phần cách nhau bằng dấu chấm phẩy (PO;Mã hàng;Số lô;Số lượng)
    const poParts = itemPO.split(";").map((p) => p.trim()).filter(Boolean)
    const scannedParts = normalized.split(";").map((p) => p.trim()).filter(Boolean)

    // Khớp số PO chính (phần đầu tiên trước dấu ;)
    if (poParts.length > 0 && poParts[0] === normalized) return true
    if (scannedParts.length > 0 && poParts[0] === scannedParts[0]) return true

    // Khớp bất kỳ phần tử nào trong chuỗi mã vạch
    if (poParts.includes(normalized)) return true
    if (scannedParts.some((part) => poParts.includes(part))) return true

    // 3. Khớp chuỗi con nếu mã quét có độ dài từ 4 ký tự trở lên
    if (normalized.length >= 4 && (itemPO.includes(normalized) || normalized.includes(itemPO))) {
      return true
    }

    return false
  }) ?? null

  if (found) return found

  // Nếu là mã PO 12 chữ số hợp lệ nhưng chưa có sẵn trong danh sách mẫu,
  // tự động tạo đối tượng PO hợp lệ để phục vụ kiểm thử linh hoạt
  if (/^\d{12}$/.test(normalized)) {
    return {
      pO: normalized,
      productCode: `PRD-${normalized.slice(-4)}`,
      productName: `Sản phẩm đơn hàng #${normalized}`,
      group: "OSA",
      creator: "SCANNER",
      createTime: new Date().toISOString(),
      updator: "#SCAN",
      updatedTime: new Date().toISOString(),
      type: "Tiêu chuẩn",
      productKey: "PRD",
      totalStep: 3,
      currentStep: 0,
      notes: "Đơn hàng nhận diện tự động từ mã QR/Barcode",
      statusId: 0,
    }
  }

  return null
}

/**
 * Xử lý kết quả quét mã đầu tiên bắt được (Barcode hoặc QR Code).
 *
 * Quy tắc nghiệp vụ:
 * 1. Ứng dụng đọc mã đầu tiên bắt được.
 * 2. Nếu là QRCode:
 *    - Tách chuỗi theo ký tự ";"
 *    - Lấy PO là phần đầu tiên sau khi tách.
 *    - Nếu PO không phải là chuỗi 12 ký tự số (/^\d{12}$/) -> Trả lỗi.
 * 3. Nếu là Barcode 1D:
 *    - Tra cứu PO theo chuỗi mã vạch.
 */
export function processScannedBarcodeResult(scanResult: {
  text: string
  format?: string
  codeType: "barcode" | "qrcode"
}): ProcessScannedCodeResult {
  const rawText = scanResult.text.trim()
  const codeType = scanResult.codeType

  // Trường hợp 1: Mã QR Code 2D
  if (codeType === "qrcode") {
    // Tách chuỗi theo ký tự ";"
    const parts = rawText.split(";")
    const poCandidate = (parts[0] ?? "").trim()

    // Kiểm tra: PO phải là chuỗi 12 ký tự số
    const is12DigitNumber = /^\d{12}$/.test(poCandidate)
    if (!is12DigitNumber) {
      return {
        success: false,
        codeType: "qrcode",
        format: scanResult.format,
        rawText,
        poCode: poCandidate,
        errorMessage: `Mã QR không hợp lệ: PO phải là chuỗi 12 ký tự số (nhận được: "${poCandidate || rawText}").`,
      }
    }

    // Tra cứu PO tương ứng trong hệ thống
    const poSummary = lookupPOByBarcode(poCandidate)
    if (!poSummary) {
      return {
        success: false,
        codeType: "qrcode",
        format: scanResult.format,
        rawText,
        poCode: poCandidate,
        errorMessage: `Không tìm thấy thông tin đơn hàng cho PO "${poCandidate}".`,
      }
    }

    return {
      success: true,
      codeType: "qrcode",
      format: scanResult.format,
      rawText,
      poCode: poCandidate,
      poSummary,
    }
  }

  // Trường hợp 2: Mã vạch Barcode 1D
  const poSummary = lookupPOByBarcode(rawText)
  if (!poSummary) {
    return {
      success: false,
      codeType: "barcode",
      format: scanResult.format,
      rawText,
      errorMessage: `Mã Barcode "${rawText.length > 25 ? rawText.slice(0, 25) + "..." : rawText}" không khớp đơn hàng nào.`,
    }
  }

  return {
    success: true,
    codeType: "barcode",
    format: scanResult.format,
    rawText,
    poCode: poSummary.pO,
    poSummary,
  }
}

