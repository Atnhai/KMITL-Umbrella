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
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import StyleMaincomponent from '../../StyleSheet/StyleMaincomponent';
import contact from '../../../assets/images/help6.png'; 

export default function HelpScreen({navigation}) {
  return (
    <View style={StyleMaincomponent.background_views}>
      <View style={StyleMaincomponent.rectangle_small} />
      <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={contact} style={styles.contact} />
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
  contact: {
    top: 50,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute', // set position to absolute
    top: 15, // adjust as per requirement
    left: 10, // adjust as per requirement
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
  },  
  backButtonText: {
    color: 'black',
    fontSize: 16,
  },
});
