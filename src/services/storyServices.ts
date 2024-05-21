import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import { ChapterQuery } from '@/types/chapterType'
import { StoryCreate } from '@/types/storyType'
import http from '@/utils/http'

const PREV_URL = '/stories'
export const StoryKey = 'stories'
// Hàm delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const StoryServices = {
  all: async (options: any) => {
    await delay(2000)
    return http.get(PREV_URL, {
      params: options,
    })
  },

  allByAuth: async (options: any) => {
    await delay(2000)
    return http.get(PREV_URL + '/auth', {
      params: options,
    })
  },

  follow: async (options: any) => {
    return http.get(PREV_URL + '/follow', {
      params: options,
    })
  },

  get: async (slug: string, id: string) => {
    return http.get(PREV_URL + `/${slug}.-.${id}`)
  },

  getByAuth: async (slug: string, id: string) => {
    await delay(2000)
    return http.get(PREV_URL + `/auth/${slug}.-.${id}`)
  },

  chaptersByAuth: async ({
    storySlug,
    storyId,
    order = ChapterSortEnum.LAST,
  }: ChapterQuery) => {
    await delay(2000)
    return http.get(
      PREV_URL + `/auth/${storySlug}.-.${storyId}/chapters?order=${order}`
    )
  },

  chapters: async ({
    storySlug,
    storyId,
    order = ChapterSortEnum.LAST,
  }: ChapterQuery) => {
    return http.get(
      PREV_URL + `/${storySlug}.-.${storyId}/chapters?order=${order}`
    )
  },

  create: async (data: StoryCreate) => {
    return http.post(PREV_URL, data)
  },

  update: async (storyId: string, data: StoryCreate) => {
    return http.put(`${PREV_URL}/${storyId}`, data)
  },

  public: async (storyId: number) => {
    return http.put(`${PREV_URL}/${storyId}/public`)
  },
}

export default StoryServices
