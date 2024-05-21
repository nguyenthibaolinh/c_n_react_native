import http from '@/utils/http'

const PREV_URL = '/follow-stories'
export const FollowStoryKey = 'follow_stories'

const FollowStoryServices = {
  get: (storyId: string) => {
    return http.get(`${PREV_URL}/${storyId}`)
  },
  update: (storyId: string) => {
    return http.put(`${PREV_URL}/${storyId}`)
  },
}

export default FollowStoryServices
