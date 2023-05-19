import React, {useState, useEffect} from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import Logo from '../../../assets/images/search.png';
import LockerImage from '../../../assets/images/locker.png';
import profileImage2 from '../../../assets/images/profileNew.png';
import bill from '../../../assets/images/bill.png';
import correctImage from '../../../assets/images/correct.png';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import MapView, {Marker, enableLatestRenderer} from 'react-native-maps';
import {FullWindowOverlay} from 'react-native-screens';
import {ScrollView} from 'react-native';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
import Geolocation from '@react-native-community/geolocation';
import {googleMapIsInstalled} from 'react-native-maps/lib/decorateMapComponent';
import {Card} from 'react-native-elements';
import * as geolib from 'geolib';

enableLatestRenderer();

export default function MapScreen({navigation}) {
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  requestLocationPermission();

  const [reloadData, setReloadData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [region, setRegion] = useState({
    latitude: 13.730283,
    longitude: 100.77945,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [selectedUmbrella, setSelectedUmbrella] = useState({
    id: null,
    rentDate: null,
    rentTime: null,
  });
  const [items, setitems] = useState([]);
  const [rentModalVisible, setRentModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const showModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const [tempVar, settempVar] = useState(null);
  const [umbrellasData, setUmbrellasData] = useState([]);
  const item = [
    {
      id: 1,
      latitude: 13.729249840361328,
      longitude: 100.77563323749371,
      place: 'ECC Building',
      image: require('../../../assets/images/ecc.jpg'),
      price: 20.0,
      mark: 'near canteen and 70th building',
    },
    {
      id: 2,
      latitude: 13.726573105186487,
      longitude: 100.77497633816488,
      place: 'HM Building',
      image: require('../../../assets/images/hm.jpg'),
      price: 20.0,
      mark: 'near canteen',
    },
    {
      id: 3,
      latitude: 13.726573105186487,
      longitude: 100.75497633816488,
      place: 'Peem Building',
      image: require('../../../assets/images/hm.jpg'),
      price: 20.0,
    },
  ];

  // export function DataDisplay() {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("http://10.66.10.185:5001/pins")
  //       .then((response) => {
  //         setData(response.data);
  //         console.log("HELLO", response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  //   console.log("DATA = ", data);

  //   const markers = data.map((item) => ({
  //     id: item.id,
  //     coordinate: {
  //       latitude: item.latitude,
  //       longtitude: item.longtitude,
  //     },
  //     title: item.name,
  //     description: "X Available",
  //     image: item.image,
  //   }));

  useEffect(() => {
    const fetchAllLockersData = async () => {
      let lockerNumber = 1;
      let allUmbrellasData = {}; // Temp object to store all locker data

      while (true) {
        try {
          const response = await axios.get(
            `http://10.66.4.168:8000/api/locker/${lockerNumber}`,
          );
          const lockerData = response.data;

          // If lockerData is undefined or null, break the loop
          if (!lockerData) {
            console.log(
              `Locker data for locker number ${lockerNumber} not available`,
            );
            break;
          }

          console.log(`Locker name: ${lockerData.name}`);
          console.log(`Locker ID: ${lockerData.lock_set[0].id}`);

          const newUmbrellaData = {
            [lockerData.name]: lockerData.lock_set.map(lock => ({
              lockId: String(lock.id),
              umbrellaId: String(lock.umbrella.id),
              status: lock.availability ? 'Available' : 'Unavailable',
              placeId: lockerData.name,
            })),
          };

          // Add the new data to the allUmbrellasData object
          allUmbrellasData = {...allUmbrellasData, ...newUmbrellaData};

          lockerNumber++;
        } catch (error) {
          // If the response status is 404, break the loop
          if (error.response && error.response.status === 404) {
            console.log(
              `Locker data for locker number ${lockerNumber} not available`,
            );
            break;
          } else {
            console.error(error);
            break; // Exit the loop if we get any other error
          }
        }
      }

      // Once we've fetched all the data, update the state
      setUmbrellasData(allUmbrellasData);
    };

    fetchAllLockersData();
  }, [reloadData]);

  // const umbrellasData = {
  //   'ECC Building': [
  //     {
  //       lockId: '001',
  //       umbrellaId: '01',
  //       status: 'Available',
  //       placeId: 'ECC Building',
  //     },
  //     {
  //       lockId: '002',
  //       umbrellaId: '02',
  //       status: 'Unavailable',
  //       placeId: 'ECC Building',
  //     },
  //     {
  //       lockId: '003',
  //       umbrellaId: '03',
  //       status: 'Available',
  //       placeId: 'ECC Building',
  //     },
  //     // Add more umbrellas for ECC Building here...
  //   ],
  //   'HM Building': [
  //     {
  //       lockId: '001',
  //       umbrellaId: '04',
  //       status: 'Available',
  //       placeId: 'HM Building',
  //     },
  //     {
  //       lockId: '002',
  //       umbrellaId: '05',
  //       status: 'Available',
  //       placeId: 'HM Building',
  //     },
  //     {
  //       lockId: '003',
  //       umbrellaId: '06',
  //       status: 'Available',
  //       placeId: 'HM Building',
  //     },
  //     //Add more umbrellas for HM Building here...
  //   ],
  //   'Peem Building': [
  //     {
  //       lockId: '001',
  //       umbrellaId: '04',
  //       status: 'Available',
  //       placeId: 'Peem Building',
  //     },
  //     {
  //       lockId: '002',
  //       umbrellaId: '05',
  //       status: 'Unavailable',
  //       placeId: 'Peem Building',
  //     },
  //     {
  //       lockId: '003',
  //       umbrellaId: '06',
  //       status: 'Unavailable',
  //       placeId: 'Peem Building',
  //     },
  //     //Add more umbrellas for HM Building here...
  //   ],
  // };

  // useEffect(() => {
  //   setRegion({
  //     latitude: 13.730283,
  //     longitude: 100.77945,
  //     latitudeDelta: 1,
  //     longitudeDelta: 1,
  //   });
  // }, []);
  const showRentModal = umbrella => {
    const rentDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Bangkok',
    });
    setSelectedUmbrella({
      ...umbrella,
      rentDate: new Date(rentDate).toLocaleDateString(),
      rentTime: new Date(rentDate).toLocaleTimeString(),
    });
    setRentModalVisible(true);
  };

  function measureDistances() {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      position => {
        // Loop through each destination marker and measure the distance from the user's current location
        item.forEach((destination, index) => {
          const distance = geolib.getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {latitude: destination.latitude, longitude: destination.longitude},
          );

          console.log(
            `Distance to destination ${index + 1}: ${distance} meters`,
          );
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  }

  measureDistances();

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        setUserLocation({latitude: crd.latitude, longitude: crd.longitude}); // Add this line
        setRegion({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        });
        console.log('Geolocation API response: ', pos);
        console.log(crd.latitude);
        console.log(crd.longitude);
      },
      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: true, maximumAge: 1000},
    );
    return () => console.log('useEffect cleanup');
  }, []);

  useEffect(() => {
    const geoWatchId = Geolocation.watchPosition(
      position => {
        const crd = position.coords;
        setUserLocation({latitude: crd.latitude, longitude: crd.longitude});
        setRegion({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => Geolocation.clearWatch(geoWatchId);
  }, []);

  const showImageModal = () => {
    setRentModalVisible(false);
    setImageModalVisible(true);
  };

  const showSuccessModal = async () => {
    // const rentDate = new Date(selectedUmbrella?.rentDate);
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const monthYear = monthNames[rentDate.getMonth()] + ' ' + rentDate.getFullYear();
    
    // const email = authentication.currentUser.email;
    
    // let userId;

    // try {
    //     const response = await axios.get('http://10.66.4.168:8000/api/get_userid/', { params: { email } })
    //     userId = response.data.id;
    // } catch(error) {
    //     console.error(error);
    //     return; // Return early if the request fails
    // }

    // const postData = {
    //     user: userId,
    //     place: selectedItem?.place,
    //     date: selectedUmbrella?.rentDate,
    //     time: selectedUmbrella?.rentTime,
    //     umbrellaID: selectedUmbrella?.umbrellaId,
    //     month: monthYear,
    //     image: selectedItem?.image,
    // };
    // console.log(postData)
    // axios.post('http://10.66.4.168:8000/api/histories/', postData)
    // .then(response => {
    //     console.log(response.data);
        setImageModalVisible(false);
        setSuccessModalVisible(true);
    // })
    // .catch(error => console.error(error));
};


  const BlackLine = () => {
    return <View style={styles.blackLine} />;
  };

  const calculateUmbrellaStats = umbrellas => {
    let availableCount = 0;
    let unavailableCount = 0;

    umbrellas.forEach(umbrella => {
      if (umbrella.status === 'Available') {
        availableCount++;
      } else {
        unavailableCount++;
      }
    });

    return {availableCount, unavailableCount};
  };

  const go = (latitude, longitude) => {
    if (latitude && longitude) {
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      });
    }
  };

  // if (!tempVar) {
  //   return <View><Text>Hi</Text></View>;
  // }

  return (
    <View style={styles.container}>
      <View style={styles.views}>
        <Text style={styles.header_text}>
          Choose the locker {tempVar} {'\t'} {'\t'}for rent your umbrella
        </Text>
        {/* { <Searchbar placeholder="Search" style={styles.search}></Searchbar> */}
        {/* <View style={{height: 40, flexDirection: 'row'}}>
          <Text style={styles.text1}>Choose your location here: </Text>
          <TouchableOpacity
            onPress={() => go(item[1].latitude, item[1].longitude)}>
            <Text style={styles.text1}>Hm Building </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => go(item[0].latitude, item[0].longitude)}>
            <Text style={styles.text2}>Ecc Building </Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.cardContainer}></View>

      <View style={styles.views2}>
        <MapView
          style={styles.map}
          minZoomLevel={16}
          showsUserLocation={true}
          followsUserLocation={true}
          region={region}>
          {item.map((item, index) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.place}
              onPress={() => showModal(item)}>
              <Image source={LockerImage} style={styles.profileImage} />
            </Marker>
          ))}
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="You are here"
              pinColor="blue"
            />
          )}
        </MapView>
        {/* <View>
          <Text style={styles.cardTitle}>Choose your location here:</Text>
        </View> */}
        <View style={styles.cardBody}>
          <ScrollView horizontal={true} style={styles.scrollContainer}>
            {item.map((location, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => go(location.latitude, location.longitude)}>
                <View style={styles.locationCard}>
                  <Image source={location.image} style={styles.cardImage} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardText}>{location.place}</Text>
                    <Text style={styles.cardText}>
                      Landmark: {location.mark}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView contentContainerStyle={styles.modalView}>
          <Text style={styles.modalText}>{selectedItem?.place}</Text>
          <Image
            style={styles.modalImage}
            source={selectedItem ? selectedItem.image : null}
          />
          <Text style={styles.modalText}>
            Umbrellas available:{' '}
            {umbrellasData[selectedItem?.place]?.filter(
              umbrella => umbrella.status === 'Available',
            ).length || 0}
          </Text>
          {umbrellasData[selectedItem?.place]?.map((umbrella, index) => {
            const isAvailable = umbrella.status === 'Available';
            const isnearBy =
              userLocation && selectedItem
                ? geolib.getDistance(userLocation, {
                    latitude: selectedItem.latitude,
                    longitude: selectedItem.longitude,
                  })
                : null;

            return (
              <View key={index} style={styles.umbrellaBox}>
                <Image source={LockerImage} style={styles.profileImage} />
                <View style={styles.umbrellaInfo}>
                  <Text style={styles.umbrellaId}>
                    Lock ID: {umbrella.lockId}
                  </Text>
                  <Text style={styles.umbrellaId}>
                    Umbrella ID: {isAvailable ? umbrella.umbrellaId : '-'}
                  </Text>
                  <Text style={styles.umbrellaStatus}>
                    Status:{' '}
                    <Text style={{color: isAvailable ? 'green' : 'red'}}>
                      {umbrella.status}
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.rentButton,
                    backgroundColor:
                      isAvailable && isnearBy <= 100 ? '#E35205' : 'grey',
                  }}
                  onPress={() => showRentModal(umbrella)}
                  disabled={!isAvailable || !isnearBy || isnearBy > 100}>
                  <Text style={styles.rentButtonText}>Rent</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            style={{...styles.modalCloseButton}}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalCloseButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.cardTitle}>
            *Warning: Umbrellas are available for rental within a 100-meter
            radius from the locker.*
          </Text>
        </ScrollView>
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
            style={{...styles.modalCloseButton}}
            onPress={() => setRentModalVisible(!rentModalVisible)}>
            <Text style={styles.modalCloseButtonText}>Back</Text>
          </TouchableOpacity>
          <Image source={bill} style={styles.profileImage2} />
          <View style={{width: '100%'}}>
            <Text style={styles.modalTextLeft}>
              Place: {selectedItem?.place}
            </Text>
            <BlackLine />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.modalTextLeft}>
              Date: {selectedUmbrella?.rentDate}
            </Text>
            <BlackLine />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.modalTextLeft}>
              Time: {selectedUmbrella?.rentTime}
            </Text>
            <BlackLine />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.modalTextLeft}>
              Lock ID: {selectedUmbrella?.lockId}
            </Text>
            <BlackLine />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.modalTextLeft}>
              Umbrella ID: {selectedUmbrella?.umbrellaId}
            </Text>
            <BlackLine />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.modalTextLeft}>
              Price:{selectedItem?.price.toFixed(2)}
            </Text>
            <BlackLine />
          </View>
          <TouchableOpacity
            style={{...styles.modalConfirmButton}}
            onPress={() => showImageModal()}>
            <Text style={styles.modalConfirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => {
          setImageModalVisible(!imageModalVisible);
        }}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{...styles.modalCloseButton}}
            onPress={() => setImageModalVisible(!imageModalVisible)}>
            <Text style={styles.modalCloseButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>
            Please save the image below to pay
          </Text>
          <Image
            style={styles.modalImageQR}
            source={require('../../../assets/images/qr.jpg')}
          />
          <TouchableOpacity
            style={{...styles.modalConfirmButton}}
            onPress={() => showSuccessModal()}>
            <Text style={styles.modalConfirmButtonText}>Save QR code</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(!successModalVisible);
        }}>
        <View style={styles.modalView}>
        <TouchableOpacity
          style={{...styles.modalCloseButton}}
          onPress={() => {
            setSuccessModalVisible(!successModalVisible);
            setReloadData(!reloadData);  // Toggle reloadData state here
          }}>
          <Text style={styles.modalCloseButtonText}>Back</Text>
        </TouchableOpacity>
          <Image source={profileImage2} style={styles.profileImage2} />
          <Text style={styles.successText}>Successfully Rented!</Text>
          <Text style={styles.detailsText}>Place: {selectedItem?.place}</Text>
          <Text style={styles.detailsText}>
            Date: {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.detailsText}>
            Time: {new Date().toLocaleTimeString()}
          </Text>
          <Text style={styles.detailsText}>
            Lock ID: {selectedUmbrella?.lockId}
          </Text>
          <Text style={styles.detailsText}>
            Umbrella ID: {selectedUmbrella?.umbrellaId}
          </Text>
          <Text style={styles.detailsText}>
            Price:{selectedItem?.price.toFixed(2)}
          </Text>
          <Image source={correctImage} style={styles.correctImage} />
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
    paddingTop: 20,
    padding: 10,
    paddingLeft: 40,
    justifyContent: 'center',
    width: 411,
    height: 110,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#FAC983',
  },
  views2: {
    alignItems: 'center',
    // backgroundColor: '#FAC983',

    justifyContent: 'center',
    height: 600,
    // margin: 25,
    marginTop: 0,
    // borderRadius: 15,
    // borderWidth: 4,
    // borderColor: '#E35205',
  },
  header_text: {
    fontSize: 27,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    paddingRight: 30,
  },
  text1: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 10,
    fontWeight: 'bold',
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
  modalImageQR: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  modalCloseButton: {
    backgroundColor: 'black',
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
    backgroundColor: '#E35205',
    borderRadius: 20,
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
  successText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    color: 'green',
  },
  detailsText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  umbrellaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FAC983',
    marginBottom: 10,
    padding: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    marginRight: 10,
  },
  umbrellaInfo: {
    flex: 1,
  },
  umbrellaId: {
    fontSize: 16,
  },
  umbrellaStatus: {
    fontSize: 16,
  },
  modalView: {
    flexGrow: 1,
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
  blackLine: {
    height: 1,
    backgroundColor: '#FAC983',
    marginVertical: 8,
    width: '100%', // Add this line to set the width
  },
  modalTextLeft: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 18,
  },
  profileImage2: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  correctImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 15,
  },
  lockId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lockIdInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    width: 100,
  },
  umbrellaIdInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    width: 100,
  },
  umbrellaStatusInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    width: 150,
  },
  rentButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // scrollContainer: {
  //   height: 120,
  //   marginRight: 80,
  //   // marginBottom:10,
  // },
  // card: {
  //   borderRadius: 10,
  //   marginHorizontal: 10,
  //   minWidth: 400,
  // },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
  cardBody: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 10,
    borderRadius: 10,
    width: 300,
    height: 120,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cardInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
