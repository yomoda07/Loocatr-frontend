import React, { Component } from 'react';
import axios from 'axios';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import { Card, ListItem, Button } from 'react-native-elements';
import TopBar from './TopBar';

export default class UserShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperWrapper: {
    height: 270
  },
  slide: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    width: null
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF'
  },
  headerStyle: {
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
    flex: 1,
    width: null
  },
  raitingsWrapper: {
    width: null,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  availableText: {
    position: 'absolute',
    right: 20,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#00BCD4'
  }
  ,
  locatinName: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 3
  }
});
