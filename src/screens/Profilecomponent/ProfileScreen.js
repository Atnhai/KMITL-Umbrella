import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {authentication} from '../../../firebase';
import Logo from '../../../assets/images/HistoryNew.png';
import editcards from '../../../assets/images/editcards.png';
import help from '../../../assets/images/HelpNew.png';
import aboutus from '../../../assets/images/AboutUsNew.png';
import user from '../../../assets/images/profileNew.png';
import go from '../../../assets/images/go.png';
import forgetPassword from '../../../assets/images/forgetPass.png';
import setting from '../../../assets/images/setting.png';
import {useNavigation} from '@react-navigation/native';
import {Ionic} from 'react-native-vector-icons/Ionicons';
import HelpScreen from '../Helpcomponent';
import StyleMaincomponent from '../../StyleSheet/StyleMaincomponent';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
export default function ProfileScreen({navigation}) {
  // const rendercheckanonymous = () => {
  //   if (!authentication.currentUser.isAnonymous) {
  //     return (
  //       <View>
  //         <View style={styles.rectangle} />
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View>
  //         <Text>You are signed in anonymously</Text>
  //       </View>
  //     );
  //   }
  // };
  const [username, setUsername] = useState('');
  useEffect(() => {
    const email = authentication.currentUser.email;

    console.log(email);
    axios
      .get('http://10.66.4.168:8000/api/get_username/', {
        params: {
          email: email, // pass in the email parameter correctly
        },
      })
      .then(response => setUsername(response.data.username))
      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <Image source={user} style={styles.logo} />
          <View style={styles.userInfo}>
            <Text style={styles.text}>Username: **********</Text>
            <Text style={styles.text}>
              Email: {authentication.currentUser.email}
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <ButtonWithIcon
            title="History"
            image={Logo}
            onPress={() => navigation.navigate('History')}
          />
          <ButtonWithIcon
            title="Reset Password"
            image={forgetPassword}
            onPress={() => navigation.navigate('Forgetpassword')}
          />
          <ButtonWithIcon
            title="Help"
            image={help}
            onPress={() => navigation.navigate('Help')}
          />
          <ButtonWithIcon
            title="About us"
            image={aboutus}
            onPress={() => navigation.navigate('Aboutus')}
          />
          <TouchableOpacity
            style={styles.button_logout}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function ButtonWithIcon({title, image, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Image source={image} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <Image source={go} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'space-between',
    backgroundColor: '#FAC983',
    //padding: 10,
  },
  rectangle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#E35205',
    borderBottomRightRadius: 80,
  },
  userInfo: {
    marginLeft: 20,
  },
  logo: {
    height: 130,
    width: 130,
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 10,
    padding: 20,
    justifyContent: 'flex-start',
    marginTop: 70,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 12,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 15,
    // Adjust any additional styling for the text
  },
  button_logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E35205',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginTop: 50,
  },
  logoutText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',  
  },
  scrollContainer: {
    flexGrow: 1,
  },
});