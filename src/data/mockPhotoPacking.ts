import type { PhotoPackingItem, PackingStatistics, PackingFilterParams } from "@/types/photoPacking";

/**
 * Bộ dữ liệu mẫu hệ thống Quản lý Đóng gói & Chụp ảnh (Photo Packing System)
 * Được trích xuất chuẩn xác và làm giàu dữ liệu từ file PhotoPackingSummary.xlsx
 * Tổng số bản ghi: 29
 */
export const MOCK_PHOTO_PACKING_ITEMS: PhotoPackingItem[] = [
  {
    "po": "101008323849",
    "productCode": "H0090924",
    "productName": "HF-KXG-0630-C-PT-HN",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46277",
    "createdAt": "2026-09-12T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46276.679884062498",
    "updatedAt": "2026-09-11T16:19:01.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "12/09/2026",
    "formattedUpdatedAt": "11/09/2026 16:19",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-11T16:19:01.000Z",
        "formattedCapturedAt": "11/09/2026 16:19",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008323849"
  },
  {
    "po": "101008451911",
    "productCode": "H0168277",
    "productName": "HF-KXL06-C-HNC-SUS",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46275",
    "createdAt": "2026-09-10T00:00:00.000Z",
    "updator": "12653",
    "udtRaw": "46274.707931516205",
    "updatedAt": "2026-09-09T16:59:25.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 2,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "10/09/2026",
    "formattedUpdatedAt": "09/09/2026 16:59",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-09T15:59:25.000Z",
        "formattedCapturedAt": "09/09/2026 15:59",
        "operatorId": "12653",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-09T16:59:25.000Z",
        "formattedCapturedAt": "09/09/2026 16:59",
        "operatorId": "12653",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008451911"
  },
  {
    "po": "101009381684",
    "productCode": "H0168278",
    "productName": "HF-KXL06-F-HNC-SUS",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46274",
    "createdAt": "2026-09-09T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46274.24312997685",
    "updatedAt": "2026-09-09T05:50:06.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 3,
    "currentStep": 2,
    "status": "in_progress",
    "progressPercent": 67,
    "formattedCreatedAt": "09/09/2026",
    "formattedUpdatedAt": "09/09/2026 05:50",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Ngoại quan sản phẩm & quy cách",
        "description": "Chụp sản phẩm cùng phiếu chỉ thị PO kiểm tra đúng chủng loại",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-09T03:50:06.000Z",
        "formattedCapturedAt": "09/09/2026 03:50",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói túi bảo vệ & chống ẩm",
        "description": "Chụp sản phẩm được xếp vào túi PE/khay định hình kèm gói hút ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-09T04:50:06.000Z",
        "formattedCapturedAt": "09/09/2026 04:50",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Đóng thùng carton & dán nhãn",
        "description": "Chụp thùng carton hoàn chỉnh dán seal niêm phong",
        "isCompleted": false
      }
    ],
    "qrPayload": "101009381684"
  },
  {
    "po": "101009046390",
    "productCode": "H0056352",
    "productName": "KXL06075-ORGOP4-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46274",
    "createdAt": "2026-09-09T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46274.244155208333",
    "updatedAt": "2026-09-09T05:51:35.000Z",
    "type": "DAY DIEN",
    "productKey": "KXL",
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "09/09/2026",
    "formattedUpdatedAt": "09/09/2026 05:51",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-09T05:51:35.000Z",
        "formattedCapturedAt": "09/09/2026 05:51",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101009046390"
  },
  {
    "po": "101008296575",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46280",
    "createdAt": "2026-09-15T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46280.243613888888",
    "updatedAt": "2026-09-15T05:50:48.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 0,
    "status": "pending",
    "progressPercent": 0,
    "formattedCreatedAt": "15/09/2026",
    "formattedUpdatedAt": "15/09/2026 05:50",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": false
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008296575"
  },
  {
    "po": "101008295274",
    "productCode": "H0168278",
    "productName": "HF-KXL06-F-HNC-SUS",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46281",
    "createdAt": "2026-09-16T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46279.622746678244",
    "updatedAt": "2026-09-14T14:56:45.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 3,
    "currentStep": 3,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "16/09/2026",
    "formattedUpdatedAt": "14/09/2026 14:56",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Ngoại quan sản phẩm & quy cách",
        "description": "Chụp sản phẩm cùng phiếu chỉ thị PO kiểm tra đúng chủng loại",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T12:56:45.000Z",
        "formattedCapturedAt": "14/09/2026 12:56",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói túi bảo vệ & chống ẩm",
        "description": "Chụp sản phẩm được xếp vào túi PE/khay định hình kèm gói hút ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T13:56:45.000Z",
        "formattedCapturedAt": "14/09/2026 13:56",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Đóng thùng carton & dán nhãn",
        "description": "Chụp thùng carton hoàn chỉnh dán seal niêm phong",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T14:56:45.000Z",
        "formattedCapturedAt": "14/09/2026 14:56",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008295274"
  },
  {
    "po": "101008299193",
    "productCode": "H0168278",
    "productName": "HF-KXL06-F-HNC-SUS",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46278",
    "createdAt": "2026-09-13T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46277.531329780089",
    "updatedAt": "2026-09-12T12:45:06.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 4,
    "currentStep": 4,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "13/09/2026",
    "formattedUpdatedAt": "12/09/2026 12:45",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & mã vạch",
        "description": "Chụp chi tiết đầu cắm, mã sản phẩm và tem kiểm tra chất lượng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T09:45:06.000Z",
        "formattedCapturedAt": "12/09/2026 09:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Bọc màng chống xước & chống ẩm",
        "description": "Chụp sản phẩm sau khi bọc lớp màng đệm và gói chống ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T10:45:06.000Z",
        "formattedCapturedAt": "12/09/2026 10:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Xếp vào thùng carton nội bộ",
        "description": "Chụp sản phẩm đã được xếp ngay ngắn trong thùng carton",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T11:45:06.000Z",
        "formattedCapturedAt": "12/09/2026 11:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 4,
        "title": "Dán nhãn vận chuyển & niêm phong",
        "description": "Chụp tổng thể thùng đã dán seal OSA sẵn sàng xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T12:45:06.000Z",
        "formattedCapturedAt": "12/09/2026 12:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008299193"
  },
  {
    "po": "101008234310",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46275",
    "createdAt": "2026-09-10T00:00:00.000Z",
    "updator": "12653",
    "udtRaw": "46275.243236458336",
    "updatedAt": "2026-09-10T05:50:15.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "10/09/2026",
    "formattedUpdatedAt": "10/09/2026 05:50",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-10T05:50:15.000Z",
        "formattedCapturedAt": "10/09/2026 05:50",
        "operatorId": "12653",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008234310"
  },
  {
    "po": "101008584288",
    "productCode": "H0057443",
    "productName": "HF-KXL06075-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46277",
    "createdAt": "2026-09-12T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46277.248896527781",
    "updatedAt": "2026-09-12T05:58:24.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 2,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "12/09/2026",
    "formattedUpdatedAt": "12/09/2026 05:58",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T04:58:24.000Z",
        "formattedCapturedAt": "12/09/2026 04:58",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T05:58:24.000Z",
        "formattedCapturedAt": "12/09/2026 05:58",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008584288"
  },
  {
    "po": "101007660890",
    "productCode": "H0056352",
    "productName": "KXL06075-ORGOP4-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46276",
    "createdAt": "2026-09-11T00:00:00.000Z",
    "updator": "12653",
    "udtRaw": "46276.244275150464",
    "updatedAt": "2026-09-11T05:51:45.000Z",
    "type": "DAY DIEN",
    "productKey": "KXL",
    "totalStep": 3,
    "currentStep": 0,
    "status": "pending",
    "progressPercent": 0,
    "formattedCreatedAt": "11/09/2026",
    "formattedUpdatedAt": "11/09/2026 05:51",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Ngoại quan sản phẩm & quy cách",
        "description": "Chụp sản phẩm cùng phiếu chỉ thị PO kiểm tra đúng chủng loại",
        "isCompleted": false
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói túi bảo vệ & chống ẩm",
        "description": "Chụp sản phẩm được xếp vào túi PE/khay định hình kèm gói hút ẩm",
        "isCompleted": false
      },
      {
        "stepNumber": 3,
        "title": "Đóng thùng carton & dán nhãn",
        "description": "Chụp thùng carton hoàn chỉnh dán seal niêm phong",
        "isCompleted": false
      }
    ],
    "qrPayload": "101007660890"
  },
  {
    "po": "101008631995",
    "productCode": "H0090919",
    "productName": "HF-KXG-0620-C-PT-HN",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46277",
    "createdAt": "2026-09-12T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46276.445001539352",
    "updatedAt": "2026-09-11T10:40:48.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 4,
    "currentStep": 0,
    "status": "pending",
    "progressPercent": 0,
    "formattedCreatedAt": "12/09/2026",
    "formattedUpdatedAt": "11/09/2026 10:40",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & mã vạch",
        "description": "Chụp chi tiết đầu cắm, mã sản phẩm và tem kiểm tra chất lượng",
        "isCompleted": false
      },
      {
        "stepNumber": 2,
        "title": "Bọc màng chống xước & chống ẩm",
        "description": "Chụp sản phẩm sau khi bọc lớp màng đệm và gói chống ẩm",
        "isCompleted": false
      },
      {
        "stepNumber": 3,
        "title": "Xếp vào thùng carton nội bộ",
        "description": "Chụp sản phẩm đã được xếp ngay ngắn trong thùng carton",
        "isCompleted": false
      },
      {
        "stepNumber": 4,
        "title": "Dán nhãn vận chuyển & niêm phong",
        "description": "Chụp tổng thể thùng đã dán seal OSA sẵn sàng xuất xưởng",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008631995"
  },
  {
    "po": "101008673827",
    "productCode": "H0090919",
    "productName": "HF-KXG-0620-C-PT-HN",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46279",
    "createdAt": "2026-09-14T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46278.407889733797",
    "updatedAt": "2026-09-13T09:47:21.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 5,
    "currentStep": 0,
    "status": "pending",
    "progressPercent": 0,
    "formattedCreatedAt": "14/09/2026",
    "formattedUpdatedAt": "13/09/2026 09:47",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra linh kiện & mã QR PO",
        "description": "Kiểm tra ngoại quan linh kiện và quét mã PO",
        "isCompleted": false
      },
      {
        "stepNumber": 2,
        "title": "Đóng túi chống tĩnh điện ESD",
        "description": "Chụp linh kiện sau khi đóng túi ESD kín",
        "isCompleted": false
      },
      {
        "stepNumber": 3,
        "title": "Đặt vào khay xốp định hình",
        "description": "Chụp lớp bảo vệ chống va đập định hình trong khay",
        "isCompleted": false
      },
      {
        "stepNumber": 4,
        "title": "Đóng hộp sản phẩm & tem KGW",
        "description": "Chụp hộp đựng sản phẩm dán tem chứng nhận",
        "isCompleted": false
      },
      {
        "stepNumber": 5,
        "title": "Đóng kiện xuất xưởng OSA",
        "description": "Chụp kiện hàng tổng thể sẵn sàng bàn giao lưu kho",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008673827"
  },
  {
    "po": "101008623913",
    "productCode": "P2410967",
    "productName": "KGW06100T-RC",
    "quantity": 1,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46281",
    "createdAt": "2026-09-16T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46280.365308368055",
    "updatedAt": "2026-09-15T08:46:02.000Z",
    "type": "KGW",
    "productKey": "KGW",
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "16/09/2026",
    "formattedUpdatedAt": "15/09/2026 08:46",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-15T08:46:02.000Z",
        "formattedCapturedAt": "15/09/2026 08:46",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008623913"
  },
  {
    "po": "101008623912",
    "productCode": "P2410967",
    "productName": "KGW06100T-RC",
    "quantity": 1,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46281",
    "createdAt": "2026-09-16T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46280.36511496528",
    "updatedAt": "2026-09-15T08:45:45.000Z",
    "type": "KGW",
    "productKey": "KGW",
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "16/09/2026",
    "formattedUpdatedAt": "15/09/2026 08:45",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-15T08:45:45.000Z",
        "formattedCapturedAt": "15/09/2026 08:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008623912"
  },
  {
    "po": "101008638620",
    "productCode": "H0090919",
    "productName": "HF-KXG-0620-C-PT-HN",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46281",
    "createdAt": "2026-09-16T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46279.621251655095",
    "updatedAt": "2026-09-14T14:54:36.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 2,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "16/09/2026",
    "formattedUpdatedAt": "14/09/2026 14:54",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T13:54:36.000Z",
        "formattedCapturedAt": "14/09/2026 13:54",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T14:54:36.000Z",
        "formattedCapturedAt": "14/09/2026 14:54",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008638620"
  },
  {
    "po": "101008376516",
    "productCode": "H0090924",
    "productName": "HF-KXG-0630-C-PT-HN",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46279",
    "createdAt": "2026-09-14T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46278.552763692132",
    "updatedAt": "2026-09-13T13:15:58.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 3,
    "currentStep": 3,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "14/09/2026",
    "formattedUpdatedAt": "13/09/2026 13:15",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Ngoại quan sản phẩm & quy cách",
        "description": "Chụp sản phẩm cùng phiếu chỉ thị PO kiểm tra đúng chủng loại",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T11:15:58.000Z",
        "formattedCapturedAt": "13/09/2026 11:15",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói túi bảo vệ & chống ẩm",
        "description": "Chụp sản phẩm được xếp vào túi PE/khay định hình kèm gói hút ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T12:15:58.000Z",
        "formattedCapturedAt": "13/09/2026 12:15",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Đóng thùng carton & dán nhãn",
        "description": "Chụp thùng carton hoàn chỉnh dán seal niêm phong",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T13:15:58.000Z",
        "formattedCapturedAt": "13/09/2026 13:15",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008376516"
  },
  {
    "po": "101008841520",
    "productCode": "H0091240",
    "productName": "HF-PG-45-C4-PT-HN",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46270",
    "createdAt": "2026-09-05T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46270.239673460645",
    "updatedAt": "2026-09-05T05:45:07.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 4,
    "currentStep": 3,
    "status": "in_progress",
    "progressPercent": 75,
    "formattedCreatedAt": "05/09/2026",
    "formattedUpdatedAt": "05/09/2026 05:45",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & mã vạch",
        "description": "Chụp chi tiết đầu cắm, mã sản phẩm và tem kiểm tra chất lượng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-05T02:45:07.000Z",
        "formattedCapturedAt": "05/09/2026 02:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Bọc màng chống xước & chống ẩm",
        "description": "Chụp sản phẩm sau khi bọc lớp màng đệm và gói chống ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-05T03:45:07.000Z",
        "formattedCapturedAt": "05/09/2026 03:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Xếp vào thùng carton nội bộ",
        "description": "Chụp sản phẩm đã được xếp ngay ngắn trong thùng carton",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-05T04:45:07.000Z",
        "formattedCapturedAt": "05/09/2026 04:45",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 4,
        "title": "Dán nhãn vận chuyển & niêm phong",
        "description": "Chụp tổng thể thùng đã dán seal OSA sẵn sàng xuất xưởng",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008841520"
  },
  {
    "po": "101008257282",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46275",
    "createdAt": "2026-09-10T00:00:00.000Z",
    "updator": "12653",
    "udtRaw": "46275.243593136576",
    "updatedAt": "2026-09-10T05:50:46.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "10/09/2026",
    "formattedUpdatedAt": "10/09/2026 05:50",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-10T05:50:46.000Z",
        "formattedCapturedAt": "10/09/2026 05:50",
        "operatorId": "12653",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008257282"
  },
  {
    "po": "101008276870",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46278",
    "createdAt": "2026-09-13T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46278.243376006947",
    "updatedAt": "2026-09-13T05:50:27.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "13/09/2026",
    "formattedUpdatedAt": "13/09/2026 05:50",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T05:50:27.000Z",
        "formattedCapturedAt": "13/09/2026 05:50",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008276870"
  },
  {
    "po": "101008273522",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46277",
    "createdAt": "2026-09-12T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46277.249381678237",
    "updatedAt": "2026-09-12T05:59:06.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 1,
    "status": "in_progress",
    "progressPercent": 50,
    "formattedCreatedAt": "12/09/2026",
    "formattedUpdatedAt": "12/09/2026 05:59",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-12T04:59:06.000Z",
        "formattedCapturedAt": "12/09/2026 04:59",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008273522"
  },
  {
    "po": "101008257287",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46276",
    "createdAt": "2026-09-11T00:00:00.000Z",
    "updator": "12653",
    "udtRaw": "46275.672965277779",
    "updatedAt": "2026-09-10T16:09:04.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 3,
    "currentStep": 1,
    "status": "in_progress",
    "progressPercent": 33,
    "formattedCreatedAt": "11/09/2026",
    "formattedUpdatedAt": "10/09/2026 16:09",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Ngoại quan sản phẩm & quy cách",
        "description": "Chụp sản phẩm cùng phiếu chỉ thị PO kiểm tra đúng chủng loại",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-10T14:09:04.000Z",
        "formattedCapturedAt": "10/09/2026 14:09",
        "operatorId": "12653",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói túi bảo vệ & chống ẩm",
        "description": "Chụp sản phẩm được xếp vào túi PE/khay định hình kèm gói hút ẩm",
        "isCompleted": false
      },
      {
        "stepNumber": 3,
        "title": "Đóng thùng carton & dán nhãn",
        "description": "Chụp thùng carton hoàn chỉnh dán seal niêm phong",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008257287"
  },
  {
    "po": "101008257663",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46276",
    "createdAt": "2026-09-11T00:00:00.000Z",
    "updator": "12653",
    "udtRaw": "46276.242930590277",
    "updatedAt": "2026-09-11T05:49:49.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "11/09/2026",
    "formattedUpdatedAt": "11/09/2026 05:49",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-11T05:49:49.000Z",
        "formattedCapturedAt": "11/09/2026 05:49",
        "operatorId": "12653",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008257663"
  },
  {
    "po": "101008222064",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46274",
    "createdAt": "2026-09-09T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46274.242740243055",
    "updatedAt": "2026-09-09T05:49:32.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 1,
    "currentStep": 1,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "09/09/2026",
    "formattedUpdatedAt": "09/09/2026 05:49",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra ngoại quan & dán tem PO",
        "description": "Chụp toàn bộ sản phẩm cùng phiếu chỉ thị PO và tem xuất xưởng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-09T05:49:32.000Z",
        "formattedCapturedAt": "09/09/2026 05:49",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008222064"
  },
  {
    "po": "101008294819",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46280",
    "createdAt": "2026-09-15T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46280.242098877316",
    "updatedAt": "2026-09-15T05:48:37.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 2,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "15/09/2026",
    "formattedUpdatedAt": "15/09/2026 05:48",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-15T04:48:37.000Z",
        "formattedCapturedAt": "15/09/2026 04:48",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-15T05:48:37.000Z",
        "formattedCapturedAt": "15/09/2026 05:48",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008294819"
  },
  {
    "po": "101008258379",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46278",
    "createdAt": "2026-09-13T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46278.242803090281",
    "updatedAt": "2026-09-13T05:49:38.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 4,
    "currentStep": 3,
    "status": "in_progress",
    "progressPercent": 75,
    "formattedCreatedAt": "13/09/2026",
    "formattedUpdatedAt": "13/09/2026 05:49",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & mã vạch",
        "description": "Chụp chi tiết đầu cắm, mã sản phẩm và tem kiểm tra chất lượng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T02:49:38.000Z",
        "formattedCapturedAt": "13/09/2026 02:49",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Bọc màng chống xước & chống ẩm",
        "description": "Chụp sản phẩm sau khi bọc lớp màng đệm và gói chống ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T03:49:38.000Z",
        "formattedCapturedAt": "13/09/2026 03:49",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Xếp vào thùng carton nội bộ",
        "description": "Chụp sản phẩm đã được xếp ngay ngắn trong thùng carton",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T04:49:38.000Z",
        "formattedCapturedAt": "13/09/2026 04:49",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 4,
        "title": "Dán nhãn vận chuyển & niêm phong",
        "description": "Chụp tổng thể thùng đã dán seal OSA sẵn sàng xuất xưởng",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008258379"
  },
  {
    "po": "101008872329",
    "productCode": "P2419836",
    "productName": "US-EKS3-10R-V",
    "quantity": 1,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46275",
    "createdAt": "2026-09-10T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46272.251617557871",
    "updatedAt": "2026-09-07T06:02:19.000Z",
    "type": "SI",
    "productKey": null,
    "totalStep": 2,
    "currentStep": 2,
    "status": "completed",
    "progressPercent": 100,
    "formattedCreatedAt": "10/09/2026",
    "formattedUpdatedAt": "07/09/2026 06:02",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra đầu nối & chi tiết sản phẩm",
        "description": "Chụp cận cảnh ngoại quan dây dẫn/linh kiện và đầu kết nối",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-07T05:02:19.000Z",
        "formattedCapturedAt": "07/09/2026 05:02",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói bao bì & tem niêm phong",
        "description": "Chụp sản phẩm trong túi/hộp đóng gói kèm tem nhãn OSA",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-07T06:02:19.000Z",
        "formattedCapturedAt": "07/09/2026 06:02",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      }
    ],
    "qrPayload": "101008872329"
  },
  {
    "po": "101008348773",
    "productCode": "P2410967",
    "productName": "KGW06100T-RC",
    "quantity": 1,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46281",
    "createdAt": "2026-09-16T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46279.35041890046",
    "updatedAt": "2026-09-14T08:24:36.000Z",
    "type": "KGW",
    "productKey": "KGW",
    "totalStep": 5,
    "currentStep": 4,
    "status": "in_progress",
    "progressPercent": 80,
    "formattedCreatedAt": "16/09/2026",
    "formattedUpdatedAt": "14/09/2026 08:24",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra linh kiện & mã QR PO",
        "description": "Kiểm tra ngoại quan linh kiện và quét mã PO",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T04:24:36.000Z",
        "formattedCapturedAt": "14/09/2026 04:24",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng túi chống tĩnh điện ESD",
        "description": "Chụp linh kiện sau khi đóng túi ESD kín",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T05:24:36.000Z",
        "formattedCapturedAt": "14/09/2026 05:24",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Đặt vào khay xốp định hình",
        "description": "Chụp lớp bảo vệ chống va đập định hình trong khay",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T06:24:36.000Z",
        "formattedCapturedAt": "14/09/2026 06:24",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 4,
        "title": "Đóng hộp sản phẩm & tem KGW",
        "description": "Chụp hộp đựng sản phẩm dán tem chứng nhận",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T07:24:36.000Z",
        "formattedCapturedAt": "14/09/2026 07:24",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 5,
        "title": "Đóng kiện xuất xưởng OSA",
        "description": "Chụp kiện hàng tổng thể sẵn sàng bàn giao lưu kho",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008348773"
  },
  {
    "po": "101008277127",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46280",
    "createdAt": "2026-09-15T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46279.556039120369",
    "updatedAt": "2026-09-14T13:20:41.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 6,
    "currentStep": 5,
    "status": "in_progress",
    "progressPercent": 83,
    "formattedCreatedAt": "15/09/2026",
    "formattedUpdatedAt": "14/09/2026 13:20",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Kiểm tra nguyên vật liệu & thông số",
        "description": "Chụp tem PO đối chiếu với thông số kỹ thuật sản phẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T08:20:41.000Z",
        "formattedCapturedAt": "14/09/2026 08:20",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Kiểm tra bấm cos & ống bảo vệ",
        "description": "Chụp cận cảnh chi tiết bấm đầu cos và ống co nhiệt bọc ngoài",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T09:20:41.000Z",
        "formattedCapturedAt": "14/09/2026 09:20",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Đo chiều dài & bó đai định vị",
        "description": "Chụp sản phẩm sau khi uốn định hình và buộc đai cố định",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T10:20:41.000Z",
        "formattedCapturedAt": "14/09/2026 10:20",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 4,
        "title": "Bọc túi bảo vệ & tem QC Pass",
        "description": "Chụp túi thành phẩm kèm tem đạt chất lượng QC",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T11:20:41.000Z",
        "formattedCapturedAt": "14/09/2026 11:20",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 5,
        "title": "Xếp vào thùng carton vận chuyển",
        "description": "Chụp cách sắp xếp và chèn lót chống sốc trong thùng",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-14T12:20:41.000Z",
        "formattedCapturedAt": "14/09/2026 12:20",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 6,
        "title": "Dán niêm phong & kiểm tra cân nặng",
        "description": "Chụp thùng dán seal kèm hiển thị trọng lượng đạt chuẩn",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008277127"
  },
  {
    "po": "101008276865",
    "productCode": "H0057444",
    "productName": "HF-KXL06100-CW-HNB",
    "quantity": 10,
    "printFlag": "9",
    "deleteFlag": null,
    "group": "OSA",
    "creator": "F1-SERVEROST",
    "cdtRaw": "46278",
    "createdAt": "2026-09-13T00:00:00.000Z",
    "updator": "10321",
    "udtRaw": "46278.242937812502",
    "updatedAt": "2026-09-13T05:49:49.000Z",
    "type": "DAY DIEN",
    "productKey": null,
    "totalStep": 3,
    "currentStep": 2,
    "status": "in_progress",
    "progressPercent": 67,
    "formattedCreatedAt": "13/09/2026",
    "formattedUpdatedAt": "13/09/2026 05:49",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Ngoại quan sản phẩm & quy cách",
        "description": "Chụp sản phẩm cùng phiếu chỉ thị PO kiểm tra đúng chủng loại",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T03:49:49.000Z",
        "formattedCapturedAt": "13/09/2026 03:49",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 2,
        "title": "Đóng gói túi bảo vệ & chống ẩm",
        "description": "Chụp sản phẩm được xếp vào túi PE/khay định hình kèm gói hút ẩm",
        "isCompleted": true,
        "photoUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "capturedAt": "2026-09-13T04:49:49.000Z",
        "formattedCapturedAt": "13/09/2026 04:49",
        "operatorId": "10321",
        "notes": "Ảnh chụp đạt yêu cầu, kiểm tra ngoại quan hoàn tất."
      },
      {
        "stepNumber": 3,
        "title": "Đóng thùng carton & dán nhãn",
        "description": "Chụp thùng carton hoàn chỉnh dán seal niêm phong",
        "isCompleted": false
      }
    ],
    "qrPayload": "101008276865"
  }
];


// Bản ghi mẫu theo từng kịch bản test giao diện
export const SCENARIO_PENDING_PO = MOCK_PHOTO_PACKING_ITEMS.find((item) => item.status === "pending")!;
export const SCENARIO_IN_PROGRESS_PO = MOCK_PHOTO_PACKING_ITEMS.find((item) => item.status === "in_progress")!;
export const SCENARIO_COMPLETED_PO = MOCK_PHOTO_PACKING_ITEMS.find((item) => item.status === "completed")!;
export const SCENARIO_MULTI_STEP_PO = MOCK_PHOTO_PACKING_ITEMS.find((item) => item.totalStep === 6)!;

/**
 * Tính toán số liệu thống kê tổng quan
 */
export function getPackingStatistics(): PackingStatistics {
  const totalOrders = MOCK_PHOTO_PACKING_ITEMS.length;
  const completedOrders = MOCK_PHOTO_PACKING_ITEMS.filter((item) => item.status === "completed").length;
  const inProgressOrders = MOCK_PHOTO_PACKING_ITEMS.filter((item) => item.status === "in_progress").length;
  const pendingOrders = MOCK_PHOTO_PACKING_ITEMS.filter((item) => item.status === "pending").length;
  const totalQuantity = MOCK_PHOTO_PACKING_ITEMS.reduce((sum, item) => sum + item.quantity, 0);
  const completedQuantity = MOCK_PHOTO_PACKING_ITEMS
    .filter((item) => item.status === "completed")
    .reduce((sum, item) => sum + item.quantity, 0);

  const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

  const byType = {
    dayDien: MOCK_PHOTO_PACKING_ITEMS.filter((item) => item.type === "DAY DIEN").length,
    kgw: MOCK_PHOTO_PACKING_ITEMS.filter((item) => item.type === "KGW").length,
    si: MOCK_PHOTO_PACKING_ITEMS.filter((item) => item.type === "SI").length,
  };

  return {
    totalOrders,
    completedOrders,
    inProgressOrders,
    pendingOrders,
    completionRate,
    totalQuantity,
    completedQuantity,
    byType,
  };
}

/**
 * Tìm kiếm đơn đóng gói theo mã PO
 */
export function getPackingOrderByPO(po: string): PhotoPackingItem | undefined {
  const cleanPo = po.trim().toLowerCase();
  return MOCK_PHOTO_PACKING_ITEMS.find(
    (item) => item.po.toLowerCase() === cleanPo || item.qrPayload.toLowerCase() === cleanPo
  );
}

/**
 * Lọc và tìm kiếm danh sách đơn đóng gói theo điều kiện
 */
export function getPackingOrders(params?: PackingFilterParams): PhotoPackingItem[] {
  if (!params) return [...MOCK_PHOTO_PACKING_ITEMS];

  return MOCK_PHOTO_PACKING_ITEMS.filter((item) => {
    // Lọc theo từ khóa tìm kiếm (PO, mã sản phẩm, tên sản phẩm)
    if (params.search && params.search.trim() !== "") {
      const q = params.search.trim().toLowerCase();
      const matchPo = item.po.toLowerCase().includes(q);
      const matchCode = item.productCode.toLowerCase().includes(q);
      const matchName = item.productName.toLowerCase().includes(q);
      if (!matchPo && !matchCode && !matchName) return false;
    }

    // Lọc theo trạng thái
    if (params.status && params.status !== "all") {
      if (item.status !== params.status) return false;
    }

    // Lọc theo phân loại sản phẩm
    if (params.type && params.type !== "all") {
      if (item.type !== params.type) return false;
    }

    // Lọc theo mã người thao tác
    if (params.updator && params.updator !== "all") {
      if (item.updator !== params.updator) return false;
    }

    return true;
  }).sort((a, b) => {
    if (!params.sortBy) return 0;
    const order = params.sortOrder === "desc" ? -1 : 1;

    switch (params.sortBy) {
      case "po":
        return a.po.localeCompare(b.po) * order;
      case "updatedAt":
        return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * order;
      case "progress":
        return (a.progressPercent - b.progressPercent) * order;
      case "quantity":
        return (a.quantity - b.quantity) * order;
      default:
        return 0;
    }
  });
}

/**
 * Lấy danh sách các mã QR mẫu để test nhanh với camera scanner
 */
export function getSampleQRCodes(): { label: string; po: string; qrUrl: string; status: string }[] {
  return [
    {
      label: "Đơn Chưa Chụp (PO: 101008296575 - 0/2 bước)",
      po: "101008296575",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=101008296575",
      status: "pending",
    },
    {
      label: "Đơn Đang Chụp (PO: 101008277127 - 5/6 bước)",
      po: "101008277127",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=101008277127",
      status: "in_progress",
    },
    {
      label: "Đơn Hoàn Thành (PO: 101008323849 - 1/1 bước)",
      po: "101008323849",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=101008323849",
      status: "completed",
    },
    {
      label: "Đơn Linh Kiện KGW (PO: 101008348773 - 4/5 bước)",
      po: "101008348773",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=101008348773",
      status: "in_progress",
    },
  ];
}
