/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import BathRoomForm from './components/BathRoomForm';
import BathRoomInfo from './components/BathRoomInfo';
import ReviewPage from './components/ReviewPage';
import UserAuth from './components/UserAuth';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBf0Jc9sL7ZPenW1W5faU9O8MAB2TsgHno",
  databaseURL: "https://loocatr.firebaseio.com",
  storageBucket: "loocatr.appspot.com"
};
firebase.initializeApp(config);

const App = StackNavigator(

  {
    Home: {screen: HomePage},
    Map: {screen: MapPage},
    Form: {screen: BathRoomForm},
    Info: {screen: BathRoomInfo},
    Review: {screen: ReviewPage},
    UserAuth: {screen: UserAuth}
  }
)

export default App
