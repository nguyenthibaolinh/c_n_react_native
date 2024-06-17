import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import StoryListBox from '@/components/FavoritePage/StoryListBox'

const NotifyScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging('Notify Screen')
  const { navigation } = props

  useEffect(() => {
    logging.info({ navigation })
  }, [logging])

  return (
    <View className="flex-1 bg-white">
      <StoryListBox navigation={navigation} />
    </View>
  )
}

export default NotifyScreen
