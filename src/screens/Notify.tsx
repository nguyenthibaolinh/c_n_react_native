import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useLogging } from '../hooks/useLogging'
import { IStackScreenProps } from '../library/StackScreenProps'

const NotifyScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging('Notify Screen')
  const { navigation } = props

  useEffect(() => {
    logging.info({ navigation })
  }, [logging])

  return (
    <View style={styles.container}>
      <Text>Notify Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Personal"
        onPress={() => navigation.navigate('Personal')}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default NotifyScreen
