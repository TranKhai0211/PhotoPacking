import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, RotateCcw, Package, Image as ImageIcon, Barcode, QrCode } from "lucide-react"
import type { PhotoPackingItem } from "@/types/photoPacking"

interface ConfirmPODialogProps {
  open: boolean
  detectedPO: PhotoPackingItem
  capturedImage: string
  codeMeta?: { format?: string; codeType?: "barcode" | "qrcode" } | null
  onConfirm: () => void
  onRetake: () => void
}

/**
 * Dialog xác nhận gửi ảnh lên hệ thống
 * Hiển thị thông tin PO, loại mã nhận diện (Barcode 1D vs QR Code),
 * ảnh vừa chụp (ở trên) và ảnh mẫu đối chiếu (ở dưới).
 * Ảnh được căn chỉnh vừa vặn với khung hiển thị (object-contain) để người dùng xem được toàn diện.
 */
export function ConfirmPODialog({
  open,
  detectedPO,
  capturedImage,
  codeMeta,
  onConfirm,
  onRetake,
}: ConfirmPODialogProps) {
  const nextStep = detectedPO.currentStep + 1
  // Lấy ảnh mẫu template tương ứng với bước hiện tại
  const templateStep =
    detectedPO.steps?.[detectedPO.currentStep] || detectedPO.steps?.[0]
  const templateImageUrl =
    templateStep?.photoUrl || templateStep?.thumbnailUrl

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onRetake()}>
      <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-md rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-white">
                Xác nhận gửi ảnh lên hệ thống
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400 mt-0.5">
                Đối chiếu ảnh vừa chụp với ảnh mẫu trước khi gửi
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3.5 py-1">
          {/* Thông tin PO tóm tắt + Badge loại mã vạch / QR code đã nhận diện */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-400 shrink-0">Mã PO</span>
              <span className="font-mono text-xs font-bold text-cyan-300 break-all text-right">
                {detectedPO.po}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 shrink-0">Sản phẩm</span>
              <span className="text-slate-200 font-medium truncate text-right">
                {detectedPO.productName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Bước chụp</span>
              <span className="font-semibold text-amber-300">
                Bước {nextStep} / {detectedPO.totalStep}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">Định dạng mã</span>
              {codeMeta?.codeType === "qrcode" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold text-[11px]">
                  <QrCode className="size-3" />
                  QR Code {codeMeta.format ? `(${codeMeta.format})` : ""}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-[11px]">
                  <Barcode className="size-3" />
                  Barcode {codeMeta?.format ? `(${codeMeta.format})` : "1D"}
                </span>
              )}
            </div>
          </div>

          {/* 1. Ảnh vừa chụp (ở trên) - căn chỉnh object-contain vừa toàn diện khung */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
                Ảnh vừa chụp
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {detectedPO.po.includes(";") ? detectedPO.po.split(";")[0] : detectedPO.po}
              </span>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/95 border border-cyan-500/40 shadow-inner flex items-center justify-center p-1">
              <img
                src={capturedImage}
                alt="Ảnh vừa chụp"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* 2. Ảnh mẫu đối chiếu (ở dưới) - căn chỉnh object-contain vừa toàn diện khung */}
          {templateImageUrl ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="size-3 text-amber-400" />
                  Ảnh mẫu đối chiếu
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  MẪU BƯỚC {nextStep}
                </span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/95 border border-amber-500/40 shadow-inner flex items-center justify-center p-1">
                <img
                  src={templateImageUrl}
                  alt="Ảnh mẫu đối chiếu"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* Hướng dẫn/Ghi chú của bước chụp nếu có */}
              {templateStep && (
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl px-3 py-2 text-[11px] text-slate-400 space-y-0.5">
                  <p className="font-semibold text-slate-300">
                    {templateStep.title}
                  </p>
                  {templateStep.description && (
                    <p className="line-clamp-2">{templateStep.description}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-dashed border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500">
              Không có ảnh mẫu cho bước này
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row gap-2 pt-2">
          <Button
            onClick={onRetake}
            variant="outline"
            className="flex-1 border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 h-11"
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Chụp lại
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium h-11 shadow-lg shadow-emerald-950/50"
          >
            <Package className="w-4 h-4 mr-1.5" />
            Xác nhận gửi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
