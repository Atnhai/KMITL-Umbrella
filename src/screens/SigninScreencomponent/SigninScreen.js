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
} from 'react-native';
import Logo from '../../../assets/images/Google.png';
import {authentication, provider} from '../../../firebase';
import Ionic from 'react-native-vector-icons/Ionicons';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
export default function SigninScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const anonymous = 'person';

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Register with', user.email);
        // alert(user.email);
        navigation.navigate('Main');
      })
      .catch(re => {
        alert('Not Correct Username Password');
        console.log(re);
      });
  };
  return (
    <View style={Stylecomponent.root_signin}>
      <Text></Text>
      <TouchableOpacity
        style={Stylecomponent.buttons_goback}
        onPress={() => navigation.goBack()}>
        <Text style={Stylecomponent.text_black}>{'<'}</Text>
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

      <TextInput
        placeholder=" Enter your password "
        style={Stylecomponent.inputsignin_label}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry></TextInput>

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

      <Text>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}Don't have an account?{' '}
        <Link to={{screen: 'Register'}} style={Stylecomponent.text_blue}>
          Register Now {'\n'}
          {'\n'}
        </Link>
      </Text>
    </View>
  );
}
