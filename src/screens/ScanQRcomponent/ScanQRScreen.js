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
  FlatList,
} from 'react-native';
import Logo from '../../../assets/images/search.png';
import LockerImage from '../../../assets/images/locker.png';
import profileImage2 from '../../../assets/images/profileNew.png';
import profileBW from '../../../assets/images/profileBW.png';
import bill from '../../../assets/images/bill.png';
import correctImage from '../../../assets/images/correct.png';
import { useNavigation } from '@react-navigation/native';
import { FullWindowOverlay } from 'react-native-screens';
import { ScrollView } from 'react-native';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
import secondModalImage from '../../../assets/images/howtoreturn5.png'; 

export default function ScanQRScreen({ navigation }) {
  // Sample data
  const data = [
    {
      id: 1,
      umbrellaId: '01',
      lockerId: '001',
      name: 'John Doe',
      date: '2023-04-28',
      time: '12:00',
      image: profileImage2,
    },
    {
      id: 2,
      umbrellaId: '02',
      lockerId: '002',
      name: 'John Doe',
      date: '2023-04-27',
      time: '17:00',
      image: profileImage2,
    },
    // Add more data items here
  ];

  const lockerData = [
    {
      id: 1,
      lockerId: '003',
      place: 'ECC Building',
      status: 'Available',
      image: LockerImage,
    },
    {
      id: 2,
      lockerId: '004',
      place: 'HM Building',
      status: 'Available',
      image: LockerImage,
    },
    {
      id: 3,
      lockerId: '005',
      place: 'HM Building',
      status: 'Unavailable',
      image: LockerImage,
    },
    // {
    //   id: 1,
    //   lockerId: '003',
    //   place: 'ECC Building',
    //   status: 'Available',
    //   image: LockerImage,
    // },
    // {
    //   id: 2,
    //   lockerId: '004',
    //   place: 'HM Building',
    //   status: 'Available',
    //   image: LockerImage,
    // },
    // {
    //   id: 1,
    //   lockerId: '003',
    //   place: 'ECC Building',
    //   status: 'Available',
    //   image: LockerImage,
    // },
    // {
    //   id: 2,
    //   lockerId: '004',
    //   place: 'HM Building',
    //   status: 'Available',
    //   image: LockerImage,
    // },
    // {
    //   id: 1,
    //   lockerId: '003',
    //   place: 'ECC Building',
    //   status: 'Available',
    //   image: LockerImage,
    // },
    // {
    //   id: 2,
    //   lockerId: '004',
    //   place: 'HM Building',
    //   status: 'Available',
    //   image: LockerImage,
    // },
    // Add more locker data items here
  ];

  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  function DataCard({ item }) {
    return (
      <View style={styles.dataCard}>
        <Image source={item.image} style={styles.dataImage} />
        <View style={styles.dataContent}>
          <Text>Umbrella ID: {item.umbrellaId}</Text>
          <Text>Locker ID: {item.lockerId}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Time: {item.time}</Text>
          <View style={styles.returnButtonContainer}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.returnButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function LockerCard({ item }) {
    if (item.status === 'Available') {
      return (
        <View style={styles.lockerCard}>
          <Image source={item.image} style={styles.lockerImage} />
          <View style={styles.lockerContent}>
            <Text>Place: {item.place}</Text>
            <Text>Locker ID: {item.lockerId}</Text>
            <Text>
              Status: <Text style={styles.availableStatus}>{item.status}</Text>
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
  
  
  

  const renderItem = ({ item }) => <DataCard item={item} />;
  const renderLocker = ({ item }) => <LockerCard item={item} />;

  if (data.length === 0) {
  return (
  <View style={styles.noDataContainer}>
  <Image source={profileBW} style={styles.noDataImage} />
  <Text style={styles.noDataText}>No umbrella rented</Text>
  </View>
  );
  }
  
  // Sort data by date and time in descending order (most recent first)
  const sortedData = data.sort((a, b) => {
  const dateA = new Date(a.date + 'T' + a.time);
  const dateB = new Date(b.date + 'T' + b.time);
  return dateB - dateA;
  });
  
  const availableLockers = lockerData.filter(
  (locker) => locker.status === 'Available'
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowSecondModal(true)}
        >
          <Text style={styles.infoButtonText}>?</Text>
        </TouchableOpacity>
          <Text style={styles.lockerTitle}>
            Available Lockers: {availableLockers.length}
          </Text>
          <FlatList
            data={availableLockers}
            renderItem={renderLocker}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      </Modal>
      <Modal animationType="slide" transparent={false} visible={showSecondModal}>
        <View style={styles.secondModalContainer}>
        <View style={styles.rectangle_small} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSecondModal(false)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Image source={secondModalImage} style={styles.secondModalImage} />
        </View>
      </Modal>
    </View>
  );
  }
  
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#FAC983',
  paddingTop: 15,
  paddingHorizontal: 10,
  },
  dataCard: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  padding: 15,
  marginBottom: 15,
  alignItems: 'center',
  borderRadius: 10,
  },
  dataImage: {
  width: 150,
  height: 150,
  borderRadius: 25,
  marginRight: 10,
  },
  dataContent: {
  justifyContent: 'space-between',
  flex: 1,
  },
  returnButtonContainer: {
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: 10,
  },
  returnButton: {
  backgroundColor: '#E35205',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 4,
  },
  returnButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  },
  modalContainer: {
  flex: 1,
  backgroundColor: '#FAC983',
  paddingTop: 15,
  paddingHorizontal: 10,
  },
  backButton: {
  backgroundColor: 'white',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  alignSelf: 'flex-start',
  },
  backButtonText: {
  color: 'black',
  fontSize: 16,
  },
  infoButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: -30,
  },
  infoButtonText: {
    color: 'black',
    fontSize: 16,
  },
  lockerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginVertical: 10,
  },
  lockerCard: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  padding: 15,
  marginBottom: 15,
  alignItems: 'center',
  borderRadius: 10,
  },
  lockerImage: {
  width: 100,
  height: 100,
  borderRadius: 25,
  marginRight: 10,
  },
  lockerContent: {
  justifyContent: 'space-between',
  flex: 1,
  },
  noDataContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  noDataImage: {
  width: 200,
  height: 200,
  },
  noDataText: {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 20,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  availableStatus: {
    color: 'green',
  },
  secondModalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  secondModalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  rectangle_small: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 80,
    width: 410,
    height: 80,
    marginBottom: 20,
    backgroundColor: '#E35205',
  },
  });
