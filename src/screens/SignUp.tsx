import * as React from 'react';
import { TextInput, StyleSheet, View, Text, Image } from 'react-native';
import { styles } from '../styles/stylesBtn';
import { Button } from 'react-native-paper';
import { IStackScreenProps } from '@/library/IntroScreenProps';
import { transparent, white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen: React.FunctionComponent<IStackScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState('');

  const handleSignUp = () => {
    console.log('Signing up...');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={{
          uri: 'data:image/jpeg;base64,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'
        }}
        className="w-20 h-20 mb-5"
      />
      <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} style={styles.input} placeholder="First Name" className="rounded-[20px]" />
      <TextInput value={lastName} onChangeText={(text) => setLastName(text)} style={styles.input} placeholder="Last Name" className="rounded-[20px]" />
      <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="Email" className="rounded-[20px]" />
      <TextInput secureTextEntry value={password} onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="Password" className="rounded-[20px]" />
      <TextInput secureTextEntry value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} style={styles.input} placeholder="Confirm Password" className="rounded-[20px]" />

      <View
        // style={{ borderColor: 'gray' }}
        className="w-[280px] mb-[15px] border border-gray-400 text-gray-400 rounded-[20px] h-[40px] flex flex-row items-center justify-between"
      >
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
          style={{
            width: '100%'
          }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>

      <Button style={styles.customButton} mode="contained" onPress={() => navigation.navigate('SignUp')}>
        ĐĂNG KÝ
      </Button>
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 30,
    // width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    // justifyContent: 'center',
    paddingHorizontal: 10
  }
});
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

export default SignUpScreen;
