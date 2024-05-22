import { useAppSelector } from '@/app/hooks'
import ChapterContentImage from '@/components/ChapterPage/ChapterContentImage'
import ChapterContentText from '@/components/ChapterPage/ChapterContentText'
// import ChapterNavigation from '@/components/ChapterPage/ChapterNavigation'
import PurchaseAlert from '@/components/PurchaseAlert'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import { selectAuth } from '@/features/auth/authSlice'
import ChapterServices, { ChapterKey } from '@/services/chapterServices'
import { ChapterResponse } from '@/types/chapterType'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import ChapterNavigation from '@/components/ChapterNavigation'
import { ArrowLeft, ArrowRight } from 'lucide-react-native'
import Story from '../Story'

interface ChapterRouteParams {
  chapterId: string
  storySlug: string
  storyId: string
}

type ChapterProps = {
  route: RouteProp<{ params: ChapterRouteParams }, 'params'>
  navigation: any
}

const ChapterScreen: React.FunctionComponent<ChapterProps> = ({
  route,
  navigation,
}) => {
  const { storySlug, storyId, chapterId } = route.params

  const {
    data: chapterResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [ChapterKey, 'get', chapterId],
    queryFn: () => {
      return ChapterServices.get(chapterId)
    },
  })

  const authSelector = useAppSelector(selectAuth)

  if (isError) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data
      if (responseData?.code === 'chapter.need_purchase') {
        if (authSelector.user.accountBalance >= responseData?.price) {
          return (
            <PurchaseAlert chapterId={chapterId} price={responseData.price} />
          )
        } else {
          navigation.replace('CoinPurchaseScreen')
          return null
        }
      }
    }
  }

  const chapter: ChapterResponse = chapterResponse?.data

  return (
    <View>
      {isSuccess && (
        <>
          {/* <ChapterNavigation chapter={chapter} /> */}
          <View>
            {chapter.type === StoryTypeEnum.WORD && (
              <ChapterContentText content={chapter.content} />
            )}
            {chapter.type === StoryTypeEnum.COMIC && (
              <ChapterContentImage content={chapter.content} />
            )}
          </View>
          <ChapterNavigation />
        </>
      )}
    </View>
  )
}

export default ChapterScreen
