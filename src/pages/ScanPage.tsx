import { useState, useRef, useEffect, useCallback } from "react"
// [THAM KHẢO QRCODE] - Thư viện jsQR trước đây dùng để đọc mã QR 2D:
// import jsQR from "jsqr"
import { X, ScanLine, Barcode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { lookupPOByBarcode } from "@/services/poLookup"
import { scanBarcodeFromCanvas } from "@/services/barcodeScanner"
import type { PhotoPackingItem } from "@/types/photoPacking"

interface ScanPageProps {
  onPODetected: (po: PhotoPackingItem) => void
  onBack: () => void
}

/**
 * Trang quét mã vạch Barcode real-time (Code 128, Code 39, EAN, ITF...)
 * Liên tục quét từng frame video để phát hiện mã vạch PO
 * Khi phát hiện PO hợp lệ → gọi callback chuyển sang Camera View
 */
export default function ScanPage({ onPODetected, onBack }: ScanPageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanIntervalRef = useRef<number | null>(null)
  const isDetectedRef = useRef(false)
  const isProcessingFrameRef = useRef(false)
  const onPODetectedRef = useRef(onPODetected)

  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scanStatus, setScanStatus] = useState("Đang khởi động camera...")
  const [lastError, setLastError] = useState<string | null>(null)

  // Cập nhật ref khi callback thay đổi
  useEffect(() => {
    onPODetectedRef.current = onPODetected
  }, [onPODetected])

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
        setScanStatus("Hướng camera vào mã vạch Barcode (Code 128, Code 39...) trên PO...")

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
             * 1. ĐỌC MÃ VẠCH BARCODE (Code 128, Code 39, EAN, ITF...) - MỚI:
             * Sử dụng scanBarcodeFromCanvas (hỗ trợ BarcodeDetector native + @zxing/library)
             * ========================================================================= */
            const scanResult = await scanBarcodeFromCanvas(canvas)

            if (scanResult && scanResult.text.trim()) {
              const barcodeValue = scanResult.text.trim()
              const po = lookupPOByBarcode(barcodeValue)

              if (po) {
                // PO tìm thấy → dừng quét, chuyển sang Camera View
                isDetectedRef.current = true
                setScanStatus(`Mã [${scanResult.format || "Barcode"}]: PO ${po.po} đã được phát hiện!`)
                setTimeout(() => onPODetectedRef.current(po), 500)
              } else {
                // Barcode không khớp PO nào
                setLastError(
                  `Mã vạch "${barcodeValue.length > 25 ? barcodeValue.slice(0, 25) + "..." : barcodeValue}" không khớp PO nào`
                )
                setTimeout(() => setLastError(null), 3000)
              }
            }

            /* =========================================================================
             * 2. [MÃ NGUỒN THAM KHẢO] - ĐỌC QRCODE BẰNG JSQR TRƯỚC ĐÂY:
             * Nếu muốn quay lại chỉ đọc mã QR Code 2D thay vì Barcode 1D, bạn có thể:
             *
             * const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
             * const code = jsQR(imageData.data, imageData.width, imageData.height, {
             *   inversionAttempts: "attemptBoth",
             * })
             * if (code?.data?.trim()) {
             *   const barcodeValue = code.data.trim()
             *   const po = lookupPOByBarcode(barcodeValue)
             *   if (po) {
             *     isDetectedRef.current = true
             *     onPODetectedRef.current(po)
             *   }
             * }
             * ========================================================================= */
          } catch {
            // Bỏ qua lỗi quét, tiếp tục quét frame tiếp theo
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
          <Barcode className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex items-center gap-1.5">
          <ScanLine className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-semibold text-sm tracking-wide text-slate-200">
            Quét mã vạch PO (Barcode)
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

      {/* Toast lỗi khi barcode không khớp PO */}
      {lastError && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-red-950/90 backdrop-blur border border-red-500/40 text-red-300 text-xs px-4 py-2 rounded-full shadow-lg text-center max-w-[90%]">
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

          {/* Viewfinder hướng dẫn căn chỉnh cho mã vạch Barcode (khung chữ nhật nằm ngang) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
            <div className="relative w-80 h-44 max-w-[85vw] max-h-[50vw]">
              {/* 4 góc viền viewfinder */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl" />

              {/* Đường tâm nhắm barcode */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-px bg-cyan-400/40 border-t border-dashed border-cyan-400/60" />
            </div>
          </div>

          {/* Laser quét liên tục */}
          {!cameraError && !isDetectedRef.current && (
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_2px_#22d3ee] animate-scan-laser pointer-events-none" />
          )}
        </div>
      </div>

      {/* Footer: Trạng thái quét + nút hủy */}
      <footer className="z-20 px-6 py-5 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-300 text-center px-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
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
