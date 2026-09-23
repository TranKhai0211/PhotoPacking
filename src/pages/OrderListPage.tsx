import { useState, useMemo } from "react"
import {
  RotateCcw,
  X,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { OrderItem } from "@/types/orderItem"

// 12 Đơn hàng mẫu cho Tab "Chờ chụp" (khớp số lượng thống kê 12)
const PENDING_ORDERS_MOCK: OrderItem[] = [
  {
    id: "ord-8715-p",
    orderNumber: "8715",
    product: "PKG-8810-EL",
    packageType: "Hộp carton cỡ nhỡ",
    stepCurrent: 0,
    stepTotal: 3,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 14:10",
    operatorId: "#84920",
  },
  {
    id: "ord-8712-p",
    orderNumber: "8712",
    product: "ABD00-193DF",
    packageType: "Thùng carton 5 lớp",
    stepCurrent: 1,
    stepTotal: 2,
    status: "retake",
    statusBadgeText: "Chụp lại",
    updatedAt: "22/09/2026 13:45",
    operatorId: "#84920",
  },
  {
    id: "ord-8714-p",
    orderNumber: "8714",
    product: "XMA-5502-QN",
    packageType: "Hộp carton cỡ nhỏ",
    stepCurrent: 2,
    stepTotal: 3,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    avatars: ["1", "2", "+2"],
    updatedAt: "22/09/2026 14:20",
    operatorId: "#84920",
  },
  {
    id: "ord-8709-p",
    orderNumber: "8709",
    product: "VTX-1029-BB",
    packageType: "Túi niêm phong PE",
    stepCurrent: 0,
    stepTotal: 2,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 14:05",
    operatorId: "#84920",
  },
  {
    id: "ord-8706-p",
    orderNumber: "8706",
    product: "KGW-8831-VN",
    packageType: "Hộp carton cỡ nhỡ",
    stepCurrent: 1,
    stepTotal: 3,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 13:30",
    operatorId: "#84920",
  },
  {
    id: "ord-8703-p",
    orderNumber: "8703",
    product: "HF-KXG-0630-C",
    packageType: "Thùng carton 3 lớp",
    stepCurrent: 0,
    stepTotal: 1,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 13:15",
    operatorId: "#84920",
  },
  {
    id: "ord-8698-p",
    orderNumber: "8698",
    product: "SI-5520-PT",
    packageType: "Túi xốp bọc khí",
    stepCurrent: 1,
    stepTotal: 2,
    status: "retake",
    statusBadgeText: "Chụp lại",
    updatedAt: "22/09/2026 12:50",
    operatorId: "#84920",
  },
  {
    id: "ord-8695-p",
    orderNumber: "8695",
    product: "PKG-9901-HN",
    packageType: "Hộp carton chuyên dụng",
    stepCurrent: 0,
    stepTotal: 4,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 12:40",
    operatorId: "#84920",
  },
  {
    id: "ord-8691-p",
    orderNumber: "8691",
    product: "VTX-7744-AC",
    packageType: "Hộp carton cỡ nhỏ",
    stepCurrent: 2,
    stepTotal: 3,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    avatars: ["1", "2", "+1"],
    updatedAt: "22/09/2026 12:20",
    operatorId: "#84920",
  },
  {
    id: "ord-8687-p",
    orderNumber: "8687",
    product: "KGW-1011-XP",
    packageType: "Túi niêm phong PE",
    stepCurrent: 0,
    stepTotal: 2,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 12:10",
    operatorId: "#84920",
  },
  {
    id: "ord-8684-p",
    orderNumber: "8684",
    product: "ABD00-5510-FL",
    packageType: "Thùng carton 5 lớp",
    stepCurrent: 1,
    stepTotal: 2,
    status: "retake",
    statusBadgeText: "Chụp lại",
    updatedAt: "22/09/2026 11:55",
    operatorId: "#84920",
  },
  {
    id: "ord-8680-p",
    orderNumber: "8680",
    product: "HF-KXL06-C-HNC",
    packageType: "Hộp carton cỡ nhỡ",
    stepCurrent: 0,
    stepTotal: 3,
    status: "pending",
    statusBadgeText: "Chờ chụp",
    updatedAt: "22/09/2026 11:40",
    operatorId: "#84920",
  },
]

// 8 Đơn hàng mẫu cho Tab "Đã hoàn tất" (khớp số lượng thống kê 08)
const COMPLETED_ORDERS_MOCK: OrderItem[] = [
  {
    id: "ord-8715-c",
    orderNumber: "8715",
    product: "PKG-8810-EL",
    packageType: "Hộp carton cỡ nhỡ",
    stepCurrent: 3,
    stepTotal: 3,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 14:30",
    operatorId: "#84920",
  },
  {
    id: "ord-8712-c",
    orderNumber: "8712",
    product: "ABD00-193DF",
    packageType: "Thùng carton 5 lớp",
    stepCurrent: 2,
    stepTotal: 2,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 13:58",
    operatorId: "#84920",
  },
  {
    id: "ord-8714-c",
    orderNumber: "8714",
    product: "XMA-5502-QN",
    packageType: "Hộp carton cỡ nhỏ",
    stepCurrent: 3,
    stepTotal: 3,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 14:28",
    operatorId: "#84920",
  },
  {
    id: "ord-8709-c",
    orderNumber: "8709",
    product: "VTX-1029-BB",
    packageType: "Túi niêm phong PE",
    stepCurrent: 2,
    stepTotal: 2,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 14:15",
    operatorId: "#84920",
  },
  {
    id: "ord-8705-c",
    orderNumber: "8705",
    product: "KGW-4401-OS",
    packageType: "Thùng carton 5 lớp",
    stepCurrent: 3,
    stepTotal: 3,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 13:40",
    operatorId: "#84920",
  },
  {
    id: "ord-8701-c",
    orderNumber: "8701",
    product: "DAY-DIEN-0902",
    packageType: "Hộp carton cỡ nhỡ",
    stepCurrent: 1,
    stepTotal: 1,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 13:25",
    operatorId: "#84920",
  },
  {
    id: "ord-8694-c",
    orderNumber: "8694",
    product: "PKG-7712-BT",
    packageType: "Túi niêm phong PE",
    stepCurrent: 2,
    stepTotal: 2,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 12:45",
    operatorId: "#84920",
  },
  {
    id: "ord-8690-c",
    orderNumber: "8690",
    product: "SI-2200-HN",
    packageType: "Hộp carton cỡ nhỏ",
    stepCurrent: 3,
    stepTotal: 3,
    status: "completed",
    statusBadgeText: "Hoàn thành",
    photoUrls: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    ],
    updatedAt: "22/09/2026 12:05",
    operatorId: "#84920",
  },
]

interface OrderListPageProps {
  onOpenOrderCamera: (order: OrderItem) => void
  onOpenScanCamera: () => void
}

export default function OrderListPage({
  onOpenOrderCamera,
  onOpenScanCamera,
}: OrderListPageProps) {
  // Quản lý 2 Tab chính: "pending" (Chờ chụp) | "completed" (Đã hoàn tất)
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending")

  // Bộ lọc tìm kiếm
  const [searchQuery, setSearchQuery] = useState("")

  // Đơn hàng đang chọn để xem ảnh chi tiết
  const [viewingOrder, setViewingOrder] = useState<OrderItem | null>(null)

  // Hiệu ứng làm mới danh sách
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredPendingOrders = useMemo(() => {
    if (!searchQuery.trim()) return PENDING_ORDERS_MOCK
    const q = searchQuery.toLowerCase().trim()
    return PENDING_ORDERS_MOCK.filter(
      (item) =>
        item.orderNumber.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.packageType.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredCompletedOrders = useMemo(() => {
    if (!searchQuery.trim()) return COMPLETED_ORDERS_MOCK
    const q = searchQuery.toLowerCase().trim()
    return COMPLETED_ORDERS_MOCK.filter(
      (item) =>
        item.orderNumber.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.packageType.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Nút làm mới danh sách
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <div className="bg-surface w-full text-on-surface h-screen h-dvh flex flex-col overflow-hidden">
      <div className="pwa-container w-full h-full flex flex-col overflow-hidden relative">
        {/* ========================================================= */}
        {/* PHẦN 1 CỐ ĐỊNH: TopAppBar (Header trạm kiểm soát)       */}
        {/* ========================================================= */}
        <header className="shrink-0 h-14 w-full bg-surface/95 backdrop-blur border-b border-outline-variant flex justify-between items-center px-4 z-30 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-bold text-primary tracking-tight">Photo Packing</h1>
          </div>
          <div className="px-3 py-1 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center shadow-sm">
            <span className="text-[12px] font-bold text-primary tracking-wider">#84920</span>
          </div>
        </header>

        {/* ========================================================= */}
        {/* PHẦN 2 CỐ ĐỊNH: Search Bar & 2 Thẻ Tab Chuyển Đổi       */}
        {/* NẰM YÊN Ở TRÊN CÙNG KHI SCROLL DANH SÁCH                  */}
        {/* ========================================================= */}
        <div className="shrink-0 space-y-3 px-4 pt-3 pb-3 bg-surface z-20 border-b border-outline-variant/40 shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
          {/* Thanh tìm kiếm (Search bar) */}
          <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl px-3.5 py-2.5 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-secondary text-[20px] mr-2 shrink-0">
              search
            </span>
            <input
              className="w-full bg-transparent border-0 p-0 text-[13px] text-on-surface placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              placeholder="Tìm kiếm PO"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-secondary hover:text-primary mr-1"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              className="flex items-center justify-center p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-container transition-colors shrink-0 active:scale-95"
              title="Quét mã barcode/QR"
              type="button"
              onClick={onOpenScanCamera}
            >
              <span className="material-symbols-outlined text-[20px]">barcode_scanner</span>
            </button>
          </div>

          {/* Thống kê tổng quan (2 Thẻ đóng vai trò 2 Tab bấm chuyển đổi) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Thẻ 1: Chờ chụp */}
            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className={`text-left p-3.5 rounded-xl flex flex-col justify-between shadow-sm min-h-[92px] transition-all duration-200 active:scale-[0.98] ${activeTab === "pending"
                ? "bg-[#1b365d] text-white ring-2 ring-primary/20 shadow-md"
                : "bg-surface-container-high border border-outline-variant hover:bg-surface-container"
                }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[12px] font-medium ${activeTab === "pending" ? "text-slate-200" : "text-secondary"
                    }`}
                >
                  Chờ chụp
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] ${activeTab === "pending" ? "text-amber-300" : "text-secondary"
                    }`}
                >
                  schedule
                </span>
              </div>
              <div>
                <p
                  className={`text-3xl font-bold tracking-tight leading-none ${activeTab === "pending" ? "text-white" : "text-primary"
                    }`}
                >
                  12
                </p>
              </div>
            </button>

            {/* Thẻ 2: Đã hoàn tất */}
            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`text-left p-3.5 rounded-xl flex flex-col justify-between shadow-sm min-h-[92px] transition-all duration-200 active:scale-[0.98] ${activeTab === "completed"
                ? "bg-[#1b365d] text-white ring-2 ring-primary/20 shadow-md"
                : "bg-surface-container-high border border-outline-variant hover:bg-surface-container"
                }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[12px] font-medium ${activeTab === "completed" ? "text-slate-200" : "text-secondary"
                    }`}
                >
                  Đã hoàn tất
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] ${activeTab === "completed" ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div>
                <p
                  className={`text-3xl font-bold tracking-tight leading-none ${activeTab === "completed" ? "text-white" : "text-primary"
                    }`}
                >
                  08
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PHẦN 3: DANH SÁCH ĐƠN HÀNG ĐƯỢC CUỘN ĐỘC LẬP           */}
        {/* CHỈ CÓ KHUNG NÀY ĐƯỢC CUỘN LÊN/XUỐNG                      */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto overscroll-contain px-4 py-3.5 space-y-3.5 pb-28 scroll-smooth">
          {/* TAB 1: Danh sách Đơn hàng Chờ chụp (Giao diện Trang 2) */}
          {activeTab === "pending" && (
            <>
              {filteredPendingOrders.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center space-y-2">
                  <span className="material-symbols-outlined text-secondary text-4xl">inbox</span>
                  <p className="text-sm font-medium text-primary">Không tìm thấy đơn hàng</p>
                  <p className="text-xs text-secondary">
                    Không có đơn hàng nào khớp với từ khóa "{searchQuery}"
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-xs"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              ) : (
                filteredPendingOrders.map((order) => {
                  const isRetake = order.status === "retake"
                  const hasAvatars = !!order.avatars

                  return (
                    <div
                      key={order.id}
                      className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm active:scale-[0.99] transition-transform duration-150"
                    >
                      <div className="p-4 space-y-2.5">
                        <div className="flex justify-between items-start">
                          <h3 className="text-[18px] text-primary font-bold">
                            Đơn hàng #{order.orderNumber}
                          </h3>

                          {isRetake ? (
                            <span className="px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 text-[11px] rounded-full font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                              <span className="material-symbols-outlined text-[13px]">error</span>
                              Chụp lại
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 bg-surface-container-high text-secondary border border-outline-variant text-[11px] rounded-full font-semibold tracking-wide shadow-sm">
                              Chờ chụp
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-secondary text-[13px]">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">assignment</span>
                              <span>
                                Step: {order.stepCurrent}/{order.stepTotal}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                            <span>Product: {order.product}</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2.5 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
                        {hasAvatars ? (
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                                1
                              </div>
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-700">
                                2
                              </div>
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-[#1b365d] flex items-center justify-center text-[10px] text-white font-bold">
                                +2
                              </div>
                            </div>
                            <span className="text-[13px] text-secondary italic">
                              {order.packageType}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[13px] text-secondary italic">
                            {order.packageType}
                          </span>
                        )}

                        {isRetake ? (
                          <button
                            onClick={() => onOpenOrderCamera(order)}
                            className="bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center p-2 rounded-lg active:opacity-90 transition-colors shadow-sm"
                            title="Chụp lại"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">replay</span>
                          </button>
                        ) : hasAvatars ? (
                          <button
                            onClick={() => onOpenOrderCamera(order)}
                            className="bg-primary hover:bg-[#1b365d] text-white flex items-center justify-center p-2 rounded-lg active:opacity-90 transition-colors shadow-sm"
                            title="Tiếp tục"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onOpenOrderCamera(order)}
                            className="bg-primary hover:bg-[#1b365d] text-white flex items-center justify-center p-2 rounded-lg active:opacity-90 transition-colors shadow-sm"
                            title="Bắt đầu"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </>
          )}

          {/* TAB 2: Danh sách Đơn hàng Đã hoàn tất (Giao diện Trang 1) */}
          {activeTab === "completed" && (
            <>
              {filteredCompletedOrders.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center space-y-2">
                  <span className="material-symbols-outlined text-secondary text-4xl">inbox</span>
                  <p className="text-sm font-medium text-primary">Không tìm thấy đơn hàng</p>
                  <p className="text-xs text-secondary">
                    Không có đơn hàng nào khớp với từ khóa "{searchQuery}"
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-xs"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              ) : (
                filteredCompletedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm active:scale-[0.99] transition-transform duration-150"
                  >
                    <div className="p-4 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[18px] text-primary font-bold">
                          Đơn hàng #{order.orderNumber}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] rounded-full font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                          <span
                            className="material-symbols-outlined text-[13px] text-emerald-600"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          Hoàn thành
                        </span>
                      </div>

                      <div className="space-y-1 text-secondary text-[13px]">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">assignment</span>
                            <span className="font-medium text-on-surface">
                              Step: {order.stepCurrent}/{order.stepTotal}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                          <span>Product: {order.product}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-2.5 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
                      <span className="text-[13px] text-secondary italic">
                        {order.packageType}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant text-primary rounded-lg text-[12px] font-semibold transition-colors shadow-sm active:scale-95"
                          title="Xem ảnh đã chụp"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span>Xem</span>
                        </button>
                        <button
                          onClick={() => onOpenOrderCamera(order)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-high hover:bg-slate-200 border border-outline-variant text-secondary hover:text-primary rounded-lg text-[12px] font-semibold transition-colors shadow-sm active:scale-95"
                          title="Chụp lại ảnh"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">replay</span>
                          <span>Chụp lại</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </main>

        {/* ========================================================= */}
        {/* PHẦN 4 CỐ ĐỊNH: Nút nổi FAB ở góc dưới bên phải         */}
        {/* ========================================================= */}
        <div className="absolute right-5 bottom-6 flex flex-col items-center gap-3 z-40">
          {/* Refresh FAB */}
          <button
            className="w-11 h-11 bg-surface-container-lowest text-primary border border-outline-variant rounded-full shadow-md flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all"
            onClick={handleRefresh}
            title="Làm mới danh sách"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[22px] transition-transform duration-500 ${isRefreshing ? "rotate-180" : ""
                }`}
            >
              refresh
            </span>
          </button>

          {/* Photo FAB */}
          <button
            onClick={onOpenScanCamera}
            className="w-14 h-14 bg-primary hover:bg-[#1b365d] text-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-all ring-2 ring-white/50"
            title="Chụp ảnh đóng gói"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              add_a_photo
            </span>
          </button>
        </div>
      </div>

      {/* Modal Xem Ảnh Đã Chụp (Preview Dialog khi bấm nút 'Xem') */}
      <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(null)}>
        <DialogContent className="bg-white text-slate-900 border-slate-200 sm:max-w-md rounded-2xl p-5 shadow-2xl">
          {viewingOrder && (
            <>
              <DialogHeader className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg font-bold text-primary flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-600" />
                    Ảnh Đơn hàng #{viewingOrder.orderNumber}
                  </DialogTitle>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-semibold">
                    Hoàn thành ({viewingOrder.stepCurrent}/{viewingOrder.stepTotal})
                  </span>
                </div>
                <DialogDescription className="text-xs text-secondary">
                  Sản phẩm: <span className="font-semibold text-slate-700">{viewingOrder.product}</span> • {viewingOrder.packageType}
                </DialogDescription>
              </DialogHeader>

              <div className="py-2 space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
                  <img
                    src={
                      viewingOrder.photoUrls?.[0] ||
                      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={`Đơn hàng #${viewingOrder.orderNumber}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur rounded text-white text-[11px] font-mono">
                    {viewingOrder.updatedAt || "22/09/2026"} • {viewingOrder.operatorId || "#84920"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Trạm kiểm soát</span>
                    <span className="font-medium text-slate-800">#84920 (Xưởng OSA)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Bước hoàn tất</span>
                    <span className="font-medium text-emerald-600 font-bold">
                      Đủ {viewingOrder.stepCurrent}/{viewingOrder.stepTotal} bước
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setViewingOrder(null)}
                  className="flex-1 text-slate-700 border-slate-300"
                >
                  Đóng
                </Button>
                <Button
                  onClick={() => {
                    const order = viewingOrder
                    setViewingOrder(null)
                    onOpenOrderCamera(order)
                  }}
                  className="flex-1 bg-[#1b365d] hover:bg-[#132742] text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Chụp Lại
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
