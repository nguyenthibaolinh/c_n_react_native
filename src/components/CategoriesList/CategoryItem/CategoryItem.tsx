import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import { Category } from '@/types/categoryType'

type CategoryItemProps = {
  category: Category
  navigation: any
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  category,
  navigation,
}) => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(
      updateStoryFilter({
        categoryIn: `${category.id}`,
        page: 1,
      })
    )
    navigation.navigate('DestinationScreen', {
      categoryIn: category.id,
      type: storyFilter.type,
    })
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <Text className="border-gray-200 bg-gray-200 rounded-[20] justify-between p-2 pl-4 pr-4 mt-1 text-[16px]">
        {category.name}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryItem
