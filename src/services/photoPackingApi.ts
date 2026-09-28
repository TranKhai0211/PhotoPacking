export interface SubmitPhotoParams {
  po: string
  stepNumber: number
  imageBase64: string
  productName?: string
}

export interface SubmitPhotoResult {
  success: boolean
  message: string
}

export interface ConfirmStepParams {
  po: string
  stepNumber: number
}

export interface ConfirmStepResult {
  success: boolean
  message: string
}

/**
 * Giả lập API gửi ảnh chụp lên server (Send API lần 1)
 * Trả về kết quả thành công hoặc thất bại sau khoảng thời gian xử lý
 */
export async function submitPhoto(
  params: SubmitPhotoParams
): Promise<SubmitPhotoResult> {
  // Giả lập network delay từ server backend
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // 95% success rate cho demo
  const isSuccess = Math.random() > 0.05

  if (isSuccess) {
    return {
      success: true,
      message: `Ảnh chụp bước ${params.stepNumber} cho PO ${params.po} đã được hệ thống ghi nhận thành công.`,
    }
  }

  return {
    success: false,
    message: "Lỗi kết nối server. Vui lòng kiểm tra mạng và thử lại.",
  }
}

/**
 * Giả lập API xác nhận hoàn tất bước chụp (Send API lần 2)
 * Gọi sau khi người dùng so sánh ảnh chụp với ảnh mẫu và bấm xác nhận
 */
export async function confirmStep(
  params: ConfirmStepParams
): Promise<ConfirmStepResult> {
  // Giả lập network delay từ server backend
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    message: `Bước ${params.stepNumber} cho PO ${params.po} đã được xác nhận hoàn tất thành công.`,
  }
}
