import { useState } from "react"
import OrderListPage from "@/pages/OrderListPage"
import CameraPage from "@/pages/CameraPage"
import ScanPage from "@/pages/ScanPage"
import type { PhotoPackingSummary } from "@/types/photoPackingSummary"

/**
 * App Component - Điều phối giữa Trang Danh sách Đơn hàng và Trang Chụp ảnh Camera
 */
export default function App() {
  const [view, setView] = useState<"orders" | "camera" | "scan">("orders")
  const [targetOrder, setTargetOrder] = useState<PhotoPackingSummary | null>(null)
  const [scannedPO, setScannedPO] = useState<PhotoPackingSummary | null>(null)

  const [scannedCodeMeta, setScannedCodeMeta] = useState<{
    format?: string
    codeType?: "barcode" | "qrcode"
  } | null>(null)

  // Mở camera để chụp hoặc chụp lại cho một đơn hàng cụ thể
  const handleOpenOrderCamera = (order: PhotoPackingSummary) => {
    setTargetOrder(order)
    setScannedPO(null)
    setScannedCodeMeta(null)
    setView("camera")
  }

  // Mở Scan View (từ nút quét barcode trên search hoặc FAB camera)
  const handleOpenScanCamera = () => {
    setTargetOrder(null)
    setScannedPO(null)
    setScannedCodeMeta(null)
    setView("scan")
  }

  // PO được phát hiện từ Scan View → chuyển sang Camera View kèm PO data và loại mã
  const handlePODetected = (
    po: PhotoPackingSummary,
    codeMeta?: { format?: string; codeType?: "barcode" | "qrcode" }
  ) => {
    setScannedPO(po)
    setScannedCodeMeta(codeMeta || null)
    setTargetOrder(null)
    setView("camera")
  }

  // Quay lại trang danh sách đơn hàng
  const handleBackToOrders = () => {
    setTargetOrder(null)
    setScannedPO(null)
    setScannedCodeMeta(null)
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
        scannedCodeMeta={scannedCodeMeta}
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
