import { useState } from "react"
import OrderListPage from "@/pages/OrderListPage"
import CameraPage from "@/pages/CameraPage"
import type { OrderItem } from "@/types/orderItem"

/**
 * App Component - Điều phối giữa Trang Danh sách Đơn hàng và Trang Chụp ảnh Camera
 */
export default function App() {
  const [view, setView] = useState<"orders" | "camera">("orders")
  const [targetOrder, setTargetOrder] = useState<OrderItem | null>(null)

  // Mở camera để chụp hoặc chụp lại cho một đơn hàng cụ thể
  const handleOpenOrderCamera = (order: OrderItem) => {
    setTargetOrder(order)
    setView("camera")
  }

  // Mở camera chung (từ nút quét barcode trên search hoặc FAB camera)
  const handleOpenScanCamera = () => {
    setTargetOrder(null)
    setView("camera")
  }

  // Quay lại trang danh sách đơn hàng
  const handleBackToOrders = () => {
    setTargetOrder(null)
    setView("orders")
  }

  if (view === "camera") {
    return (
      <CameraPage
        targetOrder={targetOrder}
        onBack={handleBackToOrders}
      />
    )
  }

  return (
    <OrderListPage
      onOpenOrderCamera={handleOpenOrderCamera}
      onOpenScanCamera={handleOpenScanCamera}
    />
  )
}
