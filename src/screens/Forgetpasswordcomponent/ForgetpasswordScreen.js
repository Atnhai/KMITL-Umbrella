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
    <View style={styles.root}>
      <Text style={styles.text}></Text>
      <TouchableOpacity
        title="<"
        style={styles.buttons}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.text0}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{'\n'}Forgot Password?</Text>
      <Text style={styles.text1}>
        {'\n'}Don't worry it occurs. Please enter the email address linked to
        your account.{'\n'}
      </Text>
      <TextInput
        placeholder=" Enter your email "
        style={styles.inputlabel}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TouchableOpacity style={styles.button2} onPress={resetPassword()}>
        <Text style={styles.text4}>Send Code</Text>
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
        <Link to={{screen: 'Signin'}} style={styles.text3}>
          {' '}
          Login{'\n'}
          {'\n'}
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    // margin:5,
    backgroundColor: '#FAC983',
    // padding:100
  },
  text0: {
    fontSize: 17,
    // alignSelf: 'flex-start',
    // left: 110,
    textAlign: 'center',
    // color: 'white',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 17,
    color: 'grey',
    paddingLeft: 11,
    paddingRight: 4,
  },
  text: {
    fontSize: 38,
    // textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    paddingRight: 20,
  },
  buttons: {
    position: 'absolute',
    top: 10,
    left: 0,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    width: 30,
    margin: 20,
  },
  button2: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    textColor: 'black',
    backgroundColor: '#E35205',
    width: 340,
    margin: 20,
  },
  text3: {
    // fontSize:13,
    // alignSelf: 'flex-start',
    // left: 110,
    textAlign: 'center',
    color: '#35C2C1',
    fontWeight: 'bold',
  },
  text4: {
    fontSize: 17,
    // alignSelf: 'flex-start',
    // left: 110,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  inputlabel: {
    borderRadius: 5,
    margin: 8,
    padding: 10,
    width: 340,
    height: 50,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
