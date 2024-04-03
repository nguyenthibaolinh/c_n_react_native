import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import IntroScreen from '@/screens/Intro';
import { useLogging } from '@/hooks/useLogging';
import SignUpScreen from '@/screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  const [logging] = useLogging('Application');

  useEffect(() => {
    logging.info('Loading application.');
  }, [logging]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={IntroScreen} options={{ title: 'Intro' }} />
        <Stack.Screen name="SignIn" component={SignUpScreen} options={{ title: 'Đăng nhập' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Đăng ký' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { useLogging } from './src/hooks/useLogging';

// export default function App() {
//   const [logging] = useLogging('Application');

//     useEffect(() => {
//         logging.info('Loading application.');
//     }, [logging]);

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your con chim</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
