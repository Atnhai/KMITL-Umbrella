import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const historyData = [
  { 
    id: 1,
    place: 'ABC Restaurant',
    date: 'March 2023',
    time: '7:00 PM',
    number: '2 persons',
    price: '$50',
    //image: require('./images/history_image_1.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  { 
    id: 2,
    place: 'XYZ Cafe',
    date: 'February 2023',
    time: '2:00 PM',
    number: '1 person',
    price: '$15',
    //image: require('./images/history_image_2.png')
  },
  // Add more data here...
];

const HistoryPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton}>Back</Text>
        <View style={{ width: 80 }}></View> {/* empty view to center the title */}
      </View>
      <ScrollView>
        {historyData.slice().reverse().map((item) => (
          <View style={styles.historyItem} key={item.id}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.place}>{item.place}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.number}>{item.number}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    color: '#333',
  },
  historyItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  image: {
    width: 80,
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryPage;

