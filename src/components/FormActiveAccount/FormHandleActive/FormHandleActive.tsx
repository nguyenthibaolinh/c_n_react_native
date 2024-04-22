import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormMessage,
// } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ACTIVE_ACCOUNT_KEY } from '@/screens/ActiveAccountScreen/ActiveAccountScreen'
import AuthServices from '@/services/authServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const formSchema = z
  .object({
    code: z.string(),
  })
  .required()

type FormHandleActiveProp = {
  navigation: any
  email: string
  setEmail: (value: string) => void
}

const FormHandleActive = ({
  email,
  setEmail,
  navigation,
}: FormHandleActiveProp) => {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  })

  const mutation = useMutation({
    mutationFn: AuthServices.handleActive,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = { ...values, email: email }
      console.log(body)
      const res = await mutation.mutateAsync(body)
      const data = res.data

      toast.success(`Response code: ${data.code}`)
      await AsyncStorage.removeItem(ACTIVE_ACCOUNT_KEY)

      setTimeout(() => {
        console.log('redirect')

        navigation.navigate('SignIn')
      }, 1000)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(`Response code: ${error.response?.data}`)
        return
      }
      console.log(error)
    }
  }

  const onRollback = async () => {
    await AsyncStorage.removeItem(ACTIVE_ACCOUNT_KEY)
    setEmail('')
  }

  const onCancel = () => {
    AsyncStorage.removeItem(ACTIVE_ACCOUNT_KEY)
    navigation.navigate('SignIn')
  }

  return (
    <Card className="w-[450px] max-w-full mx-auto">
      <CardHeader>
        <CardTitle className="border-b pb-5">Input Code</CardTitle>
        <CardDescription>Please check the code</CardDescription>
      </CardHeader>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormControl className="w-1/2">
                    <Input placeholder="Input code" {...field} />
                  </FormControl>
                  <FormDescription className="w-1/2">
                    Has sent code to: {email}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="link"
              onClick={onRollback}
              className="px-0"
            >
              Don't have the code?
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </CardFooter>
        </form>
      </Form> */}
      <CardContent>
        <View>
          <Controller
            control={control}
            name="code"
            rules={{ required: 'Code is required' }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder="Input code"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
              </>
            )}
          />
        </View>
        <View>
          <Text>Has sent code to: {email}</Text>
        </View>
      </CardContent>
      <CardFooter className="flex justify-between">
        <View>
          <TouchableOpacity onPress={onRollback}>
            <Text>Don't have the code?</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button onPress={handleSubmit(onSubmit)}>Next</Button>
          <Button onPress={onCancel}>Cancel</Button>
        </View>
      </CardFooter>
    </Card>
  )
}

export default FormHandleActive
