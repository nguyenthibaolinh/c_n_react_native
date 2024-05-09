import http from '@/utils/http'

const PREV_URL = '/transaction-histories'
export const TransactionHistoryKey = 'transaction_histories'

type InsertBody = {
  type: number
  money: number
}

const TransactionHistoryServices = {
  insert: (body: InsertBody) => {
    return http.post(PREV_URL, body)
  },
}

export default TransactionHistoryServices
