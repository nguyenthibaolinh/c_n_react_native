import { useAppDispatch, useAppSelector } from '@/app/hooks'
import SearchBoxUI from '@/components/SearchBoxUI'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'

const SearchBox = () => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()
  const filterStoryNavigate = useFilterStory()

  const handleSearch = (searchValue: string) => {
    dispatch(
      updateStoryFilter({
        key: searchValue,
        page: 1,
      })
    )

    filterStoryNavigate({
      ...storyFilter,
      key: searchValue,
      page: 1,
    })
  }

  return <SearchBoxUI onSearch={handleSearch} searchKey={storyFilter.key} />
}

export default SearchBox
