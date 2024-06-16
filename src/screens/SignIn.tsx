import * as React from 'react'
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native'
import { styles } from '../styles/stylesBtn'
import { Button } from 'react-native-paper'
import { IStackScreenProps } from '@/library/StackScreenProps'
import { useMutation } from '@tanstack/react-query'
import AuthServices from '@/services/authServices'
import { AuthResponse } from '@/types/authType'
import { setAuthLS } from '@/utils/authLS'
import { Toast } from 'toastify-react-native'
import { isAxiosError } from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { selectAuth, updateAuth } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

interface IFormInput {
  email: string
  password: string
}

const SignInScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation } = props
  const { control, handleSubmit } = useForm<IFormInput>()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)

  const mutation = useMutation({
    mutationFn: AuthServices.login,
  })

  React.useEffect(() => {
    if (auth.isInitialized && auth.isAuthenticated) {
      navigation.navigate('TabNavigator')
    }
  }, [auth])
  const onSubmit = async (data: IFormInput) => {
    console.log('đăng nhập')

    try {
      const res = await mutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      const responseData: AuthResponse = res.data
      const { accessToken, ...authRes } = responseData
      console.log(responseData)

      dispatch(
        updateAuth({
          isAuthenticated: true,
          user: authRes,
        })
      )

      setAuthLS(responseData)
      Toast.success('Đăng nhập thành công')
    } catch (error) {
      console.error('error', error)

      if (isAxiosError(error)) {
        Toast.error(
          `${
            error.response?.data?.code
              ? error.response.data.message
              : error.response?.statusText
          }`,
          'bottom'
        )
        return
      }
      console.log(error)
    }
  }

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google...')
    // Xử lý đăng nhập bằng Google ở đây
  }

  return (
    <View className="flex h-[100%] bg-white">
      <ScrollView>
        <View className="flex-1 items-center mt-auto mb-auto">
          <Image
            source={require('../image/logozz.png')}
            className="w-[70%] h-[100px] mt-[70px] mb-[60px]"
          />
          {/* <TouchableOpacity onPress={handleGoogleSignIn}>
            <View className="flex-row justify-stretch mb-3 w-[80%] ">
              <Image
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png',
                }}
                className="w-[20px] h-[20px] mr-1"
              />
              <Text className="text-[#333] text-[16px]">Google</Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center w-[80%]">
            <View className="flex-1 h-[1px] bg-gray-400 mb-5" />
            <Text className="mx-4 text-lg font-bold mb-5">Or</Text>
            <View className="flex-1 h-[1px] bg-gray-400 mb-5" />
          </View> */}

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email là bắt buộc!' }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder="Email"
                  className="mb-4 rounded-[20px]"
                />
                {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password là bắt buộc!' }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  style={styles.input}
                  placeholder="Password"
                  className="mb-1 rounded-[20px]"
                />
                {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
              </>
            )}
          />
          {/* <View className="w-[80%]">
            <TouchableOpacity onPress={() => console.log('Forgot Password?')}>
              <Text className="text-right">Forgot Password?</Text>
            </TouchableOpacity>
          </View> */}
          <Button
            className="mt-5"
            style={{ backgroundColor: '#FA8035' }}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            ĐĂNG NhẬP
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
export default SignInScreen
