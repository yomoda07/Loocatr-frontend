/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import HomePage from './components/HomePage'
import MapPage from './components/MapPage'
import BathRoomForm from './components/BathRoomForm'
import BathRoomInfo from './components/BathRoomInfo'
import ReviewPage from './components/ReviewPage'

const App = StackNavigator(

  {
    Home: {screen: HomePage},
    Map: {screen: MapPage},
    Form: {screen: BathRoomForm},
    Info: {screen: BathRoomInfo},
    Review: {screen: ReviewPage}
  }
)

export default App
