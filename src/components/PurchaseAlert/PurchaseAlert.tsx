import { useAppDispatch } from '@/app/hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { updateBalanceUser } from '@/features/auth/authSlice'
import { ChapterKey } from '@/services/chapterServices'
import PurchaseServices from '@/services/purchaseServices'
import { alertErrorAxios } from '@/utils/alert'
import { getUserLS, setBalanceUserLS } from '@/utils/authLS'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'toastify-react-native'

type PurchaseAlertProp = {
  price: number
  chapterId: string
}

const PurchaseAlert: React.FunctionComponent<PurchaseAlertProp> = ({
  chapterId,
  price,
}) => {
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const buyChapterMutation = useMutation({
    mutationFn: PurchaseServices.buyChapter,
  })

  const hanldeCancel = () => {
    navigate(-1)
  }

  const handleContinue = async () => {
    setLoad(true)
    try {
      const { data } = await buyChapterMutation.mutateAsync({
        ChapterId: chapterId,
      })
      Toast.success(data.code)

      queryClient.invalidateQueries({
        queryKey: [ChapterKey, 'get', chapterId],
      })

      const user = await getUserLS()
      if (!user) {
        return
      }
      setBalanceUserLS(user.accountBalance - price)
      dispatch(updateBalanceUser(user.accountBalance - price))
    } catch (error) {
      alertErrorAxios(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có muốn mua chương truyện này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn phải chi {price} để mua chương này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onPress={hanldeCancel}>Hủy</AlertDialogCancel>
          <AlertDialogAction onPress={handleContinue} disabled={load}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PurchaseAlert
