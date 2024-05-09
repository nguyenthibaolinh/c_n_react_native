import http from '@/utils/http'

const PREV_URL = '/authors'
export const AuthorKey = 'authors'

const AuthorServices = {
  all: () => {
    return http.get(PREV_URL)
  },
}

export default AuthorServices
