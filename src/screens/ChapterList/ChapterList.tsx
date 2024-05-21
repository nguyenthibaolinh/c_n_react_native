import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from '../../components/ui/button'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import { CircleDollarSign } from 'lucide-react-native'
import { ChaptersResponse } from '@/types/chapterType'
import { Story } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import { ChapterKey } from '@/services/chapterServices'
import StoryServices from '@/services/storyServices'
import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import { RouteProp } from '@react-navigation/native'

interface ChapterListScreenRouteParams {
  storySlug: string
  storyId: string
}

type IChapterListScreenProps = IStackScreenProps & {
  route: RouteProp<{ params: ChapterListScreenRouteParams }, 'params'>
  navigation: any
}

const ChapterListScreen: React.FunctionComponent<IChapterListScreenProps> = ({
  route,
  navigation,
}) => {
  const { storySlug, storyId } = route.params
  const [chapterSort, setChapterSort] = useState(ChapterSortEnum.FIRST)

  const {
    data: chaptersResponse,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['ChapterKey', storySlug, storyId, chapterSort],
    queryFn: () => {
      return StoryServices.chapters({
        storySlug,
        storyId: `${storyId}`,
        order: chapterSort,
      })
    },
  })
  // console.log(storySlug)
  const chapters: ChaptersResponse[] = chaptersResponse?.data
  // console.log(chapters)
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
    <View className="h-[100%] w-[100%] p-3 pt-1 gap-2 bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isSuccess &&
          chapters.map((chapter) => (
            <View className="flex-row border-b-[1px] pb-[5px] pt-2 justify-between">
              <Text className="text-[18px]">
                {chapter.number} - {chapter.name}
              </Text>
              {!chapter.isFree && (
                <View className="flex-row gap-1 items-center">
                  <CircleDollarSign color="black" size={20} />
                  <Text className="text-[18px]">{chapter.price}</Text>
                </View>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  )
}

export default ChapterListScreen
