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
import Logo from '../../../assets/images/Logo_1.png';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
import StyleMaincomponent from '../../StyleSheet/StyleMaincomponent';
import aboutus from '../../../assets/images/aboutus3.png'; 

export default function AboutusScreen({navigation}) {
  return (
    <View style={StyleMaincomponent.background_views}>
      <View style={StyleMaincomponent.rectangle_small} />
      <TouchableOpacity
        style={StyleMaincomponent.button_goback}
        onPress={() => navigation.goBack()}>
        <Text style={StyleMaincomponent.text_navigation}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={StyleMaincomponent.text_back}>Back</Text>
      <Image source={aboutus} style={StyleMaincomponent.aboutus} />
    </View>
  );
}
