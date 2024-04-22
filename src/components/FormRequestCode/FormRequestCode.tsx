import AuthServices from '@/services/authServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
// import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import RequestCodeEnum from '@/constants/users/RequestCodeEnum'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const formSchema = z.object({
  email: z.string().email(),
})

type FormRequestCodeProp = {
  typeCode: RequestCodeEnum
  handleSuccess: (...args: any) => void
}

const FormRequestCode = ({ typeCode, handleSuccess }: FormRequestCodeProp) => {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: '',
  //   },
  // })
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const mutation = useMutation({
    mutationFn: AuthServices.requestCode,
  })

  // const { t } = useTranslation(['authentication', 'response_code'])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = { ...values, type: typeCode }
      const res = await mutation.mutateAsync(body)
      const data = res.data

      toast.success(`response_code:${data.code}`)
      handleSuccess(values)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(`response_code:${error.response?.data.code}`)
        return
      }
      console.log(error)
    }
  }

  return (
    <View>
      {/* <View><Text>Email</Text></View> */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <View>
            <TextInput
              placeholder="Email"
              className="h-11 w-100% border px-4 rounded-[15px] mb-4"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          </View>
        )}
      />
      <View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="h-10 w-[80px] border-[#F97316] px-4 rounded-[12px] py-2 bg-[#F97316] text-white absolute right-0">
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FormRequestCode
