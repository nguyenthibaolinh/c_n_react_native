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
import StoriesList from '@/components/StoriesList'

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation } = props

  return (
    <View className="flex-1 ">
      <View className="h-[12%] w-[100%] flex-row justify-end items-end p-3 gap-2 bg-white">
        <TouchableOpacity
          onPress={() => navigation.navigate('FilterCategories')}
        >
          <ListFilter className="" color="black" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Search color="black" size={30} />
        </TouchableOpacity>
      </View>
      <StoriesList navigation={navigation} />
    </View>
  )
}

export default HomeScreen
