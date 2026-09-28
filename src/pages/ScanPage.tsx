import { useState, useRef, useEffect, useCallback } from "react"
// [THAM KHẢO QRCODE] - Thư viện jsQR trước đây dùng để đọc mã QR 2D:
// import jsQR from "jsqr"
import { X, ScanLine, Barcode, QrCode, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { lookupPOByBarcode } from "@/services/poLookup"
import { scanBarcodeFromCanvas } from "@/services/barcodeScanner"
import { SCAN_CONFIG, type ScanMode } from "@/config/scanConfig"
import type { PhotoPackingItem } from "@/types/photoPacking"

interface ScanPageProps {
  onPODetected: (
    po: PhotoPackingItem,
    codeMeta?: { format?: string; codeType?: "barcode" | "qrcode" }
  ) => void
  onBack: () => void
}

/**
 * Trang quét mã vạch Barcode & QR Code real-time
 * Tự động đồng bộ với cờ cấu hình SCAN_CONFIG.ACTIVE_MODE ("both" | "barcode" | "qrcode")
 * Kèm thanh chuyển đổi chế độ UI Switcher trực quan
 */
export default function ScanPage({ onPODetected, onBack }: ScanPageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanIntervalRef = useRef<number | null>(null)
  const isDetectedRef = useRef(false)
  const isProcessingFrameRef = useRef(false)
  const onPODetectedRef = useRef(onPODetected)

  // Chế độ quét hiện tại (mặc định lấy từ cờ SCAN_CONFIG.ACTIVE_MODE)
  const [scanMode, setScanMode] = useState<ScanMode>(SCAN_CONFIG.ACTIVE_MODE)
  const scanModeRef = useRef<ScanMode>(scanMode)

  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scanStatus, setScanStatus] = useState("Đang khởi động camera...")
  const [lastError, setLastError] = useState<string | null>(null)

  // Cập nhật ref khi callback hoặc mode thay đổi
  useEffect(() => {
    onPODetectedRef.current = onPODetected
  }, [onPODetected])

  useEffect(() => {
    scanModeRef.current = scanMode
    if (scanMode === "barcode") {
      setScanStatus("Hướng camera vào dải mã vạch Barcode (Code 128, Code 39...)")
    } else if (scanMode === "qrcode") {
      setScanStatus("Hướng camera vào mã vuông QR Code trên phiếu PO...")
    } else {
      setScanStatus("Hướng camera vào mã vạch Barcode hoặc QR Code...")
    }
  }, [scanMode])

  // Dọn dẹp tài nguyên
  const stopAll = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  // Khởi tạo camera + bắt đầu quét liên tục
  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        })

        if (!mounted) {
          newStream.getTracks().forEach((t) => t.stop())
          return
        }

        streamRef.current = newStream
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
        }

        // Quét liên tục mỗi 200ms
        scanIntervalRef.current = window.setInterval(async () => {
          if (
            !videoRef.current ||
            !canvasRef.current ||
            isDetectedRef.current ||
            isProcessingFrameRef.current
          )
            return

          const video = videoRef.current
          if (video.readyState !== video.HAVE_ENOUGH_DATA) return

          const canvas = canvasRef.current
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext("2d")
          if (!ctx) return

          ctx.drawImage(video, 0, 0)

          isProcessingFrameRef.current = true
          try {
            /* =========================================================================
             * ĐỌC MÃ THEO CHẾ ĐỘ (Barcode 1D, QR Code 2D hoặc Cả hai)
             * ========================================================================= */
            const currentMode = scanModeRef.current
            const scanResult = await scanBarcodeFromCanvas(canvas, currentMode)

            if (scanResult && scanResult.text.trim()) {
              const barcodeValue = scanResult.text.trim()
              const po = lookupPOByBarcode(barcodeValue)

              if (po) {
                // PO tìm thấy → dừng quét, chuyển sang Camera View kèm metadata
                isDetectedRef.current = true
                const tagLabel =
                  scanResult.codeType === "qrcode"
                    ? "QR Code"
                    : scanResult.format || "Barcode"
                setScanStatus(`Đã nhận diện [${tagLabel}]: PO ${po.po}`)
                setTimeout(() => {
                  onPODetectedRef.current(po, {
                    format: scanResult.format,
                    codeType: scanResult.codeType,
                  })
                }, 500)
              } else {
                // Barcode không khớp PO nào
                setLastError(
                  `Mã "${barcodeValue.length > 25 ? barcodeValue.slice(0, 25) + "..." : barcodeValue}" không khớp PO nào`
                )
                setTimeout(() => setLastError(null), 3000)
              }
            }

            /* =========================================================================
             * [MÃ NGUỒN THAM KHẢO] - ĐỌC QRCODE BẰNG JSQR TRƯỚC ĐÂY:
             * Nếu muốn dùng thuần jsQR cho mọi trường hợp, bạn có thể tham khảo:
             *
             * const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
             * const code = jsQR(imageData.data, imageData.width, imageData.height, {
             *   inversionAttempts: "attemptBoth",
             * })
             * if (code?.data?.trim()) {
             *   const po = lookupPOByBarcode(code.data.trim())
             *   if (po) onPODetectedRef.current(po)
             * }
             * ========================================================================= */
          } catch {
            // Bỏ qua lỗi quét frame này
          } finally {
            isProcessingFrameRef.current = false
          }
        }, 200)
      } catch {
        if (mounted) {
          setCameraError(
            "Không thể mở camera. Vui lòng kiểm tra quyền truy cập camera trong trình duyệt."
          )
        }
      }
    }

    init()

    return () => {
      mounted = false
      stopAll()
    }
  }, [stopAll])

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans select-none overflow-hidden max-w-md mx-auto sm:border-x sm:border-slate-800 shadow-2xl">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <header className="z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/85 via-black/50 to-transparent">
        <div className="size-10 flex items-center justify-center">
          {scanMode === "qrcode" ? (
            <QrCode className="w-5 h-5 text-purple-400" />
          ) : scanMode === "barcode" ? (
            <Barcode className="w-5 h-5 text-cyan-400" />
          ) : (
            <Layers className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <ScanLine className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-semibold text-sm tracking-wide text-slate-200">
            {scanMode === "barcode"
              ? "Quét mã vạch Barcode"
              : scanMode === "qrcode"
              ? "Quét mã QR Code"
              : "Quét Barcode & QR Code"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/15 rounded-full size-10"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </Button>
      </header>

      {/* Thanh chuyển đổi chế độ quét (UI Switcher) */}
      {SCAN_CONFIG.ENABLE_UI_SWITCHER && (
        <div className="z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md flex justify-center border-b border-white/5">
          <div className="inline-flex p-1 bg-slate-900/90 border border-slate-800 rounded-xl gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setScanMode("both")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                scanMode === "both"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Cả hai
            </button>
            <button
              type="button"
              onClick={() => setScanMode("barcode")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                scanMode === "barcode"
                  ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Barcode className="w-3.5 h-3.5" />
              Barcode 1D
            </button>
            <button
              type="button"
              onClick={() => setScanMode("qrcode")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                scanMode === "qrcode"
                  ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              QR Code 2D
            </button>
          </div>
        </div>
      )}

      {/* Toast lỗi khi barcode không khớp PO */}
      {lastError && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-red-950/90 backdrop-blur border border-red-500/40 text-red-300 text-xs px-4 py-2 rounded-full shadow-lg text-center max-w-[90%]">
          {lastError}
        </div>
      )}

      {/* Khung video chính */}
      <div className="relative flex-1 flex items-center justify-center p-3 overflow-hidden">
        <div className="relative w-full h-full max-h-[75vh] rounded-3xl overflow-hidden bg-zinc-950 flex items-center justify-center border border-zinc-800/80 shadow-2xl">
          {cameraError ? (
            <div className="flex flex-col items-center p-6 text-center space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                {cameraError}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
              >
                Thử lại
              </Button>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Viewfinder hướng dẫn căn chỉnh tự động theo chế độ */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
            <div
              className={`relative transition-all duration-300 ${
                scanMode === "barcode"
                  ? "w-80 h-40 max-w-[88vw] max-h-[46vw]"
                  : scanMode === "qrcode"
                  ? "w-64 h-64 max-w-[70vw] max-h-[70vw]"
                  : "w-72 h-52 max-w-[82vw] max-h-[58vw]"
              }`}
            >
              {/* 4 góc viền viewfinder */}
              <div
                className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-xl transition-colors ${
                  scanMode === "qrcode" ? "border-purple-400" : "border-cyan-400"
                }`}
              />
              <div
                className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-xl transition-colors ${
                  scanMode === "qrcode" ? "border-purple-400" : "border-cyan-400"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-xl transition-colors ${
                  scanMode === "qrcode" ? "border-purple-400" : "border-cyan-400"
                }`}
              />
              <div
                className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-xl transition-colors ${
                  scanMode === "qrcode" ? "border-purple-400" : "border-cyan-400"
                }`}
              />

              {/* Đường tâm nhắm cho Barcode */}
              {scanMode === "barcode" && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-px bg-cyan-400/40 border-t border-dashed border-cyan-400/60" />
              )}

              {/* Khung căn cữ cho QR Code */}
              {scanMode === "qrcode" && (
                <div className="absolute inset-8 border border-dashed border-purple-400/30 rounded-lg pointer-events-none" />
              )}

              {/* Nhãn chế độ bên trong khung */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur border border-white/10 text-[10px] text-slate-300 font-medium whitespace-nowrap">
                {scanMode === "barcode"
                  ? "Khung quét Barcode 1D"
                  : scanMode === "qrcode"
                  ? "Khung quét QR Code 2D"
                  : "Khung quét Barcode & QR Code"}
              </div>
            </div>
          </div>

          {/* Laser quét liên tục */}
          {!cameraError && !isDetectedRef.current && (
            <div
              className={`absolute left-0 right-0 h-0.5 shadow-lg pointer-events-none animate-scan-laser ${
                scanMode === "qrcode"
                  ? "bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_10px_2px_#c084fc]"
                  : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_2px_#22d3ee]"
              }`}
            />
          )}
        </div>
      </div>

      {/* Footer: Trạng thái quét + nút hủy */}
      <footer className="z-20 px-6 py-4 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-300 text-center px-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                scanMode === "qrcode" ? "bg-purple-400" : "bg-cyan-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                scanMode === "qrcode" ? "bg-purple-500" : "bg-cyan-500"
              }`}
            />
          </span>
          <span className="truncate">{scanStatus}</span>
        </div>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full h-11 rounded-xl border-slate-700 bg-slate-900/90 text-slate-300 hover:bg-slate-800"
        >
          Hủy quét
        </Button>
      </footer>
    </div>
  )
}
