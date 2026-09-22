/**
 * Định nghĩa Type cho hệ thống Quản lý Đóng gói và Chụp ảnh (Photo Packing System)
 * Dựa trên cấu trúc dữ liệu từ file PhotoPackingSummary.xlsx
 */

export type PackingStatus = "pending" | "in_progress" | "completed";

export type ProductType = "DAY DIEN" | "KGW" | "SI";

export interface PackingStepPhoto {
  stepNumber: number;
  title: string;
  description: string;
  isCompleted: boolean;
  photoUrl?: string;
  thumbnailUrl?: string;
  capturedAt?: string;
  formattedCapturedAt?: string;
  operatorId?: string;
  notes?: string;
}

export interface PhotoPackingItem {
  // === Các trường nguyên bản từ file Excel PhotoPackingSummary.xlsx ===
  po: string;               // PO: Mã chỉ thị đơn hàng (VD: "101008323849")
  productCode: string;      // ProductCode: Mã sản phẩm (VD: "H0090924")
  productName: string;      // ProductName: Tên quy cách sản phẩm (VD: "HF-KXG-0630-C-PT-HN")
  quantity: number;         // GAMNG: Số lượng yêu cầu đóng gói (VD: 10 hoặc 1)
  printFlag: string;        // PrintFLG: Trạng thái in nhãn/tem (VD: "9")
  deleteFlag: string | null;// DeleteFLG: Cờ xóa (VD: null / "NULL")
  group: string;            // Group: Phân xưởng / Nhóm (VD: "OSA")
  creator: string;          // Creator: Người tạo (VD: "F1-SERVEROST")
  cdtRaw: string;           // CDT: Ngày tạo gốc theo Excel serial date (VD: "46277")
  createdAt: string;        // Ngày tạo định dạng ISO 8601
  updator: string;          // Updator: Mã công nhân/kiểm soát viên cập nhật (VD: "10321", "12653")
  udtRaw: string;           // UDT: Thời gian cập nhật gốc theo Excel serial date
  updatedAt: string;        // Ngày giờ cập nhật định dạng ISO 8601
  type: ProductType;        // Type: Phân loại ("DAY DIEN" | "KGW" | "SI")
  productKey: string | null;// ProductKey: Khóa sản phẩm ("KXL" | "KGW" | null)
  totalStep: number;        // TotalStep: Tổng số bước chụp ảnh cần thiết (1 - 6)
  currentStep: number;      // CurrentStep: Số bước đã hoàn thành (0 - TotalStep)

  // === Các trường tiện ích mở rộng phục vụ UI/UX ===
  status: PackingStatus;           // "pending" (0 bước) | "in_progress" (1..n-1) | "completed" (đủ bước)
  progressPercent: number;         // Tỷ lệ % hoàn thành (0 - 100%)
  formattedCreatedAt: string;      // Ngày tạo hiển thị tiếng Việt (VD: "12/09/2026")
  formattedUpdatedAt: string;      // Ngày giờ cập nhật hiển thị (VD: "11/09/2026 16:19")
  steps: PackingStepPhoto[];       // Chi tiết từng bước kiểm tra và ảnh chụp
  qrPayload: string;               // Chuỗi mã hóa phục vụ máy quét QR (VD: PO hoặc JSON)
}

export interface PackingStatistics {
  totalOrders: number;
  completedOrders: number;
  inProgressOrders: number;
  pendingOrders: number;
  completionRate: number;          // Tỷ lệ hoàn thành chung (%)
  totalQuantity: number;           // Tổng số lượng sản phẩm cần đóng gói (tổng GAMNG)
  completedQuantity: number;       // Số lượng sản phẩm đã đóng gói xong
  byType: {
    dayDien: number;
    kgw: number;
    si: number;
  };
}

export interface PackingFilterParams {
  search?: string;                 // Tìm theo PO, ProductCode, ProductName
  status?: PackingStatus | "all";
  type?: ProductType | "all";
  updator?: string | "all";
  sortBy?: "po" | "updatedAt" | "progress" | "quantity";
  sortOrder?: "asc" | "desc";
}
