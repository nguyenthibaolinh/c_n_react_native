import http from '@/utils/http'

const PREV_URL = '/categories'
export const CategoryKey = 'categories'

const CategoryServices = {
  all: () => {
    return http.get(PREV_URL)
  },
}

export default CategoryServices
