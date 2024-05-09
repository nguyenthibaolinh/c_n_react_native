import { StoriesQuery } from '@/types/storyType'
import useQueryParams from './useQueryParams'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'

export type UseGetStoryQueryParams = {
  withType?: boolean
}

export const useGetStoryQuery = (
  params: UseGetStoryQueryParams
): StoriesQuery => {
  const queryParam = useQueryParams()
  let isFull = null

  if (queryParam.isFull && queryParam.isFull !== 'null') {
    isFull = queryParam.isFull === 'true'
  }

  let typeObj = null
  if (params.withType) {
    typeObj = {
      type: queryParam.type ? +queryParam.type : StoryTypeEnum.WORD,
    }
  }

  return {
    // perPage: queryParam.perPage ? +queryParam.perPage : 10,
    page: queryParam.page ? +queryParam.page : 1,
    isFull: isFull,
    key: queryParam.key ?? '',
    authorId: queryParam.authorId ? +queryParam.authorId : undefined,
    categoryIn: queryParam.categoryIn ?? '',
    categoryNotIn: queryParam.categoryNotIn ?? '',
    order: queryParam.order ?? 'update',
    userId: queryParam.userId ? +queryParam.userId : undefined,
    ...typeObj,
  }
}
