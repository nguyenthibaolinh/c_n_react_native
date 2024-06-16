import Home from '@/screens/Home'
import NotifyScreen from '@/screens/Notify/Notify'
import PersonalScreen from '@/screens/Personal/Personal'
import SignInScreen from '@/screens/SignIn'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Bell, LucideHome, UserRound } from 'lucide-react-native'

const TabNavigator = () => {
  const Tab = createBottomTabNavigator()

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
        component={PersonalScreen}
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
export default TabNavigator
