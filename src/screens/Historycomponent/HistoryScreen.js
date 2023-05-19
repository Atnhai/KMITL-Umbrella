import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {authentication} from '../../../firebase';
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
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HistoryScreen({navigation}) {
  // Define your state variable for refreshing
  const [refreshing, setRefreshing] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  // This function will be called when a refresh is triggered
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setReloadData(!reloadData);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // id: 1,
  // building: 'HM Building',
  // date: '2023-04-01',
  // time: '13:00',
  // lockId: '001',
  // umbrella: '01',
  // price: '฿20',
  // month: 'April 2023',
  // date_end: '2023-05-18',
  // time_end: '12:00',
  // image: require('../../../assets/images/hm.jpg'),

  const [historyData, setHistoryData] = useState([]);
  const [userId, setUserId] = useState([]);
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
            id: item.id,
            building: item.place,
            date: item.date_start,
            date_end: item.date_end,
            time: item.rent_start,
            time_end: item.rent_end,
            umbrella: item.umbrella,
            month: item.month,
            image: item.image, // this will be a URL string, not an imported image in React
          };
        });
        setHistoryData(fetchedHistoryData);
        console.log(fetchedHistoryData);
      })
      .catch(error => console.error(error));
  }, [reloadData]);

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

  const BlackLine = () => {
    return <View style={styles.blackLine} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rectangle} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#E35205" // Change the arrow icon color here
            title="Refreshing..."
            titleColor="#E35205" // Change the text color here
          />
        }>
        {Object.entries(groupedData).map(([month, items]) => (
          <View key={month}>
            <Text style={styles.month}>{month}</Text>
            {items.map(item => (
              <View style={styles.historyItem} key={item.id}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                  <View style={styles.infoBox}>
                    <Text style={styles.building}>{item.building}</Text>
                    <Text style={styles.umbrella}>
                      Umbrella ID:{item.umbrella}
                    </Text>
                    <Text style={styles.date}>Date:{item.date}</Text>
                    <Text style={styles.time}>Time:{item.time}</Text>
                    {/* <Text style={styles.lockId}>Lock ID:{item.lockId}</Text> */}
                    {/* <Text style={styles.number}>Umbrella ID:{item.number}</Text> */}
                    <BlackLine />
                    <Text style={styles.date_end}>
                      Return Date: {item.date_end}
                    </Text>
                    <Text style={styles.time_end}>
                      Return Time: {item.time_end}
                    </Text>
                  </View>
                  {/* <View style={styles.infoBox}>
                    <Text style={styles.price}>{item.price}</Text>
                  </View> */}
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
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 50,
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
  building: {
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
  umbrella: {
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
  date_end: {
    marginTop: 5,
    fontSize: 16,
  },
  time_end: {
    marginTop: 5,
    fontSize: 16,
  },
  blackLine: {
    height: 1,
    backgroundColor: '#FAC983',
    marginVertical: 8,
    width: '100%', // Add this line to set the width
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
