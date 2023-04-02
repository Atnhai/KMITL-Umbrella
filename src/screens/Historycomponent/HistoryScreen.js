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

export default function HistoryScreen({navigation}) {
  return (
    <View style={styles.views}>
      <View style={styles.rectangle} />
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.goBack()}>
        <Text style={styles.text0}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text1}>Back</Text>
      <Text>Hi This is History Screen</Text>
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
  text0: {
    fontsize: 20,
    fontWeight: 'bold',
    padding: 10,
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
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 30,
    position: 'absolute',
    top: 20,
    left: 40,
  },
});
