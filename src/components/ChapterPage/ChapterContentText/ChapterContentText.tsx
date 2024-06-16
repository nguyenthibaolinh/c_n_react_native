import React from 'react'
import { View, useWindowDimensions, ScrollView } from 'react-native'
import RenderHTML from 'react-native-render-html'

type ChapterContentTextProp = {
  content: string
}
const ChapterContentText: React.FunctionComponent<ChapterContentTextProp> = ({
  content,
}) => {
  const { width } = useWindowDimensions()

  return (
    <ScrollView>
      <View className="pl-4 pr-4">
        <RenderHTML contentWidth={width} source={{ html: content }} />
      </View>
    </ScrollView>
  )
}

export default ChapterContentText
