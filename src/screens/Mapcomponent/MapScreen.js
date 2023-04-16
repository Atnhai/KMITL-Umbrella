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
  const [rentModalVisible, setRentModalVisible] = useState(false);

  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const showRentModal = () => {
    setModalVisible(false);
    setRentModalVisible(true);
  };

  const item = [
    {
      id: 1,
      latitude: 13.729249840361328,
      longitude: 100.77563323749371,
      place: 'ECC Building',
      availableUmbrellas: 5,
      image: require('../../../assets/images/ecc.jpg'),
      price: 5.99,
    },
    {
      id: 2,
      latitude: 13.726573105186487,
      longitude: 100.77497633816488,
      place: 'HM Building',
      availableUmbrellas: 3,
      image: require('../../../assets/images/hm.jpg'),
      price: 7.99,
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
          <Button title="Rent" onPress={() => showRentModal()} />
          <TouchableOpacity
            style={{ ...styles.modalCloseButton }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalCloseButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        </Modal>
        <Modal
      animationType="slide"
      transparent={true}
      visible={rentModalVisible}
      onRequestClose={() => {
        setRentModalVisible(!rentModalVisible);
      }}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={{ ...styles.modalCloseButton }}
          onPress={() => setRentModalVisible(!rentModalVisible)}>
          <Text style={styles.modalCloseButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.modalText}>{selectedItem?.place}</Text>
        <Image
           style={styles.modalImage}
           source={selectedItem ? selectedItem.image : null}
        />
        <Text style={styles.modalText}>
          Umbrella ID: {Math.floor(Math.random() * 100000)}
        </Text>
        <Text style={styles.modalText}>
          Price: ${selectedItem?.price.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={{ ...styles.modalConfirmButton }}
          onPress={() => setRentModalVisible(!rentModalVisible)}>
          <Text style={styles.modalConfirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  </View>
);
}
    
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
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
    fontSize: 100,
    fontWeight: 'bold',
    },
    text1: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 50,
    position: 'absolute',
    top: 70,
    left: 5,
    },
    text2: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 50,
    position: 'absolute',
    top: 70,
    right: 5,
    },
    search: {
    alignItems: 'center',
    width: 350,
    position: 'absolute',
    top: 40,
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
    modalConfirmButton: {
      backgroundColor: 'green',
      borderRadius: 0,
      padding: 10,
      elevation: 2,
      marginTop: 15,
      paddingHorizontal: 30,
    },
    modalConfirmButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    });
