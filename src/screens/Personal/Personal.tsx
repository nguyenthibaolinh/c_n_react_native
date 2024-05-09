import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'

const PersonalScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging('Personal Screen')
  const { navigation } = props

  useEffect(() => {
    logging.info({ navigation })
  }, [logging])

  return (
    <View style={styles.container}>
      <Text>Personal Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Categories"
        onPress={() => navigation.navigate('Categories')}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PersonalScreen
