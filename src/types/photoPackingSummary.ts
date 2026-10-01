export interface PhotoPackingSummary {
    pO: string;
    productCode: string;
    productName: string;
    group: string;
    creator: string;
    createTime: Date | string;
    updator: string;
    updatedTime: Date | string;
    type: string;
    productKey: string;
    totalStep: number;
    currentStep: number;
    notes: string;
    statusId: number;
    /** Danh sách URL ảnh đã chụp (được lấy theo nhu cầu từ API khi mở dialog xem ảnh hoặc trong CameraPage) */
    photoUrls?: string[];
    /** Ảnh mẫu template đối chiếu */
    samplePhotoUrl?: string;
}

const STATUS_TEXT: Record<number, string> = {
    0: "Chờ chụp",
    1: "Đang chụp",
    2: "Chụp lại",
    3: "Hoàn thành",
};

const getStatusText = (statusId: number): string => {
    return STATUS_TEXT[statusId] || "Không xác định";
};

export { STATUS_TEXT, getStatusText };