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
  ScrollView,
} from 'react-native';
import Dialog from "react-native-dialog";
import correctImage from '../../../assets/images/correct.png'; // Import your correct image here
import warningImage from '../../../assets/images/warning.png'; 
import {Link, useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {authentication} from '../../../firebase';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';

export default function ForgetpasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogImage, setDialogImage] = useState(warningImage);

  const emailIsValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const resetPassword = () => {
    if (email === '') {
      setDialogMessage('Email was not entered.');
      setDialogVisible(true);
      setDialogImage(warningImage);  // Add this line
    } else if (!emailIsValid(email)) {
      setDialogMessage('Your email format is not correct.');
      setDialogVisible(true);
      setDialogImage(warningImage);  // Add this line
    } else {
      sendPasswordResetEmail(authentication, email)
        .then(() => {
          setDialogMessage('Password reset email has been sent to your email.');
          setDialogVisible(true);
          setDialogImage(correctImage);  // Add this line
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setDialogMessage('This email has not been registered.');
            setDialogVisible(true);
            setDialogImage(warningImage);  // Add this line
          }
        });
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  return (
    <View style={Stylecomponent.root_signin}>
      <Text style={Stylecomponent.text_padding}></Text>

      <TouchableOpacity
        title="<"
        style={Stylecomponent.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={Stylecomponent.backButtonText}>Back</Text>
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
        onChangeText={setEmail}></TextInput>
      <Text style={Stylecomponent.text_padding}></Text>
      <TouchableOpacity
        style={Stylecomponent.button_login}
        onPress={resetPassword}>
        <Text style={Stylecomponent.text_white}>Send Code</Text>
      </TouchableOpacity>
      <Text style={stylepadding.text_padding}></Text>
      <Text>
        Remember Password?
        <Link to={{screen: 'Signin'}} style={Stylecomponent.text_blue}>
          {' '}
          Login{'\n'}
          {'\n'}
        </Link>
      </Text>
      <Dialog.Container visible={dialogVisible} contentStyle={Stylecomponent.dialogContainer}>
        <View style={Stylecomponent.dialogContent}>
          <Text style={Stylecomponent.dialogTitle}>Warning</Text>
          <Image source={dialogImage} style={Stylecomponent.imageStyle} />
          <Text style={Stylecomponent.dialogMessage}>{dialogMessage}</Text>
          <TouchableOpacity style={Stylecomponent.buttonStyle} onPress={handleDialogClose}>
            <Text style={Stylecomponent.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    </View>
  );
}

const stylepadding = StyleSheet.create({
  text_padding: {
    marginBottom: 250,
  },
});
