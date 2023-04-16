import React, { useState } from 'react';
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
  Modal,
} from 'react-native';
import Logo from '../../../assets/images/search.png';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import MapView, {Marker, enableLatestRenderer} from 'react-native-maps';
import {FullWindowOverlay} from 'react-native-screens';

enableLatestRenderer();

export default function MapScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const item = [
    {
      id: 1,
      latitude: 13.729249840361328,
      longitude: 100.77563323749371,
      place: 'ECC Building',
      availableUmbrellas: 5,
      image: require('../../../assets/images/ecc.jpg'),
    },
    {
      id: 2,
      latitude: 13.726573105186487,
      longitude: 100.77497633816488,
      place: 'HM Building',
      availableUmbrellas: 3,
      image: require('../../../assets/images/hm.jpg'),
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
              onPress={() => showModal(item)}
            />
          ))}
        </MapView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{selectedItem?.place}</Text>
          <Image
             style={styles.modalImage}
             source={selectedItem ? selectedItem.image : null}
          />
          <Text style={styles.modalText}>
            Umbrellas available: {selectedItem?.availableUmbrellas}
          </Text>
          <Button title="Rent" onPress={() => Alert.alert('Rent clicked')} />
          <TouchableOpacity
            style={{ ...styles.modalCloseButton }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalCloseButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FAC983',
    width: '90%',
    alignSelf: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  modalCloseButton: {
    backgroundColor: '#FAC983',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
