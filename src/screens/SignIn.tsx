import * as React from 'react'
import { TextInput, TouchableOpacity, View, Text, Image } from 'react-native'
import { styles } from '../styles/stylesBtn'
import { Button } from 'react-native-paper'
import { IStackScreenProps } from '@/library/StackScreenProps'
import {
  transparent,
  white,
} from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
import { Picker } from '@react-native-picker/picker'
import { useMutation } from '@tanstack/react-query'
import AuthServices from '@/services/authServices'
import { AuthResponse } from '@/types/authType'
import { setAuthLS } from '@/utils/authLS'
import { Toast } from 'toastify-react-native'
import { isAxiosError } from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useLogging } from '@/hooks/useLogging'

interface IFormInput {
  email: string
  password: string
}

const SignInScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging('SignIn Screen')
  const { navigation } = props
  const { control, handleSubmit } = useForm<IFormInput>()

  React.useEffect(() => {
    logging.info({ navigation })
  }, [logging])

  const mutation = useMutation({
    mutationFn: AuthServices.login,
  })

  const onSubmit = async (data: IFormInput) => {
    try {
      const res = await mutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      const responseData: AuthResponse = res.data
      const { accessToken, ...auth } = responseData

      setAuthLS(responseData)
      Toast.success('đăng nhập thành công')

      setTimeout(() => {
        console.log('redirect')
        navigation.navigate('HomeTab')
      }, 1000)
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
    <View className="flex-1 items-center bg-white mt-auto mb-auto">
      {/* <Image
        source={{
          uri: 'https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-boo-de-thuong_022907414.jpg',
        }}
        className="w-20 h-20 m-10"
      /> */}

      <TouchableOpacity
        className="flex-row justify-between mb-4 top-3 w-[80%]"
        onPress={handleGoogleSignIn}
      >
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png',
          }}
          className="w-[20px] h-[20px]"
          // style={styles.googleIcon}
        />
        <Text className="text-[#333] text-[16px]">Google</Text>
      </TouchableOpacity>

      <View className="flex-row items-center w-[80%]">
        <View className="flex-1 h-[1px] bg-gray-400 mb-5" />
        <Text className="mx-4 text-lg font-bold mb-5">Or</Text>
        <View className="flex-1 h-[1px] bg-gray-400 mb-5" />
      </View>

      {/* <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Email"
        className="rounded-[20px]"
      />
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Password"
        className="rounded-[20px]"
      /> */}

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
      <View className="mb-4 w-[80%]">
        <TouchableOpacity onPress={() => console.log('Forgot Password?')}>
          <Text className="text-right">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        className="bg-[#4299E1]"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        ĐĂNG NhẬP
      </Button>

      {/* <View className="flex-row justify-between mb-4 top-3 w-[80%]">\
        <TouchableOpacity onPress={() => console.log('Forgot Password?')}>
          <Text className="w-[180px]">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ActiveAccount')}>
          <Text className="w-[180px]">Active Account?</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center w-[80%] h-[1px] bg-gray-400 mb-5" />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button mode="contained" onPress={() => navigation.navigate('SignUp')}>
          Create Account
        </Button>
      </View> */}
    </View>
  )
}

export default SignInScreen
