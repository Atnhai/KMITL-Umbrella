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
  return (
    <View style={styles.views}>
      <Searchbar placeholder="Search" style={styles.search}></Searchbar>
      <Text style={styles.text1}>10 KM </Text>
      <Text style={styles.text2}>10 minutes </Text>
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
    fontsize: 20,
    fontWeight: 'bold',
    padding: 50,
    position: 'absolute',
    top: 70,
    left: 5,
  },
  text2: {
    fontsize: 20,
    fontWeight: 'bold',
    padding: 50,
    position: 'absolute',
    top: 70,
    right: 5,
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
