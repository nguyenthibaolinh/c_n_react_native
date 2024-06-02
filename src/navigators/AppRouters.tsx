import { User, View } from 'lucide-react-native'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { initAuth, selectAuth, updateAuth } from '@/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AuthResponse } from '@/types/authType'
import { getUserLS } from '@/utils/authLS'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

const AppRouters = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)
  useEffect(() => {
    checkSignIn()
  }, [])

  const checkSignIn = async () => {
    try {
      const authLS = await getUserLS()
      if (authLS) {
        dispatch(
          updateAuth({
            isAuthenticated: true,
            user: authLS,
          })
        )
      } else {
        dispatch(initAuth())
      }
    } catch (error) {
      console.error('Failed to retrieve authentication data', error)
    }
  }
  return (
    <>
      {auth.isInitialized && auth.isAuthenticated && <MainNavigator />}
      {auth.isInitialized && !auth.isAuthenticated && <AuthNavigator />}
    </>
  )
}
export default AppRouters
