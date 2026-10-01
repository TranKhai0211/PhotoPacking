import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import type { PhotoPackingSummary } from "@/types/photoPackingSummary"

interface NotifyResultDialogProps {
  open: boolean
  detectedPO: PhotoPackingSummary
  message: string
  onBackToList: () => void
}

/**
 * Dialog thông báo hoàn tất thành công bước chụp ảnh PO
 * Hiển thị sau khi API lần 2 xác nhận OK, kèm thông tin tóm tắt + thanh tiến độ
 */
export function NotifyResultDialog({
  open,
  detectedPO,
  message,
  onBackToList,
}: NotifyResultDialogProps) {
  const nextStep =
    detectedPO.totalStep > 0
      ? Math.min(detectedPO.totalStep, detectedPO.currentStep + 1)
      : detectedPO.currentStep || 1

  const progressPercent =
    detectedPO.totalStep > 0
      ? Math.min(100, Math.round((nextStep / detectedPO.totalStep) * 100))
      : 100

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onBackToList()
      }}
    >
      <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-md rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/40 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="size-9" />
            </div>
          </div>

          <div className="space-y-1.5">
            <DialogTitle className="text-lg font-bold text-white">
              Hoàn tất thành công!
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-400">
              {message}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="py-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Mã PO</span>
              <span className="font-mono font-bold text-cyan-300">
                {detectedPO.pO}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Sản phẩm</span>
              <span className="text-slate-200 font-medium truncate ml-4 text-right">
                {detectedPO.productCode} {detectedPO.productName ? `• ${detectedPO.productName}` : ""}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Bước hoàn tất</span>
              <span className="font-semibold text-emerald-400">
                {detectedPO.totalStep > 0
                  ? `${nextStep} / ${detectedPO.totalStep}`
                  : `Bước ${detectedPO.currentStep || 1}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Trạm</span>
              <span className="text-slate-300">
                #{detectedPO.updator || "#84920"} (Xưởng {detectedPO.group || "OSA"})
              </span>
            </div>

            {/* Thanh tiến độ */}
            <div className="pt-1">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1 text-right">
                Tiến độ: {progressPercent}%
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-1">
          <Button
            onClick={onBackToList}
            className="w-full h-12 bg-[#1b365d] hover:bg-[#132742] text-white font-medium rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về danh sách PO
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
