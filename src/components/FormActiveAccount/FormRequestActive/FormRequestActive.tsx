import { ACTIVE_ACCOUNT_KEY } from '@/screens/ActiveAccountScreen/ActiveAccountScreen'
import RequestCodeEnum from '@/constants/users/RequestCodeEnum'
import FormRequestCode from '@/components/FormRequestCode'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AsyncStorage from '@react-native-async-storage/async-storage'

type FormRequestActiveProp = {
  setEmail: (value: string) => void
}

const FormRequestActive = ({ setEmail }: FormRequestActiveProp) => {
  const handleSuccess = async (values: any) => {
    setEmail(values.email)
    try {
      await AsyncStorage.setItem(ACTIVE_ACCOUNT_KEY, values.email)
    } catch (error) {
      console.error('Error storing email:', error)
    }
  }

  return (
    <Card className="w-[100%] max-w-full mx-auto">
      <CardHeader>
        <CardTitle className="border-b pb-5">Kích hoạt tài khoản</CardTitle>
        <CardDescription>Please input email</CardDescription>
      </CardHeader>
      <CardContent>
        <FormRequestCode
          typeCode={RequestCodeEnum.ACTIVE}
          handleSuccess={handleSuccess}
        />
      </CardContent>
    </Card>
  )
}

export default FormRequestActive
