/**
 * =============================================================================
 * CẤU HÌNH CHẾ ĐỘ QUÉT MÃ TOÀN HỆ THỐNG (SCAN CONFIGURATION)
 * =============================================================================
 * Bạn có thể dễ dàng thay đổi giá trị của `ACTIVE_MODE` bên dưới để kiểm thử:
 *
 * - "both"    : Quét song song cả Barcode 1D (Code 128, Code 39...) và QR Code 2D (Mặc định khuyến nghị)
 * - "barcode" : CHỈ quét mã vạch 1D (Code 128, Code 39, EAN, ITF) - Viewfinder chữ nhật ngang
 * - "qrcode"  : CHỈ quét mã vuông 2D (sử dụng jsQR / ZXing QR) - Viewfinder hình vuông
 */

export type ScanMode = "barcode" | "qrcode" | "both"

export const SCAN_CONFIG = {
  /**
   * 🚩 FLAG CHÍNH: Thay đổi giá trị này để kiểm thử một trong các chế độ:
   * Giá trị: "both" | "barcode" | "qrcode"
   */
  ACTIVE_MODE: "both" as ScanMode,

  /**
   * Bật/Tắt thanh chuyển đổi chế độ trực tiếp trên màn hình quét (UI Mode Switcher).
   * Khi bật (true), bạn có thể click chuyển đổi nhanh giữa Barcode và QR Code
   * ngay trên trình duyệt mà không cần phải vào code sửa cờ mỗi lần!
   */
  ENABLE_UI_SWITCHER: true,
}
