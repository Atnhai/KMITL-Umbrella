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
import ProfileImage from '../../../assets/images/locker.png';
import profileImage2 from '../../../assets/images/profileNew.png';
import bill from '../../../assets/images/bill.png';
import correctImage from '../../../assets/images/correct.png';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import MapView, {Marker, enableLatestRenderer} from 'react-native-maps';
import {FullWindowOverlay} from 'react-native-screens';
import { ScrollView } from 'react-native';

enableLatestRenderer();

export default function MapScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUmbrella, setSelectedUmbrella] = useState({ id: null, rentDate: null, rentTime: null });
  const [rentModalVisible, setRentModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const showRentModal = (umbrella) => {
    const rentDate = new Date();
    setSelectedUmbrella({
      ...umbrella,
      rentDate: rentDate.toLocaleDateString(),
      rentTime: rentDate.toLocaleTimeString(),
    });
    setRentModalVisible(true);
  };
  
  const showImageModal = () => {
    setRentModalVisible(false);
    setImageModalVisible(true);
  };

  const showSuccessModal = () => {
    setImageModalVisible(false);
    setSuccessModalVisible(true);
  };
  const umbrellasData = {
    eccBuilding: [
      {
        lockId: '001',
        umbrellaId: '01',
        status: 'Available',
      },
      {
        lockId: '002',
        umbrellaId: '02',
        status: 'Unavailable',
      },
      {
        lockId: '003',
        umbrellaId: '03',
        status: 'Available',
      },
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
      // Add more umbrellas for HM Building here...
    ],
  };
  
  
  const BlackLine = () => {
    return <View style={styles.blackLine} />;
  };
  
  const item = [
    {
      id: 1,
      latitude: 13.729249840361328,
      longitude: 100.77563323749371,
      place: 'ECC Building',
      availableUmbrellas: 3,
      image: require('../../../assets/images/ecc.jpg'),
      price: 20.00,
    },
    {
      id: 2,
      latitude: 13.726573105186487,
      longitude: 100.77497633816488,
      place: 'HM Building',
      availableUmbrellas: 3,
      image: require('../../../assets/images/hm.jpg'),
      price: 20.00,
    },
  ];

  const calculateUmbrellaStats = (umbrellas) => {
    let availableCount = 0;
    let unavailableCount = 0;

    umbrellas.forEach((umbrella) => {
      if (umbrella.status === 'Available') {
        availableCount++;
      } else {
        unavailableCount++;
      }
    });

    return { availableCount, unavailableCount };
  };

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
  }}
>
  <ScrollView contentContainerStyle={styles.modalView}>
    <Text style={styles.modalText}>{selectedItem?.place}</Text>
    <Image
      style={styles.modalImage}
      source={selectedItem ? selectedItem.image : null}
    />
    <Text style={styles.modalText}>
      Umbrellas available:{" "}
      {
        (selectedItem?.place === "ECC Building"
          ? umbrellasData.eccBuilding
          : umbrellasData.hmBuilding
        ).filter((umbrella) => umbrella.status === "Available").length
      }
    </Text>
    {(selectedItem?.place === 'ECC Building' ? umbrellasData.eccBuilding : umbrellasData.hmBuilding).map(
      (umbrella, index) => {
        const isAvailable = umbrella.status === 'Available';
        return (
          <View key={index} style={styles.umbrellaBox}>
            <Image source={ProfileImage} style={styles.profileImage} />
            <View style={styles.umbrellaInfo}>
              <Text style={styles.umbrellaId}>
                Lock ID: {umbrella.lockId}
              </Text>
              <Text style={styles.umbrellaId}>
                Umbrella ID: {isAvailable ? umbrella.umbrellaId : '-'}
              </Text>
              <Text style={styles.umbrellaStatus}>
                Status:{" "}
                <Text style={{ color: isAvailable ? "green" : "red" }}>
                  {umbrella.status}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.rentButton,
                backgroundColor: isAvailable ? '#E35205' : 'grey',
              }}
              onPress={() => showRentModal(umbrella)}
              disabled={!isAvailable}
            >
              <Text style={styles.rentButtonText}>Rent</Text>
            </TouchableOpacity>
          </View>
        );
      }
    )}
    <TouchableOpacity
      style={{ ...styles.modalCloseButton }}
      onPress={() => setModalVisible(!modalVisible)}
    >
      <Text style={styles.modalCloseButtonText}>Back</Text>
    </TouchableOpacity>
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
      style={{ ...styles.modalCloseButton }}
      onPress={() => setRentModalVisible(!rentModalVisible)}>
      <Text style={styles.modalCloseButtonText}>Back</Text>
    </TouchableOpacity>
    <Image source={bill} style={styles.profileImage2} />
    <View style={{ width: '100%' }}>
      <Text style={styles.modalTextLeft}>Place: {selectedItem?.place}</Text>
      <BlackLine />
    </View>
    <View style={{ width: '100%' }}>
      <Text style={styles.modalTextLeft}>
        Date: {selectedUmbrella?.rentDate}
      </Text>
      <BlackLine />
    </View>
    <View style={{ width: '100%' }}>
      <Text style={styles.modalTextLeft}>
        Time: {selectedUmbrella?.rentTime}
      </Text>
      <BlackLine />
    </View>
    <View style={{ width: '100%' }}>
      <Text style={styles.modalTextLeft}>
        Lock ID: {selectedUmbrella?.lockId}
      </Text>
      <BlackLine />
      </View>
    <View style={{ width: '100%' }}>
      <Text style={styles.modalTextLeft}>
        Umbrella ID: {selectedUmbrella?.umbrellaId}
      </Text>
      <BlackLine />
    </View>
    <View style={{ width: '100%' }}>
      <Text style={styles.modalTextLeft}>
        Price: ฿{selectedItem?.price.toFixed(2)}
      </Text>
      <BlackLine />
    </View>
    <TouchableOpacity
      style={{ ...styles.modalConfirmButton }}
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
        style={{ ...styles.modalCloseButton }}
        onPress={() => setImageModalVisible(!imageModalVisible)}>
        <Text style={styles.modalCloseButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.modalText}>Please save the image below to pay</Text>
      <Image
        style={styles.modalImageQR}
        source={require('../../../assets/images/qr.jpg')}
      />
      <TouchableOpacity
        style={{ ...styles.modalConfirmButton }}
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
      style={{ ...styles.modalCloseButton }}
      onPress={() => setSuccessModalVisible(!successModalVisible)}>
      <Text style={styles.modalCloseButtonText}>Back</Text>
    </TouchableOpacity>
    <Image source={profileImage2} style={styles.profileImage2} />
    <Text style={styles.successText}>Successfully Rented!</Text>
    <Text style={styles.detailsText}>Place: {selectedItem?.place}</Text>
    <Text style={styles.detailsText}>Date: {new Date().toLocaleDateString()}</Text>
    <Text style={styles.detailsText}>Time: {new Date().toLocaleTimeString()}</Text>
    <Text style={styles.detailsText}>
                Lock ID: {selectedUmbrella?.lockId}
              </Text>
    <Text style={styles.detailsText}>
        Umbrella ID: {selectedUmbrella?.umbrellaId}
      </Text>
    <Text style={styles.detailsText}>Price: ฿{selectedItem?.price.toFixed(2)}</Text>
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
});
           
