import Home from '@/screens/Home'
import NotifyScreen from '@/screens/Notify/Notify'
import PersonalScreen from '@/screens/Personal/Personal'
import SignInScreen from '@/screens/SignIn'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Bell, Heart, LucideHome, UserRound } from 'lucide-react-native'

const TabNavigator = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <LucideHome color={color} size={size} />
          ),
          title: 'Trang chủ',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
          title: 'Truyện theo dõi',
        }}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
          title: 'Trang cá nhân',
        }}
      />
    </Tab.Navigator>
  )
}
export default TabNavigator
