import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import Stylecomponent from '../../StyleSheet/Stylecomponent';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Register with', user.email);
        alert(user.email);
      })
      .catch(re => {
        console.log(re);
      });

    // const navigation =  useNavigation();

    // onLoginPressed = () => {
    // navigation.navigate('Signin');
  };
  return (
    <View style={Stylecomponent.root}>
      <Image source={Logo} style={Stylecomponent.logos_umbrella}></Image>
      <Text>
        {'\n'}
        {'\n'}
      </Text>
      <TouchableOpacity
        title="Login"
        style={Stylecomponent.button_login}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={Stylecomponent.text_white}>Login</Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity
        style={Stylecomponent.button_register}
        onPress={() => navigation.navigate('Register')}>
        <Text style={Stylecomponent.text_black}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
