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
  const [rentModalVisible, setRentModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const showModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const item = [
    // 13.729246179041802, 100.77653473477697
    {
      id: 1,
      latitude: 13.729249840361328,
      longitude: 100.77563323749371,
      place: 'ECC Building',
      availableUmbrellas: 3,
      image: require('../../../assets/images/ecc.jpg'),
      price: 20.0,
    },
    {
      id: 2,
      latitude: 13.726573105186487,
      longitude: 100.77497633816488,
      place: 'HM Building',
      availableUmbrellas: 3,
      image: require('../../../assets/images/hm.jpg'),
      price: 20.0,
    },
  ];
  const [locker, setLocker] = useState(null);
  const [lock1, setLock1] = useState(null);
  const [lock2, setLock2] = useState(null);
  const [lock3, setLock3] = useState(null);
  const [umbrella1, setUmbrella1] = useState(null);
  const [umbrella2, setUmbrella2] = useState(null);
  const [umbrella3, setUmbrella3] = useState(null);
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

  // function measureDistances() {
  //   item.forEach((destination, index) => {
  //     const distance = geolib.getDistance(
  //       {
  //         latitude: region.latitude,
  //         longitude: region.longitude,
  //       },
  //       {latitude: destination.latitude, longitude: destination.longitude},
  //     );

  //     console.log(`Distance to destination ${index + 1}: ${distance} meters`);
  //   });
  // }

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

  const showSuccessModal = () => {
    setImageModalVisible(false);
    setSuccessModalVisible(true);
  };
  const umbrellasData = {
    [locker]: [
      {
        lockId: lock1.id,
        umbrellaId: umbrella1.id,
        status: lock1.availability,
      },
      {
        lockId: lock2.id,
        umbrellaId: umbrella2.id,
        status: lock2.availability,
      },
      {
        lockId: lock3.id,
        umbrellaId: umbrella3.id,
        status: lock3.availability,
      },
      // {
      //   lockId: '005',
      //   umbrellaId: '06',
      //   status: 'Available',
      // },
      // Add more umbrellas for ECC Building here...
    ],
    hmBuilding: [
      {
        lockId: '001',
        umbrellaId: '04',
        status: 'Available',
      },
      {
        lockId: '002',
        umbrellaId: '05',
        status: 'Available',
      },
      {
        lockId: '003',
        umbrellaId: '06',
        status: 'Unavailable',
      },
      //Add more umbrellas for HM Building here...
    ],
  };

  // const fetchAllLockers = async () => {
  //   try {
  //     const response = await axios.get('http://10.66.9.250:8000/api/lockers/'); // Replace with your API endpoint
  //     if (response.status === 200) {
  //       const lockers = response.data;
  //       console.log('All lockers:', lockers);
  //     } else {
  //       console.error('Error fetching lockers:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching lockers:', error);
  //   }
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.66.4.168:8000/api/lockers/');
        const data = response.data; // Assuming the response contains the required data

        // Extract the data and update the state variables
        setLocker(data.locker[0]);
        setLock1(data.locker[0].lock[0]);
        setLock2(data.locker[0].lock[1]);
        setLock3(data.locker[0].lock[2]);
        setUmbrella1(data.locker[0].umbrella[0]);
        setUmbrella2(data.locker[0].umbrella[1]);
        setUmbrella3(data.locker[0].umbrella[2]);

        console.log(locker);
        console.log(lock1);
        console.log(lock2);
        console.log(lock3);
        console.log(umbrella1);
        console.log(umbrella2);
        console.log(umbrella3);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const fetchLockerName = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://10.66.9.250:8000/api/lockers/`,
  //     );
  //     if (response.status === 200) {
  //       const lockerName = response.data[0].name; // Access the first locker's name
  //       settempVar(lockerName);
  //       console.log(
  //         `Locker name for locker ID`,
  //         lockerName,
  //       );
  //     } else {
  //       console.error('Error fetching locker name:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching locker name:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Call fetchLockerName with the desired ID when the component mounts
  //   fetchLockerName();
  //   // Replace 1 with the ID you want to fetch
  //   // ... (other useEffect logic)
  // }, []);

  const BlackLine = () => {
    return <View style={styles.blackLine} />;
  };

  // const item = [
  //   // 13.729246179041802, 100.77653473477697
  //   {
  //     id: 1,
  //     latitude: 13.729249840361328,
  //     longitude: 100.77563323749371,
  //     place: 'ECC Building',
  //     availableUmbrellas: 3,
  //     image: require('../../../assets/images/ecc.jpg'),
  //     price: 20.0,
  //   },
  //   {
  //     id: 2,
  //     latitude: 13.726573105186487,
  //     longitude: 100.77497633816488,
  //     place: 'HM Building',
  //     availableUmbrellas: 3,
  //     image: require('../../../assets/images/hm.jpg'),
  //     price: 20.0,
  //   },
  // ];

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
          Choose the locker {'\t'} {'\t'}for rent your umbrella
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
                      Available Umbrellas:{' '}
                      {
                        (selectedItem?.place === 'ECC Building'
                          ? umbrellasData.eccBuilding
                          : umbrellasData.hmBuilding
                        ).filter(umbrella => umbrella.status === 'Available')
                          .length
                      }
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
            {
              (selectedItem?.place === 'ECC Building'
                ? umbrellasData.eccBuilding
                : umbrellasData.hmBuilding
              ).filter(umbrella => umbrella.status === 'Available').length
            }
          </Text>
          {(selectedItem?.place === 'ECC Building'
            ? umbrellasData.eccBuilding
            : umbrellasData.hmBuilding
          ).map((umbrella, index) => {
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
            onPress={() => setSuccessModalVisible(!successModalVisible)}>
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
