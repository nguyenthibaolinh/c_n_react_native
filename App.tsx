import {
  NavigationContainer,
  Theme,
  ThemeProvider,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
// import IntroScreen from '@/screens/Intro'
import { useLogging } from '@/hooks/useLogging'
import SignInScreen from '@/screens/SignIn'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/config/reactQuery'
import ToastManager from 'toastify-react-native'

// Import your global CSS file
import './global.css'
// import SignUpScreen from '@/screens/SignUp'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import Home from '@/screens/Home'
import CategoriesScreen from '@/screens/Notify'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PersonalScreen from '@/screens/Personal'
import NotifyScreen from '@/screens/Notify'
import { Bell, LucideHome, UserRound } from 'lucide-react-native'
import SearchScreen from '@/screens/Search/Search'
import FilterCategoriesScreen from '@/screens/FilterCategories/FilterCategories'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <LucideHome color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  const [logging] = useLogging('Application')
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  useEffect(() => {
    logging.info('Loading application.')
  }, [logging])

  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem('theme')
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
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
    //
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Intro"
              component={IntroScreen}
              options={{ title: 'Intro' }}
            /> */}
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: 'Đăng nhập' }}
            />
            <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen
              name="FilterCategories"
              component={FilterCategoriesScreen}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{ title: 'Categories' }}
            /> */}
            {/* <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: 'Đăng ký' }}
            /> */}
            {/* <Stack.Screen
              name="ActiveAccount"
              component={ActiveAccountScreen}
              options={{ title: 'Active Account' }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
        <ToastManager />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { useLogging } from './src/hooks/useLogging';

// export default function App() {
//   const [logging] = useLogging('Application');

//     useEffect(() => {
//         logging.info('Loading application.');
//     }, [logging]);

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your con chim</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
