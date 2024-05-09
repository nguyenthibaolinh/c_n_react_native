import http from '@/utils/http'

const PREV_URL = '/like-stories'
export const LikeStoryKey = 'like_stories'

const LikeStoryServices = {
  get: (storyId: number) => {
    return http.get(`${PREV_URL}/${storyId}`)
  },
  update: (storyId: number) => {
    return http.put(`${PREV_URL}/${storyId}`)
  },
}

export default LikeStoryServices
