import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import { StoriesQuery } from '@/types/storyType'
import { useEffect, useRef } from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'

// import CategoryFilterBox from './CategoryFilterBox'
// import StatusFilterBox from './StatusFilterBox'
// import { useAppDispatch, useAppSelector } from '@/app/hooks'
// import {
//   selectStoryFilter,
//   updateStoryFilter,
// } from '@/features/stories/storyFilterSlide'
// import AuthorFilterBox from './AuthorFilterBox'
// import UserFilterBox from './UserFilterBox/UserFilterBox'
// import SortFilterBox from './SortFilterBox'
// import { useTranslation } from 'react-i18next'
// import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
// import useFilterStory from '@/hooks/useFilterStory'
// import { StoriesQuery } from '@/types/storyType'
// import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
// import { Button } from '@/components/ui/button'

const STORY_TYPE = {
  novel: StoryTypeEnum.WORD,
  comic: StoryTypeEnum.COMIC,
}

type StoryTypeKey = keyof typeof STORY_TYPE

const StoryFilterBox = () => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()

  const handleChangeStoryType = (storyTypeKey: StoryTypeKey) => {
    const storyFilterNew: StoriesQuery = {
      type: STORY_TYPE[storyTypeKey],
      page: 1,
      categoryIn: '',
      categoryNotIn: '',
      isFull: null,
      key: '',
    }
    dispatch(updateStoryFilter(storyFilterNew))
  }

  return (
    <View className="flex justify-center gap-4">
      {Object.keys(STORY_TYPE).map((storyTypeKey) => (
        <Button
          key={storyTypeKey}
          variant={
            STORY_TYPE[storyTypeKey as StoryTypeKey] === storyFilter.type
              ? 'default'
              : 'outline'
          }
          onPress={() => {
            handleChangeStoryType(storyTypeKey as StoryTypeKey)
          }}
        >
          <Text>
            {StoryTypeEnum.getNameByValue(
              STORY_TYPE[storyTypeKey as StoryTypeKey]
            )}
          </Text>
        </Button>
      ))}
    </View>
  )
}

export default StoryFilterBox
