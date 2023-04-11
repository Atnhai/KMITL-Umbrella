import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HistoryScreen({ navigation }) {
  const historyData = [
    {
      id: 1,
      place: 'XYZ Cafe',
      date: '2023-04-1',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'April 2023',
      image: require('../../../assets/images/placeA.png')
    },
    {
      id: 2,
      place: 'ABC Restaurant',
      date: '2023-03-21',
      time: '7:00 PM',
      number: '2 persons',
      price: '$50',
      month: 'March 2023',
      image: require('../../../assets/images/placeB.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      image: require('../../../assets/images/placeC.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      //image: require('./images/history_image_2.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      //image: require('./images/history_image_2.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      //image: require('./images/history_image_2.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      //image: require('./images/history_image_2.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      //image: require('./images/history_image_2.png')
    },
    {
      id: 3,
      place: 'XYZ Cafe',
      date: '2023-02-15',
      time: '2:00 PM',
      number: '1 person',
      price: '$15',
      month: 'February 2023',
      //image: require('./images/history_image_2.png')
    },
    // Add more data here...
  ];

  const groupedData = historyData.reduce((acc, cur) => {
    if (!acc[cur.month]) {
      acc[cur.month] = [];
    }
    acc[cur.month].push(cur);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
  <View style={styles.header}>
    <View style={styles.rectangle} />
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => navigation.goBack()}>
      <Text style={styles.text0}>{'<'}</Text>
    </TouchableOpacity>
    <Text style={styles.text1}>Back</Text>
  </View>
      <ScrollView>
        {Object.entries(groupedData).map(([month, items]) => (
          <View key={month}>
            <Text style={styles.month}>{month}</Text>
            {items.map((item) => (
              <View style={styles.historyItem} key={item.id}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                  <View style={styles.infoBox}>
                    <Text style={styles.place}>{item.place}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.number}>{item.number}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAC983',
    padding: 10,
  },
  rectangle: {
    position: 'absolute',
    left: -10, // Reduce the left value
    top: -10,
    //borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    width: 400,
    height: 80,
    backgroundColor: '#E35205',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
    zIndex: 1, // Add this to keep the header text and button above the rectangle
  },
  
  backButton: {
    color: '#333',
    marginBottom: 5,
  },
  month: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 80,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBox: {
    flex: 1,
  },
  place: {
    fontSize: 18,
  },
  date: {
    marginTop: 5,
    fontSize: 16,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
  },
  number: {
    fontSize: 16,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
  },
});

