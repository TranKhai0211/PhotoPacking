export interface OrderItem {
  id: string
  orderNumber: string
  product: string
  packageType: string
  stepCurrent: number
  stepTotal: number
  status: "pending" | "completed" | "retake"
  statusBadgeText: string
  photoUrls?: string[]
  avatars?: string[]
  updatedAt?: string
  operatorId?: string
}
