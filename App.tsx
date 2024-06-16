import {
  NavigationContainer,
  Theme,
  ThemeProvider,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { useLogging } from '@/hooks/useLogging'
import SignInScreen from '@/screens/SignIn'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/config/reactQuery'
import ToastManager from 'toastify-react-native'

import './global.css'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage'
import { Platform, StatusBar } from 'react-native'
import Home from '@/screens/Home'
import CategoriesScreen from '@/screens/Notify'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PersonalScreen from '@/screens/Personal'
import NotifyScreen from '@/screens/Notify'
import { Bell, LucideHome, UserRound } from 'lucide-react-native'
import SearchScreen from '@/screens/Search/Search'
import FilterCategoriesScreen from '@/screens/FilterCategories/FilterCategories'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import ChapterListScreen from '@/screens/ChapterList/ChapterList'
import StoryScreen from '@/screens/Story/Story'
import ChapterScreen from '@/screens/Chapter/Chapter'
import AuthNavigator from '@/navigators/AuthNavigator'
import MainNavigator from '@/navigators/MainNavigator'
import AppRouters from '@/navigators/AppRouters'

const Stack = createStackNavigator()

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

export default function App() {
  // const [accessToken, setAccessToken] = useState('')
  // const { getItem, setItem } = useAsyncStorage('assetToken')

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem('theme')
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background')
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light'
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)

        setIsColorSchemeLoaded(true)
        return
      }
      setIsColorSchemeLoaded(true)
    })()
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <QueryClientProvider client={queryClient}>
        <>
          <Provider store={store}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              // translucent
            />
            <NavigationContainer>
              <AppRouters />
            </NavigationContainer>
          </Provider>
        </>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
