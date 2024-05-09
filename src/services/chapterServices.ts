import { ChapterCreate } from '@/types/chapterType'
import http from '@/utils/http'

const PREV_URL = '/chapters'
export const ChapterKey = 'chapters'

const ChapterServices = {
  getByAuth: (chapterId: string) => {
    return http.get(`${PREV_URL}/auth/${chapterId}`)
  },

  get: (chapterId: string) => {
    return http.get(`${PREV_URL}/${chapterId}`)
  },

  create: (data: ChapterCreate) => {
    return http.post(PREV_URL, data)
  },

  update: (chapterId: string, data: ChapterCreate) => {
    return http.put(`${PREV_URL}/${chapterId}`, data)
  },

  delete: (chapterId: number) => {
    return http.delete(`${PREV_URL}/${chapterId}`)
  },

  public: (chapterIds: number[]) => {
    return http.put(PREV_URL + '/public', { ids: chapterIds })
  },
}

export default ChapterServices
