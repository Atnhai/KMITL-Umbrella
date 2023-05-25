import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Dialog from 'react-native-dialog';
import correctImage from '../../../assets/images/correct.png'; // Import your correct image here
import warningImage from '../../../assets/images/warning.png';
import React, {Component} from 'react';
import axios from 'axios';
import Logo from '../../../assets/images/Google.png';
import {useState} from 'react';
import {authentication, provider} from '../../../firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {Link} from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
import axios_path from '../../navigation/axios_path';

export default function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogImage, setDialogImage] = useState(warningImage);
  const phone = 'call-outline';

  const emailIsValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSignUp = () => {
    if(username === '' || email === '' || password === '' || confirmPassword === '') {
      setDialogMessage('Username, email, password or confirm password was not entered');
      setDialogVisible(true);
      setDialogImage(warningImage);
    } else if(password.length < 6) {
      setDialogMessage('Password should be at least 6 characters');
      setDialogVisible(true);
      setDialogImage(warningImage);
    } else if(password !== confirmPassword) {
      setDialogMessage('Password and confirm password do not match');
      setDialogVisible(true);
      setDialogImage(warningImage);
    } else if (!emailIsValid(email)) {
      setDialogMessage('Your email format is not correct.');
      setDialogVisible(true);
      setDialogImage(warningImage);
    } else {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(re => {
          console.log(re);
          axios.post(`http://${axios_path}/api/users/`, {
            email: email,
            username: username,
          })
          .then(response => {
            console.log('User created successfully:', response.data);
            setDialogMessage('Your account has been successfully created!');
            setDialogVisible(true);
            setDialogImage(correctImage);
          })
          .catch(error => {
            console.log('Error creating user:', error);
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setDialogMessage('This email has already been registered. Please try another email!');
            setDialogVisible(true);
            setDialogImage(warningImage);
          } else {
            console.log('Error creating user:', error);
          }
        });
    }
  };
  
  

const handleDialogClose = () => {
  setDialogVisible(false);
  if(dialogMessage === 'Your account has been successfully created!') {
    navigation.navigate('Login');
  }
};


  return (
    <View style={Stylecomponent.root_register}>
      <Text style={Stylecomponent.text_black}></Text>
      <TouchableOpacity
        title="<"
        style={Stylecomponent.backButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={Stylecomponent.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text style={Stylecomponent.header_text}>
        {'\n'}Hello! Register to get started
      </Text>
      <Text></Text>
      <TextInput
        placeholder=" Username "
        style={Stylecomponent.inputsignin_label}
        value={username}
        onChangeText={text => setUsername(text)}></TextInput>
      <TextInput
        placeholder=" Email "
        style={Stylecomponent.inputsignin_label}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        placeholder=" Password "
        style={Stylecomponent.inputsignin_label}
        value={password}
        onChangeText={text => setPassword(text)}></TextInput>
      <TextInput
        placeholder=" Confirm password "
        style={Stylecomponent.inputsignin_label}
        onChangeText={text => setConfirmPassword(text)}></TextInput>
      <Text></Text>
      <TouchableOpacity
        style={Stylecomponent.button_login}
        onPress={handleSignUp}>
        <Text style={Stylecomponent.text_white}>Register</Text>
      </TouchableOpacity>
      <Text style={stylepadding.text_padding}></Text>
      <Text>
        Already have an account?
        <Link to={{screen: 'Signin'}} style={Stylecomponent.text_blue}>
          {' '}
          Login Now{'\n'}
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
    marginBottom: 80,
  },
});

