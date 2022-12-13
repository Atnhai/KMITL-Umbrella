import React from 'react';
import type {Node} from 'react';
import HomeScreen from "./src/screens/Homecomponent";
// import {NavigationContainer} from "@react-navigation/native";
// import {createNativeStackNavigator} from "@react-navigation/native-stack";
// import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  Text,
 } from 'react-native';

//  const {Navigator,screen} = createStackNavigator();
// const Stack =createStackNavigator();
const App: () => Node = () => {
  return (

    <SafeAreaView>
      <HomeScreen></HomeScreen>
    </SafeAreaView>

    // <NavigationContainer>
    //   <Navigator>
    //     <Screen
    //     name ="Home"
    //     Component={HomeScreen}/>
    //   </Navigator>
    // </NavigationContainer>
    
  );
};


export default App;
