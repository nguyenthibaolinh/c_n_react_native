import React, { useEffect, useState } from 'react'
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
  useWindowDimensions,
} from 'react-native'
import { ListOrdered } from 'lucide-react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import StoryServices, { StoryKey } from '@/services/storyServices'
import { RouteProp } from '@react-navigation/native'
import { Story } from '@/types/storyType'
import StoryStatusEnum from '@/constants/stories/StoryStatusEnum'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import CategoriesList from '@/components/CategoriesList'
import LikeStoryServices, { LikeStoryKey } from '@/services/likeStoryServices'
import FollowStoryServices, {
  FollowStoryKey,
} from '@/services/followStoryServices'
import { alertErrorAxios } from '@/utils/alert'
import RenderHTML from 'react-native-render-html'

interface StoryRouteParams {
  storyId: string
  slug: string
}

type IStoryProps = {
  route: RouteProp<{ params: StoryRouteParams }, 'params'>
  navigation: any
}

const StoryScreen: React.FunctionComponent<IStoryProps> = ({
  navigation,
  route,
}) => {
  const { slug, storyId } = route.params
  const { width } = useWindowDimensions()

  const {
    data: storyResponse,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [StoryKey, 'get', storyId],
    queryFn: () => {
      return StoryServices.get(slug, storyId)
    },
  })
  const story: Story = storyResponse?.data

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

  //---------------------like and follow------
  const { data: likeStoryResponse } = useQuery({
    queryKey: [LikeStoryKey, storyId],
    queryFn: () => LikeStoryServices.get(storyId),
  })

  const { data: followStoryResponse } = useQuery({
    queryKey: [FollowStoryKey, storyId],
    queryFn: () => FollowStoryServices.get(storyId),
  })

  const likeStoryMutation = useMutation({
    mutationFn: () => LikeStoryServices.update(storyId),
  })

  const followStoryMutation = useMutation({
    mutationFn: () => FollowStoryServices.update(storyId),
  })

  const queryClient = useQueryClient()

  const handleLikeStory = async () => {
    try {
      await likeStoryMutation.mutateAsync()

      queryClient.invalidateQueries({
        queryKey: [LikeStoryKey, storyId],
      })
    } catch (error) {
      alertErrorAxios(error)
    }
  }

  const handleFollowStory = async () => {
    try {
      await followStoryMutation.mutateAsync()

      queryClient.invalidateQueries({
        queryKey: [FollowStoryKey, storyId],
      })

      queryClient.refetchQueries({
        queryKey: [StoryKey, 'follow'],
      })
    } catch (error) {
      alertErrorAxios(error)
    }
  }

  return (
    <View className="h-[100%] w-[100%] p-3 pt-1 gap-2 bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isSuccess && (
          <>
            <View className="flex-row">
              <Image
                className="w-[100px] h-[140px] rounded-[10] ml-1 mr-2 mt-3"
                source={{
                  uri: story.avatar ? JSON.parse(story.avatar).url : '',
                }}
                resizeMode="stretch"
              />
              <View className="flex-1">
                <Text className="text-[22px] font-bold mb-1">{story.name}</Text>
                <Text className="text-[15px]">
                  Loại: {StoryTypeEnum.getNameByValue(story.type)}
                </Text>
                <Text className="text-[15px]">
                  Trạng thái: {StoryStatusEnum.getNameByValue(story.isFull)}
                </Text>
                <Text className="text-[15px]">
                  Tác giả: {story.Author.name}
                </Text>
                <Text className="text-[15px]">Lượt xem: {story.viewCount}</Text>
                <Text className="text-[15px]">
                  Lượt thích: {story.likeCount}
                </Text>
                <Text className="text-[15px]">
                  Lượt theo dõi: {story.followCount}
                </Text>
                <View className="flex-row">
                  <Image
                    className="w-[30px] h-[30px] rounded-[50] mt-1"
                    source={
                      story.User.avatar
                        ? {
                            uri: story.User.avatar
                              ? JSON.parse(story.User.avatar).url
                              : '',
                          }
                        : require('../../image/defaultpic.png')
                    }
                    resizeMode="stretch"
                  />

                  <Text className="p-2 font-bold text-[15px]">
                    {story.User.fullName}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row gap-3 justify-start mb-4">
              <CategoriesList
                categories={story.Categories}
                navigation={navigation}
              />
            </View>
            <View className="flex-row gap-3 justify-center">
              <TouchableOpacity onPress={handleLikeStory}>
                <Text className="border-orange-500 bg-orange-500 rounded-[20] justify-between p-2 pl-4 pr-4 text-[16px] text-white">
                  {likeStoryResponse?.data === null ? 'Thích' : 'Bỏ thích'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text className="border-orange-500 bg-orange-500 rounded-[20] justify-between p-2 pl-4 pr-4 text-[16px] text-white">
                  Đọc truyện
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFollowStory}>
                <Text className="border-orange-500 bg-orange-500 rounded-[20] justify-between p-2 pl-4 pr-4 text-[16px] text-white">
                  {followStoryResponse?.data === null
                    ? 'Theo dõi'
                    : 'Bỏ theo dõi'}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between w-full">
              <Text className="text-[19px] font-bold mt-2">
                Giới thiệu truyện
              </Text>
              <View className="p-3">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChapterList', {
                      storySlug: story.slug,
                      storyId: story.id,
                    })
                  }
                >
                  <ListOrdered color="black" size={30} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-[100%] h-[1px] bg-black"></View>
            <RenderHTML
              contentWidth={width}
              source={{ html: story.descriptions }}
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default StoryScreen
