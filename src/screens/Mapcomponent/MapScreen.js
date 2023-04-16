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
import MapView, {Marker, enableLatestRenderer} from 'react-native-maps';
import {FullWindowOverlay} from 'react-native-screens';

enableLatestRenderer();

export default function MapScreen({navigation}) {
  const item = [
    {
      id: 1,
      latitude: 13.729249840361328,
      longitude: 100.77563323749371,
    },
    {
      id: 2,
      latitude: 13.726573105186487,
      longitude: 100.77497633816488,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.views}>
        <Searchbar placeholder="Search" style={styles.search}></Searchbar>
        <Text style={styles.text1}>10 KM </Text>
        <Text style={styles.text2}>10 minutes </Text>
      </View>
      <View style={styles.views2}>
        <MapView
          style={styles.map}
          minZoomLevel={15}
          initialRegion={{
            latitude: 13.730283,
            longitude: 100.77945,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}>
          {item.map((item, index) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
  views: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
  },
  views2: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
    height: 500,
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
