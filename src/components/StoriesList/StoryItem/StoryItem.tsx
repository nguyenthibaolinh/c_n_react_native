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
import { StoriesResponse } from '@/types/storyType'

interface IStoryItemProps {
  story: StoriesResponse
  navigation: any
}

const StoryItem: React.FunctionComponent<IStoryItemProps> = ({
  story,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Story', { storyId: story.id, slug: story.slug })
      }
    >
      <View className="h-[65px] w-[100%] flex-row items-center bg-white">
        <Image
          className="w-[50px] h-[50px] rounded-[50] ml-2"
          source={{ uri: story.avatar ? JSON.parse(story.avatar).url : '' }}
          resizeMode="stretch"
        />
        <View className="w-[76%] h-[60px] ml-2">
          <Text className="text-[20px] font-bold">{story.name}</Text>
          <Text className="text-[16px] ">
            Chương {story.lastChapter?.number}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default StoryItem
