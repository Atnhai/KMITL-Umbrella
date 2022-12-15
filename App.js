import React from 'react';
import type {Node} from 'react';
import Navigation from './src/navigation';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreencomponent';
import SigninScreen from './src/screens/SigninScreencomponent';
import RegisterScreen from './src/screens/Registercomponent';
import MainScreen from './src/screens/Maincomponent';
import MapScreen from './src/screens/Mapcomponent';
import ScanQRScreen from './src/screens/ScanQRcomponent';
import ProfileScreen from './src/screens/Profilecomponent';
//  const {Navigator,screen} = createStackNavigator();
// const Stack =createStackNavigator();
const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Scan" component={ScanQRScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>

    // <SafeAreaView>
    //   {/* <Navigation> </Navigation> */}
    //   {/* <ProfileScreen></ProfileScreen> */}
    //   {/* <MapScreen></MapScreen> */}
    //   <ProfileScreen></ProfileScreen>
    // </SafeAreaView>
  );
};

export default App;
