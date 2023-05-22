import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
export default function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const phone = 'call-outline';
  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
      })
      .catch(re => {
        console.log(re);
      });
      axios.post('http://10.66.4.168:8000/api/users/', {
      email: email,
      username: username,
      })
    .then(response => {
    console.log('User created successfully:', response.data);
    })
    .catch(error => {
      console.log('Error creating user:', error);
    });
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log(user.email);
    //   })
    //   .catch(error => alert(error.message));
  };


  return (
    <ScrollView style={{flex: 1}}>
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
        style={Stylecomponent.inputsignin_label}></TextInput>
      <Text></Text>
      <TouchableOpacity
        style={Stylecomponent.button_login}
        onPress={() => {
          handleSignUp();
          navigation.navigate('Login');
        }}>
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
    </View>
    </ScrollView>
  );
}

const stylepadding = StyleSheet.create({
  text_padding: {
    marginBottom: 80,
  },
});

