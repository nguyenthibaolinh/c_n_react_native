import AsyncStorage from '@react-native-async-storage/async-storage'
import FormHandleActive from '@/components/FormActiveAccount/FormHandleActive'
import FormRequestActive from '@/components/FormActiveAccount/FormRequestActive'
import { useState, useEffect } from 'react'
import { IStackScreenProps } from '@/library/StackScreenProps'

export const ACTIVE_ACCOUNT_KEY = 'ACTIVE_ACCOUNT_KEY_EMAIL'

const ActiveAccountScreen: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('')

  // Load email from AsyncStorage when component mounts
  useEffect(() => {
    const loadEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem(ACTIVE_ACCOUNT_KEY)
        if (storedEmail) {
          setEmail(storedEmail)
        }
      } catch (error) {
        console.error('Error loading email from AsyncStorage:', error)
      }
    }
    loadEmail()
  }, [])

  return (
    <>
      {!email && <FormRequestActive setEmail={setEmail} />}
      {email && (
        <FormHandleActive
          navigation={navigation}
          email={email}
          setEmail={setEmail}
        />
      )}
    </>
  )
}

export default ActiveAccountScreen
