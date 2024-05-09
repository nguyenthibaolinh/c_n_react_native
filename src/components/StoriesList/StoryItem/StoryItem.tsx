import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ListFilter, Search } from 'lucide-react-native'
import { IStackScreenProps } from '@/library/StackScreenProps'

interface IStoryItemProps {
  storyItem: {
    image: string
    name: string
    chapterEnd: string
  }
}

const StoryItem: React.FunctionComponent<IStoryItemProps> = (props) => {
  let { image, name, chapterEnd } = props.storyItem

  return (
    <View className="bg-red-600 h-[14%] w-[100%] flex-row items-center">
      <Image
        className="w-[80px] h-[80px] rounded-[50] ml-2"
        source={{ uri: image }}
        resizeMode="stretch"
      />
      <View className="bg-green-500 w-[70%] h-[85%] ml-2">
        <Text className="text-[20px] font-bold">{name}</Text>
        <Text className="text-[20px] ">{chapterEnd}</Text>
      </View>
    </View>
  )
}

export default StoryItem
