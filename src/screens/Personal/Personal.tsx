import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../../components/ui/button'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import { List, ListFilter, Search } from 'lucide-react-native'
import StoriesList from '@/components/StoriesList'
import StoryListBox from '@/components/FavoritePage/StoryListBox'

const PersonalScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging('Home Screen')
  const { navigation } = props

  useEffect(() => {
    logging.info({ navigation })
  }, [logging])

  return (
    <View className="flex-1 ">
      <StoryListBox navigation={navigation} />
    </View>
  )
}

export default PersonalScreen
