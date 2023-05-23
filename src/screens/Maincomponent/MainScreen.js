import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

// Screens
import MapScreen from '../Mapcomponent';
import ScanQRScreen from '../ScanQRcomponent';
import ProfileScreen from '../Profilecomponent';

export default function MainScreen({navigation}) {
  //Screen names
  const mapName = 'Map';
  const scanName = 'My Umbrella';
  const profileName = 'Profile';

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName={mapName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === mapName) {
              iconName = focused ? 'map' : 'map-outline';
            } else if (rn === scanName) {
              iconName = focused ? 'umbrella' : 'umbrella-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'man' : 'man-outline';
            }
            return <Ionic name={iconName} size={size} color={color}></Ionic>;
          },
        })}
        tabBarOptions={{
          tabBarPosition: 'bottom',
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: {paddingBottom: 5, fontsize: 20},
          style: {padding: 20, height: 70},
        }}>
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="My Umbrella"
          component={ScanQRScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
