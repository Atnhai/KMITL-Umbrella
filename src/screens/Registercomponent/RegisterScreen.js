import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {Component} from 'react';
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
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log(user.email);
    //   })
    //   .catch(error => alert(error.message));
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}></Text>
      <TouchableOpacity
        title="<"
        style={styles.buttons}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text0}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{'\n'}Hello! Register to get started</Text>
      <TextInput
        placeholder=" Username "
        style={styles.inputlabel}
        value={username}
        onChangeText={text => setUsername(text)}></TextInput>
      <TextInput
        placeholder=" Email "
        style={styles.inputlabel}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        placeholder=" Password "
        style={styles.inputlabel}
        value={password}
        onChangeText={text => setPassword(text)}></TextInput>
      <TextInput
        placeholder=" Confirm password "
        style={styles.inputlabel}></TextInput>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          handleSignUp();
          navigation.navigate('Login');
        }}>
        <Text style={styles.text4}>Register</Text>
      </TouchableOpacity>
      <Text>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}Already have an account?
        <Link to={{screen: 'Signin'}} style={styles.text3}>
          {' '}
          Login Now{'\n'}
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
  text0: {
    fontSize: 17,
    // alignSelf: 'flex-start',
    // left: 110,
    textAlign: 'center',
    // color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 38,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 30,
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
    margin: 10,
    padding: 10,
    width: 320,
    height: 50,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button2: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    textColor: 'black',
    backgroundColor: '#E35205',
    width: 320,
    margin: 20,
  },
  button3: {
    borderRadius: 12,
    position: 'relative',
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
    width: 60,
    // height:50,
    // margin:20,
  },
  logos: {
    resizeMode: 'cover',
    height: 35,
    width: 35,
    fontSize: 30,
    paddingLeft: 2,
  },
});
