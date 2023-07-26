import * as React from 'react';

import { Text, View, StyleSheet, Stack, } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Constants from 'expo-constants';
import OnBoardingPage from './components/OnBoardingPage'
// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
     <OnBoardingPage />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
