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
import StyleMaincomponent from '../../StyleSheet/StyleMaincomponent';

export default function HelpScreen({navigation}) {
  return (
    <View style={StyleMaincomponent.background_views}>
      <View style={StyleMaincomponent.rectangle_small} />
      <TouchableOpacity
        style={StyleMaincomponent.button_goback}
        onPress={() => navigation.goBack()}>
        <Text style={StyleMaincomponent.text_navigation}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={StyleMaincomponent.text_back}>Back</Text>
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
