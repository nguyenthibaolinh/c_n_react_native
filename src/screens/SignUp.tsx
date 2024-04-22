// import * as React from 'react'
// import { TextInput, TouchableOpacity, View, Text, Image } from 'react-native'
// import { styles } from '../styles/stylesBtn'
// import { Button } from 'react-native-paper'
// import { IStackScreenProps } from '@/library/IntroScreenProps'
// // import { transparent, white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
// import { Picker } from '@react-native-picker/picker'

// import { isAxiosError } from 'axios'
// import { useForm, Controller } from 'react-hook-form'
// import { useMutation } from '@tanstack/react-query'
// import AuthServices from '@/services/authServices'
// import { toast } from 'react-toastify'
// import { ACTIVE_ACCOUNT_KEY } from './ActiveAccountScreen/ActiveAccountScreen'
// import UserGenderEnum from '@/constants/users/UserGenderEnum'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Toast } from 'toastify-react-native'

// interface IFormInput {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   confirmPassword: string
//   selectedGender: string
// }

// const SignUpScreen: React.FunctionComponent<IStackScreenProps> = ({
//   navigation,
// }) => {
//   const { control, handleSubmit } = useForm<IFormInput>()

//   const mutation = useMutation({
//     mutationFn: AuthServices.register,
//   })

//   // 2. Define a submit handler.
//   const onSubmit = async (value: IFormInput) => {
//     try {
//       const { confirmPassword, ...body } = value

//       if (body.password !== confirmPassword) {
//         Toast.error('repass_not_match', '')
//         return
//       }

//       const res = await mutation.mutateAsync({
//         firstName: value.firstName,
//         lastName: value.lastName,
//         email: value.email,
//         password: value.password,
//         gender: value.selectedGender,
//       })
//       const data = res.data

//       Toast.success(data.message)
//       await AsyncStorage.setItem(ACTIVE_ACCOUNT_KEY, value.email)

//       setTimeout(() => {
//         console.log('redirect')

//         navigation.navigate('ActiveAccount')
//       }, 1000)
//     } catch (error) {
//       if (isAxiosError(error)) {
//         Toast.error(`${error.response?.data?.message}`, 'bottom')
//         return
//       }
//       console.log(error)
//     }
//   }

//   // const handleSignUp = () => {
//   //   console.log('Signing up...')
//   // }
//   const handleGoogleSignIn = () => {
//     console.log('Signing in with Google...')
//   }

//   return (
//     <View className="flex-1 items-center bg-white">
//       {/* <Image
//         source={{
//           uri: 'https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-boo-de-thuong_022907414.jpg',
//         }}
//         className="w-20 h-20 m-3"
//       /> */}

//       <TouchableOpacity
//         className="flex-row items-center justify-center bg-white rounded-[10px] border p-2 border-gray-300 mb-5"
//         onPress={handleGoogleSignIn}
//       >
//         <Image
//           source={{
//             uri: 'https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png',
//           }}
//           style={styles.googleIcon}
//         />
//         <Text style={styles.buttonText}>Google</Text>
//       </TouchableOpacity>

//       <View className="flex-row items-center w-[80%]">
//         <View className="flex-1 h-[1px] bg-gray-400 mb-5" />
//         <Text className="mx-4 text-lg font-bold mb-5">Or</Text>
//         <View className="flex-1 h-[1px] bg-gray-400 mb-5" />
//       </View>

//       <Controller
//         control={control}
//         name="firstName"
//         rules={{ required: 'Tên là bắt buộc!' }}
//         render={({
//           field: { onChange, onBlur, value },
//           fieldState: { error },
//         }) => (
//           <>
//             <TextInput
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//               style={styles.input}
//               placeholder="First Name"
//               className="rounded-[20px]"
//             />
//             {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="lastName"
//         rules={{ required: 'Họ là bắt buộc!' }}
//         render={({
//           field: { onChange, onBlur, value },
//           fieldState: { error },
//         }) => (
//           <>
//             <TextInput
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//               style={styles.input}
//               placeholder="Last Name"
//               className="rounded-[20px]"
//             />
//             {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="email"
//         rules={{ required: 'Email là bắt buộc!' }}
//         render={({
//           field: { onChange, onBlur, value },
//           fieldState: { error },
//         }) => (
//           <>
//             <TextInput
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//               style={styles.input}
//               placeholder="Email"
//               className="rounded-[20px]"
//             />
//             {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="password"
//         rules={{ required: 'Password là bắt buộc!' }}
//         render={({
//           field: { onChange, onBlur, value },
//           fieldState: { error },
//         }) => (
//           <>
//             <TextInput
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//               secureTextEntry
//               style={styles.input}
//               placeholder="Password"
//               className="rounded-[20px]"
//             />
//             {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="confirmPassword"
//         rules={{ required: 'Nhập lại password!' }}
//         render={({
//           field: { onChange, onBlur, value },
//           fieldState: { error },
//         }) => (
//           <>
//             <TextInput
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//               secureTextEntry
//               style={styles.input}
//               placeholder="Confirm Password"
//               className="rounded-[20px]"
//             />
//             {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
//           </>
//         )}
//       />

//       <View className="w-[280px] mb-[20px] border border-gray-500 text-gray-400 rounded-[20px] h-[41px] flex flex-row items-center justify-between">
//         <Controller
//           control={control}
//           name="selectedGender"
//           render={({ field: { onChange, onBlur, value } }) => (
//             <>
//               <Picker
//                 onBlur={onBlur}
//                 selectedValue={value}
//                 onValueChange={(itemValue) => onChange(itemValue)}
//                 style={{
//                   width: '100%',
//                 }}
//               >
//                 {Object.keys(UserGenderEnum.allName()).map((key) => (
//                   <Picker.Item
//                     key={key}
//                     label={UserGenderEnum.allName()[Number(key)]}
//                     value={key}
//                   />
//                 ))}
//               </Picker>
//             </>
//           )}
//         />
//       </View>

//       <Button
//         className="bg-[#4299E1]"
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//       >
//         ĐĂNG KÝ
//       </Button>
//       <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//         <Text className="mt-3 w-80%">Bạn đã có tài khoản? Đăng nhập</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default SignUpScreen
