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

export default function AboutusScreen({navigation}) {
  return (
    <View style={styles.views}>
      <View style={styles.rectangle} />
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.goBack()}>
        <Text style={styles.text0}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.text1}>Back</Text>
      <Image source={Logo} style={styles.logos}></Image>
      <View style={styles.rectangle3}>
        <Text style={styles.text2}>62011146 Kunakorn Thepwong</Text>
        <Text style={styles.text2}>62011181 Palakorn Kittijarukul</Text>
        <Text style={styles.text2}>62011277 Thawanrat Atthawiwatkul</Text>
        <Text style={styles.text2}>62011197 Peem Opaswarangkul</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    // position: 'relative',
    // height: 50,
    position: 'absolute',
    top: 5,
    left: 0,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    backgroundColor: 'white',
    margin: 20,
  },
  rectangle: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 80,
    width: 410,
    height: 80,
    marginBottom: 20,
    backgroundColor: '#E35205',
  },
  views: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
    flex: 1,
  },
  text0: {
    fontsize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 30,
    position: 'absolute',
    top: 20,
    left: 40,
  },
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  rectangle3: {
    position: 'absolute',
    top: 480,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 330,
    height: 140,
    backgroundColor: 'white',
  },
  logos: {
    borderRadius: 20,
    resizeMode: 'cover',
    height: 350,
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    marginBottom: 100,
  },
});
