import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import StoryItem from './StoryItem'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectStoryFilter } from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'
import { StoriesPaginate } from '@/types/storyType'
import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
import StoryServices, { StoryKey } from '@/services/storyServices'
import { useQuery } from '@tanstack/react-query'

interface IStoriesListProps {
  navigation: any
}

const StoriesList: React.FunctionComponent<IStoriesListProps> = (props) => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()
  const { navigation } = props

  const {
    data: response,
    isLoading,
    isPending,
    isSuccess,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [StoryKey, storyFilter],
    queryFn: () => {
      return StoryServices.all(storyFilter)
    },
  })

  // console.log(storyFilter)

  const StoriesPaginate: StoriesPaginate = response?.data

  // console.log(StoriesPaginate, isSuccess, isError, error)

  //---------------refresh---------------

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Gọi hàm refetch khi màn hình được focus để làm mới dữ liệu
      refetch()
    })
    return unsubscribe
  }, [navigation, refetch])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Thực hiện các thao tác cần thiết để làm mới dữ liệu
    refetch()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false))
  }, [refetch])

  return (
    <View className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isSuccess &&
          StoriesPaginate.data.map((story) => (
            <StoryItem story={story} key={story.id} navigation={navigation} />
          ))}
      </ScrollView>
    </View>
  )
}

export default StoriesList
