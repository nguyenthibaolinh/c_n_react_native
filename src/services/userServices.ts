import http from '@/utils/http'

const PREV_URL = '/users'
export const UserKey = 'users'

const UserServices = {
  all: () => {
    return http.get(PREV_URL)
  },
}

export default UserServices
