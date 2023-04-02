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
