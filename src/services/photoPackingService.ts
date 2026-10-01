import type { PhotoPackingSummary } from "@/types/photoPackingSummary"
import { type PhotoPackingItem, castItemToSummary } from "@/types/photoPackingItem"
import {
  MOCK_PENDING_SUMMARIES,
  MOCK_PHOTO_PACKING_ITEMS,
} from "@/data/mockPhotoPacking"

/**
 * Giả lập API gọi lấy danh sách đơn hàng PO từ server backend
 * Trả về danh sách đơn hàng Chờ chụp và Đã hoàn tất sau khoảng thời gian xử lý của API.
 * 
 * LƯU Ý THEO YÊU CẦU:
 * 1. Tab "Chờ chụp": Chứa các PhotoPackingSummary có trạng thái "Chờ chụp" (0), "Đang chụp" (1), "Chụp lại" (2).
 * 2. Tab "Đã hoàn tất": Chứa các PhotoPackingItem được CAST sang PhotoPackingSummary với trạng thái = 3, currentStep = stepNo, totalStep = 0.
 * 3. Ảnh KHÔNG được nạp sẵn tại đây, chỉ được lấy về từ API on-demand khi mở dialog xem ảnh hoặc bên trong CameraPage.
 */
export async function fetchOrdersFromApi(): Promise<{
  pending: PhotoPackingSummary[]
  completed: PhotoPackingSummary[]
}> {
  // Giả lập độ trễ kết nối mạng từ server API (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 1. Tab Chờ chụp: statusId 0, 1, 2
  const pending: PhotoPackingSummary[] = MOCK_PENDING_SUMMARIES.filter(
    (item) => item.statusId === 0 || item.statusId === 1 || item.statusId === 2
  ).map((item) => ({
    ...item,
    photoUrls: [], // Ảnh chỉ lấy on-demand khi mở xem
  }))

  // 2. Tab Đã hoàn tất: Cast từ các PhotoPackingItem sang PhotoPackingSummary
  // với statusId = 3, currentStep = stepNo, totalStep = 0
  const completed: PhotoPackingSummary[] = MOCK_PHOTO_PACKING_ITEMS.filter(
    (item) => item.photoUrl !== undefined
  ).map((item) =>
    castItemToSummary(item, {
      photoUrls: [], // Không nạp sẵn ảnh, tải on-demand khi bấm nút "Xem"
    })
  )

  return { pending, completed }
}

/**
 * API ON-DEMAND: Lấy ảnh đã chụp và ảnh mẫu đối chiếu cho một PO cụ thể
 * Chỉ được gọi khi người dùng bấm nút "Xem" mở Dialog xem ảnh hoặc bên trong CameraPage
 */
export async function fetchPhotosForOrderApi(
  po: string,
  stepNo?: number
): Promise<{ photoUrls: string[]; samplePhotoUrl?: string }> {
  // Giả lập độ trễ tải ảnh từ storage/CDN (200ms)
  await new Promise((resolve) => setTimeout(resolve, 200))

  const cleanPO = po.trim().toLowerCase()
  const matchedItems = MOCK_PHOTO_PACKING_ITEMS.filter((item) => {
    const itemPO = item.pO.trim().toLowerCase()
    const poMatch = itemPO === cleanPO || itemPO.includes(cleanPO) || cleanPO.includes(itemPO)
    if (!poMatch) return false
    if (stepNo !== undefined && item.stepNo !== stepNo) return false
    return true
  })

  const photoUrls: string[] = []
  let samplePhotoUrl: string | undefined

  matchedItems.forEach((item) => {
    if (item.photoUrl) photoUrls.push(item.photoUrl)
    if (item.samplePhotoUrl && !samplePhotoUrl) samplePhotoUrl = item.samplePhotoUrl
  })

  // Nếu không tìm thấy trong mock chi tiết, dùng ảnh mẫu dự phòng chất lượng cao
  if (photoUrls.length === 0) {
    photoUrls.push(
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    )
  }

  return { photoUrls, samplePhotoUrl }
}

/**
 * API ON-DEMAND: Lấy thông tin PhotoPackingItem của một bước chụp cụ thể bên trong CameraPage
 * Dùng để hiển thị ảnh mẫu template đối chiếu khi chuẩn bị chụp bước đó
 */
export async function fetchStepItemApi(
  po: string,
  stepNo: number
): Promise<PhotoPackingItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 150))

  const cleanPO = po.trim().toLowerCase()
  const found = MOCK_PHOTO_PACKING_ITEMS.find((item) => {
    const itemPO = item.pO.trim().toLowerCase()
    return (
      (itemPO === cleanPO || itemPO.includes(cleanPO) || cleanPO.includes(itemPO)) &&
      item.stepNo === stepNo
    )
  })

  if (found) return found

  // Nếu chưa có, trả về item mặc định có template đối chiếu
  return {
    pO: po,
    productCode: "MẪU",
    productName: "Quy chuẩn đóng gói",
    group: "OSA",
    creator: "SYSTEM",
    createTime: new Date(),
    updator: "SYSTEM",
    updatedTime: new Date(),
    stepNo,
    samplePhotoUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    notes: `Bước ${stepNo}: Chụp ảnh đối chiếu sản phẩm và tem nhãn`,
  }
}
