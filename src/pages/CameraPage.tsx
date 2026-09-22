import { useState, useRef, useEffect, type ChangeEvent } from "react"
import jsQR from "jsqr"
import {
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  SwitchCamera,
  Upload,
  ScanLine,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { OrderItem } from "@/types/orderItem"

interface CameraPageProps {
  targetOrder?: OrderItem | null
  onBack: () => void
}

export default function CameraPage({ targetOrder, onBack }: CameraPageProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scanResult, setScanResult] = useState<{
    success: boolean
    text?: string
    error?: string
  } | null>(null)
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Khởi động Camera khi vào trang
  const startCamera = async (mode: "environment" | "user" = facingMode) => {
    try {
      setCameraError(null)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setCameraError(
        "Không thể mở camera. Vui lòng kiểm tra quyền truy cập camera trong trình duyệt hoặc sử dụng tính năng tải ảnh bên dưới."
      )
    }
  }

  // Dừng Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  // Chuyển camera trước / sau
  const toggleCameraFacing = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment"
    setFacingMode(nextMode)
    startCamera(nextMode)
  }

  // Effect khởi động và dọn dẹp camera
  useEffect(() => {
    setCapturedImage(null)
    setScanResult(null)
    setIsScanning(false)
    startCamera()

    return () => {
      stopCamera()
    }
  }, [])

  useEffect(() => {
    if (videoRef.current && stream && !capturedImage) {
      videoRef.current.srcObject = stream
    }
  }, [stream, capturedImage])

  // Quét QR/Barcode từ canvas
  const processQRCode = (canvas: HTMLCanvasElement) => {
    setIsScanning(true)
    setScanResult(null)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    setTimeout(() => {
      try {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth",
        })

        if (code && code.data && code.data.trim().length > 0) {
          setScanResult({
            success: true,
            text: code.data,
          })
        } else {
          setScanResult({
            success: false,
            error:
              "Không tìm thấy mã QR/Barcode trong hình ảnh vừa chụp. Vui lòng căn chỉnh lại góc chụp rõ nét hơn!",
          })
        }
      } catch {
        setScanResult({
          success: false,
          error: "Có lỗi khi giải mã hình ảnh. Vui lòng thử lại.",
        })
      } finally {
        setIsScanning(false)
        setIsResultDialogOpen(true)
      }
    }, 1200)
  }

  // Chụp ảnh từ Video preview
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current

    if (video.videoWidth === 0 || video.videoHeight === 0) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95)
    setCapturedImage(dataUrl)

    processQRCode(canvas)
  }

  // Tải ảnh từ thiết bị
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !canvasRef.current) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current!
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.drawImage(img, 0, 0)
        setCapturedImage(event.target?.result as string)
        processQRCode(canvas)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  // Chụp lại
  const handleRetake = () => {
    setCapturedImage(null)
    setIsScanning(false)
    setScanResult(null)
    setIsResultDialogOpen(false)

    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(() => {})
    } else {
      startCamera()
    }
  }

  // Sao chép kết quả quét
  const copyToClipboard = () => {
    if (scanResult?.text) {
      navigator.clipboard.writeText(scanResult.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isUrl = (str?: string) => {
    if (!str) return false
    try {
      new URL(str)
      return str.startsWith("http://") || str.startsWith("https://")
    } catch {
      return false
    }
  }

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col justify-between font-sans select-none overflow-hidden max-w-md mx-auto sm:border-x sm:border-slate-800 shadow-2xl">
      {/* Hidden Canvas for frame extraction */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden File Input for fallback upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Header Bar */}
      <header className="z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/15 rounded-full size-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <ScanLine className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-semibold text-sm tracking-wide text-slate-200">
              {targetOrder
                ? `Đơn #${targetOrder.orderNumber}`
                : capturedImage
                ? isScanning
                  ? "Đang phân tích ảnh..."
                  : "Ảnh đã chụp"
                : "Photo Packing Scanner"}
            </span>
          </div>
          {targetOrder && (
            <span className="text-[11px] text-cyan-300">
              {targetOrder.product} • Step {targetOrder.stepCurrent}/{targetOrder.stepTotal}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!capturedImage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCameraFacing}
              className="text-white hover:bg-white/15 rounded-full size-10"
              title="Đổi camera trước / sau"
            >
              <SwitchCamera className="w-5 h-5" />
            </Button>
          )}
          {capturedImage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRetake}
              className="text-white hover:bg-white/15 rounded-full size-10"
              title="Chụp lại"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          )}
        </div>
      </header>

      {/* Main Video Preview Area */}
      <div className="relative flex-1 flex items-center justify-center p-3 overflow-hidden">
        <div className="relative w-full h-full max-h-[75vh] rounded-3xl overflow-hidden bg-zinc-950 flex items-center justify-center border border-zinc-800/80 shadow-2xl">
          {!capturedImage ? (
            <>
              {cameraError ? (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <AlertCircle className="w-12 h-12 text-amber-400/80" />
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs">{cameraError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Tải ảnh từ thiết bị
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

              {/* Viewfinder Target Guidelines */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-12">
                <div className="relative w-64 h-64 max-w-[70vw] max-h-[70vw]">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl" />
                </div>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={capturedImage}
                alt="Captured frame"
                className="w-full h-full object-cover"
              />

              {/* Hiệu ứng Scanning laser */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] animate-grid-glow" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_3px_#22d3ee] animate-scan-laser" />

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                    <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs px-4 py-2 rounded-full shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                      </span>
                      <span>Đang nhận diện mã đóng gói...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Shutter & Controls Bar */}
      <footer className="z-20 px-6 py-5 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center space-y-3">
        {!capturedImage ? (
          <div className="w-full flex items-center justify-around">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full size-12"
              title="Tải ảnh lên"
            >
              <Upload className="w-5 h-5" />
            </Button>

            {/* Shutter Button */}
            <button
              onClick={handleCapture}
              className="group relative flex items-center justify-center size-20 rounded-full border-4 border-white/90 p-1 transition-all duration-200 active:scale-90 hover:scale-105"
            >
              <div className="size-full rounded-full bg-white transition-all duration-150 group-hover:bg-cyan-400 group-active:scale-95 shadow-lg" />
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-slate-400 hover:text-cyan-400 hover:bg-white/10 rounded-full size-12"
              title="Quay lại danh sách"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-3">
            <Button
              onClick={handleRetake}
              disabled={isScanning}
              variant="outline"
              className="flex-1 h-12 rounded-xl border-slate-700 bg-slate-900/90 text-slate-200 hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Chụp Lại
            </Button>

            <Button
              onClick={onBack}
              className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
            >
              <Check className="w-4 h-4 mr-2" />
              Lưu & Tiếp Tục
            </Button>
          </div>
        )}
      </footer>

      {/* Notification Dialog: Hiển thị kết quả quét mã nếu có */}
      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-md rounded-2xl p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              {scanResult?.success ? (
                <div className="size-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="size-6" />
                </div>
              ) : (
                <div className="size-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <AlertCircle className="size-6" />
                </div>
              )}
              <div>
                <DialogTitle className="text-lg font-bold text-white">
                  {scanResult?.success ? "Phát Hiện Mã Barcode/QR!" : "Đã Lưu Ảnh Chụp Đóng Gói"}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400">
                  {scanResult?.success
                    ? "Dữ liệu được giải mã từ hình ảnh"
                    : "Hệ thống đã lưu nhận dạng ảnh cho đơn hàng"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-3">
            {scanResult?.success ? (
              <div className="space-y-3">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 break-all max-h-48 overflow-y-auto font-mono text-sm text-cyan-300">
                  {scanResult.text}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Loại dữ liệu: {isUrl(scanResult.text) ? "Liên kết Web (URL)" : "Mã đơn/sản phẩm"}</span>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/40 text-[10px]">
                    Hợp lệ
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 space-y-2">
                <p>Ảnh chụp đóng gói đã sẵn sàng để gửi lên hệ thống kiểm duyệt.</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            {scanResult?.success && (
              <>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex-1 border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Đã Sao Chép!" : "Sao Chép Mã"}
                </Button>

                {isUrl(scanResult.text) && (
                  <Button
                    asChild
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
                  >
                    <a href={scanResult.text} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Mở Link
                    </a>
                  </Button>
                )}
              </>
            )}

            <Button
              onClick={() => {
                setIsResultDialogOpen(false)
                onBack()
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Hoàn Tất & Về Trang Chủ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
