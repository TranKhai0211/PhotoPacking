import type { PhotoPackingSummary } from "./photoPackingSummary"

export interface PhotoPackingItem {
    pO: string;
    productCode: string;
    productName: string;
    group: string;
    creator: string;
    createTime: Date | string;
    updator: string;
    updatedTime: Date | string;
    stepNo: number;
    /** Đường dẫn ảnh chụp thực tế của bước này (lấy từ API on-demand khi xem ảnh hoặc tại CameraPage) */
    photoUrl?: string;
    /** Ảnh mẫu template đối chiếu cho bước này */
    samplePhotoUrl?: string;
    /** Ghi chú kiểm tra cho bước này nếu có */
    notes?: string;
}

/**
 * Cast PhotoPackingItem sang PhotoPackingSummary theo quy chuẩn:
 * trạng thái (statusId) = 3 (Hoàn thành), currentStep = stepNo, totalStep = 0
 * Phục vụ cho danh sách trả về ở tab Đã hoàn tất
 */
export function castItemToSummary(
    item: PhotoPackingItem,
    extra?: Partial<PhotoPackingSummary>
): PhotoPackingSummary {
    return {
        pO: item.pO,
        productCode: item.productCode,
        productName: item.productName,
        group: item.group,
        creator: item.creator,
        createTime: item.createTime,
        updator: item.updator,
        updatedTime: item.updatedTime,
        type: extra?.type || "Đóng gói tiêu chuẩn",
        productKey: extra?.productKey || "",
        totalStep: 0, // Theo yêu cầu: TotalStep = 0 cho các item hoàn tất đã cast
        currentStep: item.stepNo, // Theo yêu cầu: currentStep = StepNo
        notes: extra?.notes || item.notes || "",
        statusId: 3, // Trạng thái = 3 ("Hoàn thành")
        photoUrls: item.photoUrl ? [item.photoUrl] : extra?.photoUrls || [],
        samplePhotoUrl: item.samplePhotoUrl || extra?.samplePhotoUrl,
    }
}