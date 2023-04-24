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
  SafeAreaView,
} from 'react-native';
import {authentication} from '../../../firebase';
import Logo from '../../../assets/images/history.png';
import editcards from '../../../assets/images/editcards.png';
import help from '../../../assets/images/help.png';
import aboutus from '../../../assets/images/aboutus.png';
import user from '../../../assets/images/profile.png';
import go from '../../../assets/images/go.png';
import setting from '../../../assets/images/setting.png';
import {useNavigation} from '@react-navigation/native';
import {Ionic} from 'react-native-vector-icons/Ionicons';
import HelpScreen from '../Helpcomponent';
import StyleMaincomponent from '../../StyleSheet/StyleMaincomponent';
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
  return (
    <View style={StyleMaincomponent.background_views}>
      {/* {rendercheckanonymous()} */}
      <View style={styles.rectangle} />
      <Image source={user} style={styles.user}></Image>
      <Image source={setting} style={styles.setting}></Image>
      <Text style={styles.texts1}>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        username:**********
      </Text>
      <Text style={styles.texts1}>
        Email:{authentication.currentUser.email} {'\n'}
        {'\n'}
      </Text>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.texts2}>
          {' '}
          <Image source={Logo} style={styles.logos1}></Image> History {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          <Text style={styles.space}></Text>
          <Image source={go} style={styles.go}></Image>{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Help')}>
        <Text style={styles.texts2}>
          {' '}
          <Image source={help} style={styles.help}></Image> Help {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          <Image source={go} style={styles.go}></Image>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Aboutus')}>
        <Text style={styles.texts2}>
          {' '}
          <Image source={aboutus} style={styles.aboutus}></Image> About us{' '}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          <Image source={go} style={styles.go}></Image>{' '}
        </Text>
      </TouchableOpacity>
      <Text style={styles.texts}></Text>
      <TouchableOpacity
        style={styles.button_logout}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text4}>Log out</Text>
      </TouchableOpacity>
      <Text style={styles.texts}>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  views: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
    flex: 1,
  },
  texts: {
    alignContent: 'center',
    right: 80,
  },
  texts2: {
    paddingTop: 10,
    fontSize: 15,
    paddingLeft: 30,
  },
  space: {
    marginVertical: 100,
  },
  buttons: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    width: 350,
    height: 50,
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  button_logout: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#E35205',
    width: 300,
    //padding: 100,
    // margin:20,
  },
  logos1: {
    height: 20,
    width: 20,
    alignItems: 'center',
    resizeMode: 'stretch',
    marginRight: 40,
  },
  editcards: {
    height: 20,
    width: 25,
    alignItems: 'center',
    justifycontent: 'space-between',
  },
  help: {
    resizeMode: 'cover',
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  aboutus: {
    resizeMode: 'cover',
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  user: {
    position: 'absolute',
    top: 30,
    left: 20,
    resizeMode: 'cover',
    height: 130,
    width: 130,
    alignItems: 'center',
  },
  go: {
    //right: 100,
    height: 10,
    width: 10,
    alignItems: 'center',
    justifycontent: 'flex-end',
    position: 'absolute',
    right: 4,
  },
  setting: {
    position: 'absolute',
    top: 40,
    right: 30,
    height: 40,
    width: 40,
    alignItems: 'center',
  },
  text4: {
    fontSize: 17,
    // alignSelf: 'flex-start',
    // left: 110,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  texts1: {
    alignContent: 'center',
    paddingBottom: 30,
    right: 80,
    //fontSize: 15,
    // alignSelf: 'flex-start',
    // left: 110,
    //textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  rectangle: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 80,
    width: 410,
    height: 250,
    marginBottom: 20,
    backgroundColor: '#E35205',
  },
});
