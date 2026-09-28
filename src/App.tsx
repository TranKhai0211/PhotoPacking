import { useState } from "react"
import OrderListPage from "@/pages/OrderListPage"
import CameraPage from "@/pages/CameraPage"
import ScanPage from "@/pages/ScanPage"
import type { OrderItem } from "@/types/orderItem"
import type { PhotoPackingItem } from "@/types/photoPacking"

/**
 * App Component - Điều phối giữa Trang Danh sách Đơn hàng và Trang Chụp ảnh Camera
 */
export default function App() {
  const [view, setView] = useState<"orders" | "camera" | "scan">("orders")
  const [targetOrder, setTargetOrder] = useState<OrderItem | null>(null)
  const [scannedPO, setScannedPO] = useState<PhotoPackingItem | null>(null)

  // Mở camera để chụp hoặc chụp lại cho một đơn hàng cụ thể
  const handleOpenOrderCamera = (order: OrderItem) => {
    setTargetOrder(order)
    setScannedPO(null)
    setView("camera")
  }

  // Mở Scan View (từ nút quét barcode trên search hoặc FAB camera)
  const handleOpenScanCamera = () => {
    setTargetOrder(null)
    setScannedPO(null)
    setView("scan")
  }

  // PO được phát hiện từ Scan View → chuyển sang Camera View kèm PO data
  const handlePODetected = (po: PhotoPackingItem) => {
    setScannedPO(po)
    setTargetOrder(null)
    setView("camera")
  }

  // Quay lại trang danh sách đơn hàng
  const handleBackToOrders = () => {
    setTargetOrder(null)
    setScannedPO(null)
    setView("orders")
  }

  if (view === "scan") {
    return (
      <ScanPage
        onPODetected={handlePODetected}
        onBack={handleBackToOrders}
      />
    )
  }

  if (view === "camera") {
    return (
      <CameraPage
        targetOrder={targetOrder}
        scannedPO={scannedPO}
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
