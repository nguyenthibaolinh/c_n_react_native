import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { ArrowLeft, ArrowRight } from 'lucide-react-native'
import { IStackScreenProps } from '@/library/StackScreenProps'
import { useQuery } from '@tanstack/react-query'
import { ChapterResponse, ChaptersResponse } from '@/types/chapterType'
import StoryServices from '@/services/storyServices'
import { ChapterKey } from '@/services/chapterServices'
import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'

type ChapterNavigationProp = {
  chapter: ChapterResponse
  storyId: string
  storySlug: string
  navigation: any
}
const ChapterNavigation: React.FunctionComponent<ChapterNavigationProp> = ({
  storyId,
  storySlug,
  chapter,
  navigation,
}) => {
  const [prevChapter, setPrevChapter] = useState<ChaptersResponse>()
  const [nextChapter, setNextChapter] = useState<ChaptersResponse>()
  const [currChapter, setCurrChapter] = useState<ChaptersResponse>()

  const chaptersQuery = useQuery({
    queryKey: [ChapterKey, storySlug, Number(storyId), ChapterSortEnum.FIRST],
    queryFn: () => {
      return StoryServices.chapters({
        storySlug: storySlug,
        storyId: storyId,
        order: ChapterSortEnum.FIRST,
      })
    },
  })

  const chapters: ChaptersResponse[] = chaptersQuery.data?.data

  useEffect(() => {
    if (chaptersQuery.isSuccess) {
      const currentIndex = chapters.findIndex(
        (chapterItem) => chapterItem.id === chapter.id
      )
      setCurrChapter(chapters[currentIndex])
      setPrevChapter(chapters[currentIndex - 1])

      setNextChapter(chapters[currentIndex + 1])
    }
  }, [chaptersQuery])

  return (
    <View className="flex-row justify-between items-center p-4 bg-white border-gray-200">
      {prevChapter ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chapter', {
              storySlug: storySlug,
              storyId: storyId,
              chapterId: prevChapter.id,
            })
          }}
          className="p-4"
        >
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <ArrowLeft size={24} color="gray" />
      )}

      <Text>Chương {currChapter?.number}</Text>

      {nextChapter ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chapter', {
              storySlug: storySlug,
              storyId: storyId,
              chapterId: nextChapter.id,
            })
          }}
          className="p-4"
        >
          <ArrowRight size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <ArrowRight size={24} color="gray" />
      )}
    </View>
  )
}

export default ChapterNavigation
