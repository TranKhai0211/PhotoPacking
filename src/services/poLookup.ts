import { MOCK_PHOTO_PACKING_ITEMS } from "@/data/mockPhotoPacking"
import type { PhotoPackingItem } from "@/types/photoPacking"
import type { OrderItem } from "@/types/orderItem"

/**
 * Tra cứu PO theo mã barcode/QR đã quét
 * Tìm trong danh sách MOCK_PHOTO_PACKING_ITEMS theo trường po hoặc qrPayload
 */
export function lookupPOByBarcode(barcodeValue: string): PhotoPackingItem | null {
  if (!barcodeValue) return null
  const normalized = barcodeValue.trim().toLowerCase()
  return (
    MOCK_PHOTO_PACKING_ITEMS.find((item) => {
      const itemPO = item.po.trim().toLowerCase()
      const itemQR = item.qrPayload?.trim().toLowerCase()

      // 1. Khớp chính xác
      if (itemPO === normalized || itemQR === normalized) return true

      // 2. Tách các thành phần cách nhau bằng dấu chấm phẩy (PO;Mã hàng;Số lô;Số lượng)
      const poParts = itemPO.split(";").map((p) => p.trim()).filter(Boolean)
      const scannedParts = normalized.split(";").map((p) => p.trim()).filter(Boolean)

      // Khớp số PO chính (phần đầu tiên trước dấu ;)
      if (poParts.length > 0 && poParts[0] === normalized) return true
      if (scannedParts.length > 0 && poParts[0] === scannedParts[0]) return true

      // Khớp bất kỳ phần tử nào trong chuỗi mã vạch
      if (poParts.includes(normalized)) return true
      if (scannedParts.some((part) => poParts.includes(part))) return true

      // 3. Khớp chuỗi con nếu mã quét có độ dài từ 5 ký tự trở lên
      if (normalized.length >= 5 && (itemPO.includes(normalized) || normalized.includes(itemPO))) {
        return true
      }

      return false
    }) ?? null
  )
}

/**
 * Tìm PhotoPackingItem phù hợp nhất cho OrderItem đã chọn trên danh sách
 * Dùng cho trường hợp người dùng vào Camera từ nút trên PO card
 * nhưng ảnh chụp không chứa barcode đọc được
 */
export function lookupPOForOrder(order: OrderItem): PhotoPackingItem | null {
  const isCompleted = order.status === "completed"

  if (isCompleted) {
    return (
      MOCK_PHOTO_PACKING_ITEMS.find((item) => item.status === "completed") ??
      MOCK_PHOTO_PACKING_ITEMS[0] ??
      null
    )
  }

  // Cho đơn hàng pending/retake, tìm PO chưa hoàn tất
  const candidates = MOCK_PHOTO_PACKING_ITEMS.filter(
    (item) => item.status !== "completed"
  )
  return candidates[0] ?? MOCK_PHOTO_PACKING_ITEMS[0] ?? null
}
