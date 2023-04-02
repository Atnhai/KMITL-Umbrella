import React from 'react';
import type {Node} from 'react';
import LoginScreen from '../LoginScreencomponent';
import SigninScreen from '../SigninScreencomponent';
import RegisterScreen from '../Registercomponent';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HelpScreen from '../Helpcomponent';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <LoginScreen></LoginScreen>
      <HelpScreen></HelpScreen>
      <SigninScreen></SigninScreen>
      <RegisterScreen></RegisterScreen>
    </SafeAreaView>
  );
}
