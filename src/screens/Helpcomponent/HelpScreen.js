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
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';

export default function HelpScreen({navigation}) {
  return (
    <View style={styles.views}>
      <View style={styles.rectangle} />
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.goBack()}>
        <Text style={styles.text0}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text1}>Back</Text>
      <Text style={styles.text2}>Please Contract Us</Text>
      <View style={styles.rectangle2}>
        <Text style={styles.text4}>0917219691</Text>
      </View>
      <View style={styles.rectangle3}>
        <Text style={styles.text4}>62011197@kmitl.ac.th</Text>
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
  rectangle2: {
    position: 'absolute',
    top: 160,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    height: 60,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  rectangle3: {
    position: 'absolute',
    top: 240,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    height: 60,
    marginBottom: 20,
    backgroundColor: 'white',
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
    fontSize: 20,
    fontWeight: 'bold',
    padding: 50,
    position: 'absolute',
    top: 60,
    width: 400,
    // right: 5,
    left: 5,
  },
  text4: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
});
