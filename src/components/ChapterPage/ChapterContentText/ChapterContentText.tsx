import { ChapterResponse } from '@/types/chapterType'
import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'

type ChapterContentTextProp = {
  content: string
}
const ChapterContentText: React.FunctionComponent<ChapterContentTextProp> = ({
  content,
}) => {
  const { width } = useWindowDimensions()

  return (
    <View className="pl-4 pr-4">
      <RenderHTML contentWidth={width} source={{ html: content }} />
    </View>
  )
}

export default ChapterContentText
