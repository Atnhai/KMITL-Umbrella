import React, {useState, useEffect} from 'react';
import {authentication} from '../../../firebase';
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
  ActivityIndicator,
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
import secondModalImage from '../../../assets/images/howtorent6.png';
import cantRent from '../../../assets/images/cantRent.png';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import axios_path from '../../navigation/axios_path';

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
  const [umbrellaImages, setUmbrellaImages] = useState({});
  const [umbrellaIdToImage, setUmbrellaIdToImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [distances, setDistances] = useState([]);

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
  const [showSecondModal, setShowSecondModal] = useState(false);
  const showModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const [tempVar, settempVar] = useState(null);
  const [umbrellasData, setUmbrellasData] = useState([]);
  const [lockerlocation, setlockerlocation] = useState([]);
  // const lockerlocation = [
  //   {
  //     id: 1,
  //     latitude: 13.729249840361328,
  //     longitude: 100.77563323749371,
  //     place: 'ECC Building',
  //     image: require('../../../assets/images/ecc.jpg'),
  //     price: 20.0,
  //     mark: 'near canteen and 70th building',
  //   },
  //   {
  //     id: 2,
  //     latitude: 13.726573105186487,
  //     longitude: 100.77497633816488,
  //     place: 'HM Building',
  //     image: require('../../../assets/images/hm.jpg'),
  //     price: 20.0,
  //     mark: 'near canteen',
  //   },
  //   {
  //     id: 3,
  //     latitude: 13.726573105186487,
  //     longitude: 100.75497633816488,
  //     place: 'Peem Building',
  //     image: require('../../../assets/images/hm.jpg'),
  //     price: 20.0,
  //   },
  // ];
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const email = authentication.currentUser.email;

    axios
      .get(`http://${axios_path}/api/get_userid/`, {params: {email}})
      .then(response => {
        setUserId(response.data.id);
        return axios.get(
          `http://${axios_path}/api/user_rentstate/${response.data.id}/`,
        );
      })
      .then(response => {
        const fetchedRentStateData = response.data.map(item => {
          return {
            time: item.rent_start,
            name: item.renter,
            date: item.date,
            umbrellaId: item.umbrella,
            image: item.image,
          };
        });

        setData(fetchedRentStateData);
      })
      .catch(error => console.error(error));
  }, [reloadData]);
  console.log('data =', data);
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

  useEffect(() => {
    const fetchAllLockersData = async () => {
      let lockerNumber = 1;
      let allUmbrellasData = {}; // Temp object to store all locker data
      let lockerLocations = []; // Temp array to store all locker locations
      let isExecuted = false;
      let allUmbrellaIdToImage = {};

      while (true) {
        try {
          const response = await axios.get(
            `http://${axios_path}/api/locker/${lockerNumber}`,
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
              umbrellaId: lock.umbrella ? String(lock.umbrella.id) : '-',
              status: lock.umbrella ? 'Available' : 'Unavailable',
              placeId: lockerData.name,
            })),
          };

          // Add the new data to the allUmbrellasData object
          allUmbrellasData = {...allUmbrellasData, ...newUmbrellaData};

          for (const lock of lockerData.lock_set) {
            if (lock.umbrella) {
              const umbrellaId = String(lock.umbrella.id);
              try {
                const umbrellaResponse = await axios.get(
                  `http://${axios_path}/api/umbrellas/${umbrellaId}`,
                );
                if (umbrellaResponse.data) {
                  allUmbrellaIdToImage[umbrellaId] =
                    umbrellaResponse.data.image;
                }
              } catch (umbrellaError) {
                console.error(umbrellaError);
              }
            }
          }

          // Build the lockerLocations array
          const lockerLocation = {
            id: lockerData.id,
            latitude: lockerData.latitude,
            longitude: lockerData.longitude,
            place: lockerData.name,
            image: lockerData.image, // add your image source here
            price: lockerData.price, // add your price here
            mark: lockerData.location,
          };

          // Add lockerLocation into lockerLocations
          lockerLocations.push(lockerLocation);

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
      setlockerlocation(lockerLocations);
      setUmbrellaIdToImage(allUmbrellaIdToImage);
    };

    fetchAllLockersData();
  }, [reloadData]);

  // console.log(umbrellaIdToImage);

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

  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0 based, so we add 1.
    const year = date.getFullYear();

    return day + '/' + month + '/' + year;
  };

  const showRentModal = umbrella => {
    const rentDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Bangkok',
    });

    // Create a new Date object
    let newRentDate = new Date(rentDate);

    // Format the date in "day/month/year" format
    let formattedDate = `${newRentDate.getDate()}/${
      newRentDate.getMonth() + 1
    }/${newRentDate.getFullYear()}`;

    setSelectedUmbrella({
      ...umbrella,
      image: umbrellaIdToImage[umbrella.umbrellaId],
      rentDate: formattedDate,
      rentTime: new Date(rentDate).toLocaleTimeString(),
    });
    setRentModalVisible(true);
  };

  // console.log('selectedUmbrella', selectedUmbrella);
  // console.log('selectedUmbrella?.image', selectedUmbrella?.image);
  // console.log('selectedUmbrella?.id', selectedUmbrella?.umbrellaId);

  function measureDistances() {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      position => {
        // Loop through each destination marker and measure the distance from the user's current location
        const newDistances = lockerlocation.map(destination => {
          const distance = geolib.getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {latitude: destination.latitude, longitude: destination.longitude},
          );
          console.log(
            `Distance to destination ${destination.place}: ${distance} meters`,
          );
          return distance;
        });

        setDistances(newDistances);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  }

  useEffect(() => {
    measureDistances();
  }, [reloadData]);
  console.log('distance =', distances);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permissionStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (permissionStatus === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            pos => {
              const crd = pos.coords;
              setUserLocation({
                latitude: crd.latitude,
                longitude: crd.longitude,
              });
              setRegion({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
              });
              console.log('Geolocation API response:', pos);
              console.log(crd.latitude);
              console.log(crd.longitude);
            },
            error => {
              console.log(error.message);
            },
            {
              enableHighAccuracy: false,
            },
          );
        } else if (permissionStatus === RESULTS.DENIED) {
          const requestStatus = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (requestStatus === RESULTS.GRANTED) {
            // Permission granted, retry getting the current position
            // You can handle this case accordingly based on your requirements
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLocationPermission();

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
      {enableHighAccuracy: true},
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

  // Add flag variable outside the map loop
  let alreadyShownMessage = false;

  // if (!tempVar) {
  //   return <View><Text>Hi</Text></View>;
  // }
  return (
    <View style={styles.container}>
      <View style={styles.views}>
        <Text style={styles.header_text}>
          Please choose the locker location to rent your umbrella
        </Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowSecondModal(true)}>
          <Text style={styles.infoButtonText}>?</Text>
        </TouchableOpacity>
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
          {lockerlocation.map((item, index) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.place}
              onPress={() => {
                showModal(item);
                setReloadData(!reloadData);
              }}>
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
        <View style={styles.cardBody}>
          <ScrollView horizontal={true} style={styles.scrollContainer}>
            {lockerlocation.map((location, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => go(location.latitude, location.longitude)}>
                <View style={styles.locationCard}>
                  <Image
                    source={location.image ? {uri: `${location.image}`} : null}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardText}>{location.place}</Text>
                    <Text style={styles.cardText}>
                      Landmark: {location.mark}
                    </Text>
                    <Text style={styles.cardText}>
                      Distance: {distances[index]} meters
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
        transparent={false}
        visible={showSecondModal}>
        <View style={styles.secondModalContainer}>
          <View style={styles.rectangle_small} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSecondModal(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Image source={secondModalImage} style={styles.secondModalImage} />
        </View>
      </Modal>
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
            source={selectedItem ? {uri: `${selectedItem.image}`} : null}
          />
          <Text style={styles.modalText}>
            Umbrellas available:{' '}
            {umbrellasData[selectedItem?.place]?.filter(
              umbrella => umbrella.status === 'Available',
            ).length || 0}
          </Text>

          {data.length !== 0 ? (
            <View style={styles.warningBox}>
              <Image source={cantRent} style={styles.warningImage} />
              <Text style={styles.warningText}>
                You currently have an umbrella rental in your possession. Please
                note, our policy only permits one rental at a time per user. To
                acquire another umbrella, kindly return your existing rental to
                the designated locker. Thank you for your understanding.
              </Text>
            </View>
          ) : (
            umbrellasData[selectedItem?.place]?.map((umbrella, index) => {
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
            })
          )}

          <TouchableOpacity
            style={{...styles.modalCloseButton}}
            onPress={() => {
              setModalVisible(!modalVisible);
              setReloadData(!reloadData);
            }}>
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
            onPress={() => {
              setRentModalVisible(!rentModalVisible);
              setReloadData(!reloadData);
            }}>
            <Text style={styles.modalCloseButtonText}>Back</Text>
          </TouchableOpacity>
          <Image
            source={
              selectedUmbrella?.image ? {uri: selectedUmbrella.image} : null
            }
            style={styles.profileImage2}
          />
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
          {isLoading && <ActivityIndicator size="large" color="#E35205" />}
          <TouchableOpacity
            style={{...styles.modalConfirmButton}}
            onPress={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                showSuccessModal();
              }, 5000); // After 20 seconds, remove the loading spinner and show the success modal
            }}>
            <Text style={styles.modalConfirmButtonText}>Next</Text>
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
              setReloadData(!reloadData); // Toggle reloadData state here
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
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 40,
    width: '100%',
    height: 140, // you can adjust this based on your need
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#FAC983',
  },
  views2: {
    alignItems: 'center',
    flex: 1,
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
    marginRight: 15,
  },
  infoButtonText: {
    color: 'black',
    fontSize: 16,
  },
  rectangle_small: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 80,
    width: '110%',
    height: 80,
    marginBottom: 20,
    backgroundColor: '#E35205',
  },
  warningBox: {
    flex: 1,
    alignItems: 'center', // This will align items horizontally
    justifyContent: 'center', // This will align items vertically
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 10,
  },

  warningImage: {
    width: 100,
    height: 100,
    marginBottom: 10, // Add space between the image and the text
  },

  warningText: {
    fontSize: 16,
    textAlign: 'center', // This will center the text
  },
});
