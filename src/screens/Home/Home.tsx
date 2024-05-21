import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import { ListFilter, Search } from 'lucide-react-native'
import StoriesList from '@/components/StoriesList'
import { Button } from '@/components/ui/button'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'
import { StoriesQuery } from '@/types/storyType'

const STORY_TYPE = {
  novel: StoryTypeEnum.WORD,
  comic: StoryTypeEnum.COMIC,
}

type StoryTypeKey = keyof typeof STORY_TYPE

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation } = props
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()
  // const filterStoryNavigate = useFilterStory()

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

    // filterStoryNavigate(storyFilterNew)
  }

  return (
    <View className="flex-1 ">
      <View className="h-[12%] w-[100%] flex-row justify-end items-end p-3 gap-2 bg-white">
        <TouchableOpacity
          onPress={() => navigation.navigate('FilterCategories')}
        >
          <ListFilter className="" color="black" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Search color="black" size={30} />
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        {Object.keys(STORY_TYPE).map((storyTypeKey) => (
          <Button
            className="border-orange-500 bg-orange-500 w-[50%] h-[40px]"
            key={storyTypeKey}
            variant={
              STORY_TYPE[storyTypeKey as StoryTypeKey] === storyFilter.type
                ? 'outline'
                : 'default'
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
      <StoriesList navigation={navigation} />
    </View>
  )
}

export default HomeScreen
