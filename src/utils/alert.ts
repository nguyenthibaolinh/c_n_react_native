import { isAxiosError } from 'axios'
import { Toast } from 'toastify-react-native'

export const alertErrorAxios = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response) {
      Toast.error(
        'error',
        `${
          error.response.data?.code
            ? error.response.data.code
            : error.response.statusText
        }`
      )
      return
    }
    Toast.error('err', error.message)
    return
  }
  console.log(error)
}
