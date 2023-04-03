import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreencomponent';
import SigninScreen from '../screens/SigninScreencomponent';
import RegisterScreen from '../screens/Registercomponent';
import HomeScreen from '../screens/Homecomponent';
import MainScreen from '../screens/Maincomponent';
import MapScreen from '../screens/Mapcomponent';
import ScanQRScreen from '../screens/ScanQRcomponent';
import ProfileScreen from '../screens/Profilecomponent';
import HistoryScreen from '../screens/Historycomponent';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Text>hikkkk</Text>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ScanQR" component={ScanQRScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
