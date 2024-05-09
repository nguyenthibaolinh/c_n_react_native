import http from '@/utils/http'

const PREV_URL = '/purchases'
export const PurchaseKey = 'purchases'

type BuyChapterBody = {
  ChapterId: string
}

const PurchaseServices = {
  buyChapter: (body: BuyChapterBody) => {
    return http.post(`${PREV_URL}/buy-chapter`, body)
  },
}

export default PurchaseServices
