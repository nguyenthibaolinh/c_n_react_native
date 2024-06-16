import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import { List, ListFilter, Search } from 'lucide-react-native'
import StoriesList from '@/components/StoriesList'
import StoryListBox from '@/components/FavoritePage/StoryListBox'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { initAuth, resetAuth, selectAuth } from '@/features/auth/authSlice'
import { resetAuthLS } from '@/utils/authLS'
import AuthNavigator from '@/navigators/AuthNavigator'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

const PersonalScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)

  useEffect(() => {
    if (auth.isInitialized && !auth.isAuthenticated) {
      navigation.navigate('AuthNavigator')
      console.log(auth)
    }
  }, [auth])

  const handleSignIn = () => {
    dispatch(resetAuth())
    resetAuthLS()
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Button
        style={{ backgroundColor: '#FA8035' }}
        mode="contained"
        onPress={handleSignIn}
      >
        ĐĂNG XUẤT
      </Button>
    </View>
  )
}

export default PersonalScreen
