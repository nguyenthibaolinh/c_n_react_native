import http from '@/utils/http'

const PREV_URL = '/follow-stories'
export const FollowStoryKey = 'follow_stories'

const FollowStoryServices = {
  get: (storyId: number) => {
    return http.get(`${PREV_URL}/${storyId}`)
  },
  update: (storyId: number) => {
    return http.put(`${PREV_URL}/${storyId}`)
  },
}

export default FollowStoryServices
