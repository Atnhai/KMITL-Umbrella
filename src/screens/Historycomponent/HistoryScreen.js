import React, {Component, useState, useEffect} from 'react';
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
import {authentication} from '../../../firebase';
import axios from 'axios';
export default function HistoryScreen({navigation}) {
  const [historyData, setHistoryData] = useState([]);
  const [userId, setUserID] = useState([])
  useEffect(() => {
    const email = authentication.currentUser.email;

    axios
      .get('http://10.66.4.168:8000/api/get_userid/', {params: {email}})
      .then(response => {
        setUserId(response.data.id);
        return axios.get(
          `http://10.66.4.168:8000/api/user_history/${response.data.id}/`,
        );
      })
      .then(response => {
        const fetchedHistoryData = response.data.map(item => {
          return {
            user: item.place,
            place: item.place,
            date: item.date,
            time: item.time,
            number: item.umbrellaID,
            month: item.month,
            image: item.image, // this will be a URL string, not an imported image in React
          };
        });
        setHistoryData(fetchedHistoryData);
        console.log(fetchedHistoryData);
      })
      .catch(error => console.error(error));
  }, []);
  // const historyData = [
  //   {
  //     id: 1,
  //     place: 'HM Building',
  //     date: '2023-04-01',
  //     time: '13:00',
  //     lockId: '001',
  //     number: '01',
  //     price: '฿20',
  //     month: 'April 2023',
  //     image: require('../../../assets/images/hm.jpg'),
  //   },
  //   {
  //     id: 2,
  //     place: 'ECC Building',
  //     date: '2023-03-20',
  //     time: '14:00',
  //     lockId: '001',
  //     number: '002',
  //     price: '฿20',
  //     month: 'March 2023',
  //     image: require('../../../assets/images/ecc.jpg'),
  //   },
  //   {
  //     id: 3,
  //     place: 'ECC Building',
  //     date: '2023-03-21',
  //     time: '15:00',
  //     lockId: '001',
  //     number: '002',
  //     price: '฿20',
  //     month: 'March 2023',
  //     image: require('../../../assets/images/ecc.jpg'),
  //   },
  //   {
  //     id: 4,
  //     place: 'ECC Building',
  //     date: '2023-04-15',
  //     time: '16:00',
  //     lockId: '001',
  //     number: '002',
  //     price: '฿20',
  //     month: 'April 2023',
  //     image: require('../../../assets/images/ecc.jpg'),
  //   },
  //   {
  //     id: 5,
  //     place: 'HM Building',
  //     date: '2023-04-01',
  //     time: '10:00',
  //     lockId: '001',
  //     number: '001',
  //     price: '฿20',
  //     month: 'April 2023',
  //     image: require('../../../assets/images/hm.jpg'),
  //   },
  //   // Add more data here...
  // ];

  const sortedHistoryData = historyData.sort((a, b) => {
    const aDateTime = new Date(a.date + 'T' + a.time); // Combine date and time for comparison
    const bDateTime = new Date(b.date + 'T' + b.time);

    return bDateTime - aDateTime; // Sort in descending order
  });

  const groupedData = sortedHistoryData.reduce((acc, cur) => {
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
            {items.map(item => (
              <View style={styles.historyItem} key={item.id}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                  <View style={styles.infoBox}>
                    <Text style={styles.place}>{item.place}</Text>
                    <Text style={styles.date}>Date:{item.date}</Text>
                    <Text style={styles.time}>Time:{item.time}</Text>
                    <Text style={styles.lockId}>Lock ID:{item.lockId}</Text>
                    <Text style={styles.number}>Umbrella ID:{item.number}</Text>
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
    width: 410,
    height: 80,
    backgroundColor: '#E35205',
  },

  text0: {
    fontsize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 30,
    position: 'absolute',
    top: 10,
    left: 40,
  },

  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
    zIndex: 1, // Add this to keep the header text and button above the rectangle
  },
  buttons: {
    // position: 'relative',
    // height: 50,
    position: 'absolute',
    top: -3,
    left: 0,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    backgroundColor: 'white',
    margin: 20,
  },
  month: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 20,
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
    fontWeight: 'bold',
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
    marginLeft: 50,
  },
  lockId: {
    marginTop: 5,
    fontSize: 16,
  },
  lockId: {
    marginTop: 5,
    fontSize: 16,
  },
});
