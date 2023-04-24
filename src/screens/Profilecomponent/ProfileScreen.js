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
import user from '../../../assets/images/profileNew.png';
import go from '../../../assets/images/go.png';
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
      <Image source={setting} style={StyleMaincomponent.setting_icon}></Image>
      <Text style={StyleMaincomponent.texts_profile_white}>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
        username:**********
      </Text>
      <Text style={StyleMaincomponent.texts_profile_white}>
        Email:{authentication.currentUser.email} {'\n'}
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
          History {'\t'}
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
            style={StyleMaincomponent.logo_history}></Image>{' '}
          Help {'\t'}
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
            style={StyleMaincomponent.logo_history}></Image>{' '}
          About us {'\t'}
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
      </Text>
    </View>
  );
}
