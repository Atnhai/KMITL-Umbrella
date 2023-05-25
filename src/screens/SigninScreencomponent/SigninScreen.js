import {Link} from '@react-navigation/native';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
} from 'firebase/auth';
import React, {Component} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Dialog from 'react-native-dialog';
import Ionic from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/Google.png';
import {authentication, provider} from '../../../firebase';
// import Ionic from 'react-native-vector-icons/Ionicons';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
export default function SigninScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const anonymous = 'person';

  const emailIsValid = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    if (email === '' || password === '') {
      setDialogMessage('Username or password was not entered.');
      setDialogVisible(true);
    } else if (!emailIsValid(email)) {
      setDialogMessage('Your email format is not correct.');
      setDialogVisible(true);
    } else {
      signInWithEmailAndPassword(authentication, email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Register with', user.email);
          // alert(user.email);
          navigation.navigate('Main');
        })
        .catch(re => {
          setDialogMessage('Username or password was not corrected.');
          setDialogVisible(true);
          console.log(re);
        });
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  return (
    <View style={Stylecomponent.root_signin}>
      <Text></Text>
      <TouchableOpacity
        style={Stylecomponent.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={Stylecomponent.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={Stylecomponent.header_text}>
        {'\n'}
        {'\n'}Welcome back! Glad to see you, Again!{'\n'}
      </Text>

      <TextInput
        placeholder=" Enter your email "
        style={Stylecomponent.inputsignin_label}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>

      <View style={Stylecomponent.inputContainer}>
        <TextInput
          placeholder=" Enter your password "
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={hidePassword}
          style={Stylecomponent.input}
          underlineColorAndroid='transparent' />
        <Ionic
          name={hidePassword ? 'eye-off' : 'eye'}
          size={20}
          color="grey"
          style={Stylecomponent.icon}
          onPress={() => setHidePassword(!hidePassword)} />
      </View>

      <Link
        to={{screen: 'Forgetpassword'}}
        style={Stylecomponent.text_forgotpassword}>
        Forgot Password? {'\n'}
      </Link>

      <TouchableOpacity
        style={Stylecomponent.button_login}
        onPress={
          () =>
            // console.log({password})
            handleLogin()
          // navigation.navigate('Register')
        }>
        <Text style={Stylecomponent.text_white}>Login</Text>
      </TouchableOpacity>
      <Text style={stylepadding.text_padding}></Text>
      <Text>
        Don't have an account?{' '}
        <Link to={{screen: 'Register'}} style={Stylecomponent.text_blue}>
          Register Now {'\n'}
          {'\n'}
        </Link>
      </Text>
      <Dialog.Container
        visible={dialogVisible}
        contentStyle={Stylecomponent.dialogContainer}>
        <View style={Stylecomponent.dialogContent}>
          <Text style={Stylecomponent.dialogTitle}>Warning</Text>
          <Image
            source={require('../../../assets/images/warning.png')}
            style={Stylecomponent.imageStyle}
          />
          <Text style={Stylecomponent.dialogMessage}>{dialogMessage}</Text>
          <TouchableOpacity
            style={Stylecomponent.buttonStyle}
            onPress={handleDialogClose}>
            <Text style={Stylecomponent.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    </View>
  );
}
const stylepadding = StyleSheet.create({
  text_padding: {
    marginBottom: 160,
  },
});
