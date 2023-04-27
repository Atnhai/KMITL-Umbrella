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
import bill from '../../../assets/images/bill.png';
import correctImage from '../../../assets/images/correct.png';
import { useNavigation } from '@react-navigation/native';
import { FullWindowOverlay } from 'react-native-screens';
import { ScrollView } from 'react-native';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';

export default function ScanQRScreen({ navigation }) {
// Sample data
const data = [
  {
    id: 1,
    umbrellaId: '01',
    lockerId: '001',
    name: 'John Doe',
    date: '2023-04-27',
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
  //Add more data items here
];

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
        <View style={styles.rentButtonContainer}>
          <TouchableOpacity
            style={styles.rentButton}
            onPress={() => {}}
          >
            <Text style={styles.rentButtonText}>Return</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Image source={profileImage2} style={styles.noDataImage} />
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

  const renderItem = ({ item }) => <DataCard item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  rentButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  rentButton: {
    backgroundColor: '#E35205',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  rentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
});
