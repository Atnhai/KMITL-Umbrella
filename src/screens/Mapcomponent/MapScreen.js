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
import Logo from '../../../assets/images/search.png';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
export default function MapScreen({navigation}) {
  // const navigation =  useNavigation();

  // onLoginPressed = () => {
  // navigation.navigate('Signin');
  //   };
  return (
    <View style={styles.views}>
      <Searchbar placeholder="Search" style={styles.search}></Searchbar>
      <Text style={styles.text1}>10 KM </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  views: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
  },
  texts: {
    fontsize: 100,
    fontWeight: 'bold',
  },
  text1: {
    fontsize: 10,
    fontWeight: 'bold',
    padding: 50,
    position: 'absolute',
    top: 70,
    left: 10,
  },
  search: {
    //right: 100,
    alignItems: 'center',
    width: 350,
    position: 'absolute',
    top: 40,
    //justifycontent: 'flex-end',
  },
});
