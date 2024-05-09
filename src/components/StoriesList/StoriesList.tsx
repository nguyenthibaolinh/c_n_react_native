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
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import { ListFilter, Search } from 'lucide-react-native'
import StoryItem from './StoryItem'

const StoriesList = () => {
  const [storyList, setStoryList] = useState([
    {
      image:
        'https://thuthuatnhanh.com/wp-content/uploads/2021/06/hinh-anh-ngon-tinh-dep-my-man.jpg',
      name: 'anh1',
      chapterEnd: '100',
    },
    {
      image:
        'https://i.pinimg.com/736x/93/88/3e/93883e26ec2d5e03fa9b1fcdd047ac90.jpg',
      name: 'anh2',
      chapterEnd: '100',
    },
    {
      image: 'https://cdn-4.ohay.tv/imgs/249e4499926e47ef867c/728.jpg',
      name: 'anh3',
      chapterEnd: '100',
    },
    {
      image:
        'https://thuthuatnhanh.com/wp-content/uploads/2021/06/hinh-anh-ngon-tinh-dep-my-man.jpg',
      name: 'anh1',
      chapterEnd: '100',
    },
    {
      image:
        'https://i.pinimg.com/736x/93/88/3e/93883e26ec2d5e03fa9b1fcdd047ac90.jpg',
      name: 'anh2',
      chapterEnd: '100',
    },
    {
      image: 'https://cdn-4.ohay.tv/imgs/249e4499926e47ef867c/728.jpg',
      name: 'anh3',
      chapterEnd: '100',
    },
    {
      image:
        'https://thuthuatnhanh.com/wp-content/uploads/2021/06/hinh-anh-ngon-tinh-dep-my-man.jpg',
      name: 'anh1',
      chapterEnd: '100',
    },
    {
      image:
        'https://i.pinimg.com/736x/93/88/3e/93883e26ec2d5e03fa9b1fcdd047ac90.jpg',
      name: 'anh2',
      chapterEnd: '100',
    },
    {
      image: 'https://cdn-4.ohay.tv/imgs/249e4499926e47ef867c/728.jpg',
      name: 'anh3',
      chapterEnd: '100',
    },
  ])

  return (
    <View className="flex-1">
      <ScrollView>
        {storyList.map((story) => (
          <StoryItem storyItem={story} />
        ))}
      </ScrollView>
    </View>
  )
}

export default StoriesList
