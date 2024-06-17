import {
  StoriesPaginate,
  FollowStoriesQuery,
  StoriesResponse,
} from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import storyServices, { StoryKey } from '@/services/storyServices'
// import useQueryParams from '@/hooks/useQueryParams'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native'
import StoryItem from '@/components/StoriesList/StoryItem'
import { IStackScreenProps } from '@/library/StackScreenProps'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useEffect, useState } from 'react'
import { selectStoryFavoriteFilter } from '@/features/stories/storyFavoriteFilterSlide'

const StoryListBox: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const storyFavoriteFilter = useAppSelector(selectStoryFavoriteFilter)
  const dispatch = useAppDispatch()

  const {
    data: response,
    isPending,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [StoryKey, 'follow', storyFavoriteFilter],
    queryFn: () => {
      return storyServices.follow(storyFavoriteFilter)
    },
  })

  const storiesPaginate: StoriesPaginate = response?.data

  //---------------refresh---------------
  const [refreshing, setRefreshing] = useState(false)
  const [storiesList, setStoriesList] = useState<StoriesResponse[]>([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Gọi hàm refetch khi màn hình được focus để làm mới dữ liệu
      refetch()
    })
    return unsubscribe
  }, [navigation, refetch])

  const onRefresh = () => {
    setRefreshing(true)
    dispatch(updateStoryFilter({ page: 1 }))
    setRefreshing(false)
  }

  useEffect(() => {
    console.log('load ')

    if (isSuccess && storiesPaginate.curPage == 1) {
      setStoriesList([...storiesPaginate.data])
    }
    if (isSuccess && storiesPaginate.curPage != 1) {
      setStoriesList([...storiesList, ...storiesPaginate.data])
    }
  }, [storiesPaginate])

  return (
    <View className="flex-1">
      {(isPending || isFetching) && !isSuccess && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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

export default StoryListBox
