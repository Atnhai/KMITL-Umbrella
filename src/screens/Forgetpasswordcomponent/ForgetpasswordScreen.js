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
  TextInput,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {authentication} from '../../../firebase';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';

export default function ForgetpasswordScreen({navigation}) {
  const [email, setEmail] = useState('');

  const resetPassword = () => {
    if (email != null) {
      sendPasswordResetEmail(authentication, email)
        .then(() => {
          alert('password have sent to your email');
        })
        .catch(error => {
          const errorcode = error.code;
          const errorMessage = error.message;
          // alert(errorMessage);
        });
    }
  };
  return (
    <View style={Stylecomponent.root_signin}>
      <Text style={Stylecomponent.text_padding}></Text>

      <TouchableOpacity
        title="<"
        style={Stylecomponent.buttons_goback}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={Stylecomponent.text_black}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={Stylecomponent.header_text}>{'\n'}Forgot Password?</Text>
      <Text style={Stylecomponent.text_grey}>
        {'\n'}Don't worry it occurs. Please enter the email address linked to
        your account.{'\n'}
      </Text>
      <TextInput
        placeholder=" Enter your email "
        style={Stylecomponent.inputsignin_label}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <Text style={Stylecomponent.text_padding}></Text>
      <TouchableOpacity
        style={Stylecomponent.button_login}
        onPress={resetPassword()}>
        <Text style={Stylecomponent.text_white}>Send Code</Text>
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
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}Remember Password?
        <Link to={{screen: 'Signin'}} style={Stylecomponent.text_blue}>
          {' '}
          Login{'\n'}
          {'\n'}
        </Link>
      </Text>
    </View>
  );
}
