import SignInScreen from '@/screens/SignIn'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}
export default AuthNavigator
