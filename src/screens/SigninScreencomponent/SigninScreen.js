import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
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
import {authentication} from '../../../firebase';
// import Icon from 'react-native-vector-icons/FontAwesome'

export default function SigninScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('Main');
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

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
    <View style={styles.root}>
      <Text style={styles.text}></Text>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text0}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        {'\n'}
        {'\n'} Welcome back! Glad to see you, Again!{'\n'}
      </Text>

      <TextInput
        placeholder=" Enter your email "
        style={styles.inputlabel}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>

      <TextInput
        placeholder=" Enter your password "
        style={styles.inputlabel}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry></TextInput>

      <Text style={styles.text2}>Forgot Password? {'\n'}</Text>

      <TouchableOpacity
        style={styles.button2}
        onPress={
          () =>
            // console.log({password})
            handleLogin()
          // navigation.navigate('Register')
        }>
        <Text style={styles.text4}>Login</Text>
      </TouchableOpacity>

      <Text>────────── or Login with ────────── {'\n'}</Text>

      <TouchableOpacity style={styles.button3}>
        <Image source={Logo} style={styles.logos}></Image>
      </TouchableOpacity>
      <Text>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}Don't have an account?{' '}
        <Text style={styles.text3}>
          Register Now {'\n'}
          {'\n'}
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    // flex: 1,
    // justifyContent: 'flex-end'
    // padding:100
  },
  buttons: {
    // position: 'relative',
    // height: 50,
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
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  text2: {
    // fontSize:13,
    // alignSelf: 'flex-start',
    fontWeight: 'bold',
    left: 110,
    textAlign: 'right',
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
    position: 'relative',
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
    width: 200,
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
    alignItems: 'center',
  },
});
