import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Button,
  FlatList,
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
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'
import { StoriesPaginate, StoriesResponse } from '@/types/storyType'
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

  console.log(storyFilter)

  const storiesPaginate: StoriesPaginate = response?.data

  console.log(storiesPaginate?.total)

  //---------------refresh---------------

  const [refreshing, setRefreshing] = useState(false)
  const [storiesList, setStoriesList] = useState<StoriesResponse[]>([])

  useEffect(() => {
    if (isSuccess && storiesPaginate.curPage == 1) {
      setStoriesList([...storiesPaginate.data])
    }
    if (isSuccess && storiesPaginate.curPage != 1) {
      setStoriesList([...storiesList, ...storiesPaginate.data])
    }
  }, [storiesPaginate])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Gọi hàm refetch khi màn hình được focus để làm mới dữ liệu
      refetch()
    })
    return unsubscribe
  }, [navigation, refetch])

  const onRefresh = () => {
    setRefreshing(true)
    // Thực hiện các thao tác cần thiết để làm mới dữ liệu
    // refetch()
    //   .then(() => setRefreshing(false))
    //   .catch(() => setRefreshing(false))
    dispatch(updateStoryFilter({ page: 1 }))
    setRefreshing(false)
  }

  return (
    <View className="flex-1">
      {isSuccess && (
        <FlatList
          data={storiesList}
          renderItem={({ item }) => (
            <StoryItem story={item} key={item.id} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (
              storiesPaginate.curPage <
              storiesPaginate.total / storiesPaginate.perPage
            ) {
              dispatch(updateStoryFilter({ page: storiesPaginate.curPage + 1 }))
            }
          }}
        ></FlatList>
      )}
    </View>
  )
}

export default StoriesList
