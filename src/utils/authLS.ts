import { AuthResponse, AuthType } from '@/types/authType'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_LS_KEY = {
  accessToken: 'at',
  user: 'usr',
}

export const getTokenLS = async () => {
  // try {
  return (await AsyncStorage.getItem(AUTH_LS_KEY.accessToken)) || ''
  // } catch (e) {
  //   console.log(e)
  //   return ''
  // }
}

export const setTokenLS = async (accessToken: string) => {
  // try {
  await AsyncStorage.setItem(AUTH_LS_KEY.accessToken, accessToken)
  // } catch (e) {
  //   console.log(e)
  // }
}

export const getUserLS = async (): Promise<AuthType | null> => {
  // try {
  const user = await AsyncStorage.getItem(AUTH_LS_KEY.user)
  return user ? JSON.parse(user) : null
  // } catch (error) {
  //   console.log(error)
  //   return null
  // }
}

export const setAuthLS = async (authResponse: AuthResponse) => {
  // try {
  const { accessToken, ...user } = authResponse
  await Promise.all([
    AsyncStorage.setItem(AUTH_LS_KEY.accessToken, accessToken),
    AsyncStorage.setItem(AUTH_LS_KEY.user, JSON.stringify(user)),
  ])
  // } catch (error) {
  //   console.log(error)
  // }
}

export const setBalanceUserLS = async (balance: number) => {
  const user = await getUserLS()
  if (!user) {
    return
  }
  user.accountBalance = balance
  await AsyncStorage.setItem(AUTH_LS_KEY.user, JSON.stringify(user))
}

export const resetAuthLS = async () => {
  // try {
  await Promise.all([
    AsyncStorage.removeItem(AUTH_LS_KEY.accessToken),
    AsyncStorage.removeItem(AUTH_LS_KEY.user),
  ])
  // } catch (error) {
  //   console.log(error)
  // }
}
