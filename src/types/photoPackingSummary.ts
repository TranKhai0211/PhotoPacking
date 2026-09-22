export interface PhotoPackingSummary {
    pO: string;
    productCode: string;
    productName: string;
    group: string;
    creator: string;
    createTime: Date;
    updator: string;
    updatedTime: Date;
    type: string;
    productKey: string;
    totalStep: number;
    notes: string;
    statusId: number;
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

export { getStatusText };