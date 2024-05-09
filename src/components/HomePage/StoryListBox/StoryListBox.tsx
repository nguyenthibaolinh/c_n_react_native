import { StoriesQuery, StoriesPaginate } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import storyServices, { StoryKey } from '@/services/storyServices'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'
import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
import StoryGrid from '@/components/StoryGrid'
import Pagination from '@/components/Pagination'
import CategoryServices, { CategoryKey } from '@/services/categoryServices'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Category } from '@/types/categoryType'
import { useTranslation } from 'react-i18next'

const StoryListBox = () => {
  const { t } = useTranslation(['cms'])
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()

  const filterStoryNavigate = useFilterStory()

  const storyOptions: StoriesQuery = useGetStoryQuery({ withType: true })

  const {
    data: response,
    isLoading,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [StoryKey, storyOptions],
    queryFn: () => {
      return storyServices.all(storyOptions)
    },
  })

  const { data: categoriesResponse } = useQuery({
    queryKey: [CategoryKey],
    queryFn: CategoryServices.all,
    gcTime: 86400000,
  })

  const categories: Category[] = categoriesResponse?.data

  const onPageChange = (data: number) => {
    dispatch(
      updateStoryFilter({
        page: data,
      })
    )
    filterStoryNavigate({ ...storyFilter, page: data })
  }

  const StoriesPaginate: StoriesPaginate = response?.data
  return (
    <HelmetProvider>
      <Helmet>
        {categories && storyFilter.categoryIn !== '' ? (
          <title>
            {`${t('cms:stories.title')} `}
            {categories
              .filter((category) =>
                storyFilter.categoryIn.split(',').includes(`${category.id}`)
              )
              .map((category) => category.name)
              .join(', ')}
          </title>
        ) : (
          <title>Truyện chữ và truyện tranh</title>
        )}
      </Helmet>
      {(isLoading || isPending) && (
        <StoryGrid stories={StoriesPaginate?.data} isLoad={true} />
      )}
      {isSuccess && (
        <>
          <StoryGrid stories={StoriesPaginate.data} />
          <div>
            <Pagination
              total={StoriesPaginate.total}
              pageSize={StoriesPaginate.perPage}
              currentPage={StoriesPaginate.curPage}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </HelmetProvider>
  )
}

export default StoryListBox
