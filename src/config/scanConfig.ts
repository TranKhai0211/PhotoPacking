/**
 * =============================================================================
 * CẤU HÌNH CHẾ ĐỘ QUÉT MÃ TOÀN HỆ THỐNG (SCAN CONFIGURATION)
 * =============================================================================
 * Hệ thống hoạt động ở chế độ quét đồng thời cả Barcode 1D và QR Code 2D ("both").
 * Bắt mã đầu tiên phát hiện được, nếu là QR Code sẽ tách chuỗi theo dấu ";" và lấy PO là phần đầu.
 */

export type ScanMode = "barcode" | "qrcode" | "both"

export const SCAN_CONFIG = {
  /**
   * 🚩 Chế độ quét cố định toàn hệ thống: luôn đọc cả hai (Barcode 1D và QR Code 2D)
   */
  ACTIVE_MODE: "both" as ScanMode,

  /**
   * Thanh chuyển đổi chế độ UI Switcher (Đã tắt do hệ thống chỉ còn chế độ đọc cả hai)
   */
  ENABLE_UI_SWITCHER: false,
}

