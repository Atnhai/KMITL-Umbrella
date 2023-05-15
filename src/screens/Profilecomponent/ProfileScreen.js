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
  return (
    <View style={StyleMaincomponent.background_views}>
      <View style={StyleMaincomponent.rectangle} />
      <Image source={user} style={StyleMaincomponent.logo_umbrella}></Image>
      {/* <Image source={setting} style={StyleMaincomponent.setting_icon}></Image> */}
      <Text style={stylepadding.text_padding}></Text>
      <Text style={StyleMaincomponent.texts_profile_white}>
        Username: **********
      </Text>
      <Text style={StyleMaincomponent.texts_profile_white}>
        {'\t'}
        {'\t'}
        {'\t'}Email:{authentication.currentUser.email} {'\n'}
        {'\n'}
      </Text>

      <TouchableOpacity
        style={StyleMaincomponent.buttons_white}
        onPress={() => navigation.navigate('History')}>
        <Text style={StyleMaincomponent.texts_menu}>
          {' '}
          <Image
            source={Logo}
            style={StyleMaincomponent.logo_history}></Image>{' '}
          History{'\t'}
          <View style={stylepadding.text_padding_history}></View>
          <Image
            source={go}
            style={StyleMaincomponent.navigate_icon}></Image>{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={StyleMaincomponent.buttons_white}
        onPress={() =>navigation.navigate('Forgetpassword')}>
        <Text style={StyleMaincomponent.texts_menu}>
          {' '}
          <Image
            source={forgetPassword}
            style={StyleMaincomponent.logo_history}></Image>{' '}
          Reset Password{'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          {'\t'}
          <View style={stylepadding.text_padding_resetpassword}></View>
          <Image
            source={go}
            style={StyleMaincomponent.navigate_icon}></Image>{' '}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={StyleMaincomponent.buttons_white}
        onPress={() => navigation.navigate('Help')}>
        <Text style={StyleMaincomponent.texts_menu}>
          {' '}
          <Image
            source={help}
            style={StyleMaincomponent.logo_help}></Image>{' '}
          Help
          <View style={stylepadding.text_padding_help}></View>
          <Image source={go} style={StyleMaincomponent.navigate_icon}></Image>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={StyleMaincomponent.buttons_white}
        onPress={() => navigation.navigate('Aboutus')}>
        <Text style={StyleMaincomponent.texts_menu}>
          {' '}
          <Image
            source={aboutus}
            style={StyleMaincomponent.logo_aboutus}></Image>{' '}
          About us
          <View style={stylepadding.text_padding_aboutus}></View>
          <Image
            source={go}
            style={StyleMaincomponent.navigate_icon}></Image>{' '}
        </Text>
      </TouchableOpacity>
      {/* <Text style={Stylecomponent.text_padding}></Text> */}
      <TouchableOpacity
        style={Stylecomponent.button_login}
        onPress={() => navigation.navigate('Login')}>
        <Text style={Stylecomponent.text_white}>Log out</Text>
      </TouchableOpacity>
      <Text>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
      </Text>
    </View>
  );
}
const stylepadding = StyleSheet.create({
  text_padding: {
    marginBottom: 90,
    paddingBottom: 40,
  },
  text_padding_resetpassword: {
    paddingLeft: 140,
  },
  text_padding_history: {
    paddingLeft: 200,
  },
  text_padding_help: {
    paddingLeft: 220,
  },
  text_padding_aboutus: {
    paddingLeft: 190,
  },
});
