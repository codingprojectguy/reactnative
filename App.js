import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {useEffect, useMemo, useReducer, useCallback } from "react";
import{ Alert } from "react-native";
import OnBoardingPage from './components/OnBoardingPage';
import Profile from "./components/Profile";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./Database/AuthContext";
import { Text, View, StyleSheet, } from 'react-native';

const Stack = createNativeStackNavigator();


// const Stack = createNativeStackNavigator();

export default function App() {

const [state, dispatch] = useReducer(
  (prevState,action)=>{
    switch (action.type) {
      case "onboard":
      return {
        ...prevState,
        isLoading: false,
        isOnboardingCompleted: action.isOnboardingCompleted,
      };
    }
  },{
    isLoading:true,
    isOnboardingCompleted:false,
  }
);

useEffect (()=>{
  (async ()=>{
    let profileData = [];
    try {
      const getProfile = await AsyncStorage.getItem("profile");
      if (getProfile !== null) { profileData = getProfile;}
    } catch(e){
      console.error(e);
    } finally {
      if (Object.keys(profileData).length != 0) {
        dispatch({type:"onboard", isOnboardingCompleted: true});
      } else {
        dispatch({type:"onboard",isOnboardingCompleted:false});
      }
    }
  })();
}, []);

const authContext = useMemo(
  () =>({
    onboard: async data => {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("profile", jsonValue);
      } catch (e) {
        console.error(e);
      }
      dispatch({type: "onboard",isOnboardingCompleted:true});
    },
    update: async data =>{
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("profile",jsonValue);
      } catch (e) {
        console.error(e);
      }

      Alert.alert("Success","Successfully saved changes!");
    },
    logout: async ()=> {
      try {
        await AsyncStorage.clear();
      }catch(e){
        console.error(e);
      }
      dispatch({ type:"onboard",isOnboardingCompleted:false});
    },
  }), []
);

if (state.isLoading){
  return <SplashScreen />
}
  return (
<AuthContext.Provider value ={AuthContext}>
<StatusBar style ="dark" />
<NavigationContainer>
<Stack.Navigetor>
{state.isOnboardingCompleted ?(
<>
<Stack.Screen  name="Home" component={Home} options={{headerShown:false}}/>
<Stack.Screen name="Profile" component={Profile} />
</>
) : (
<Stack.Screen name="OnBoarding" component={OnBoardingPage} options={{headerShown: false}} />
)}
</Stack.Navigetor>
</NavigationContainer>

</AuthContext.Provider>
  );
}

