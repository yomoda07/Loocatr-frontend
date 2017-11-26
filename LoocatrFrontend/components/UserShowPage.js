import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  View,
  AsyncStorage
} from 'react-native';
import firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import { Text, Card, Button, Icon } from 'react-native-elements';
import TopBar from './TopBar';
import Review from './Review';
import BathroomList from './BathroomList';

export default class UserShowPage extends Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    headerBackTitleStyle: {
        opacity: 0,
    },
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      postedBathrooms: [],
      usedBathrooms: [],
      reviews: []
    };
    this.navigateToBathroomInfoPage = this.navigateToBathroomInfoPage.bind(this);
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
      if (user != null) {
        this.setState({ username: user.displayName });
      }
    axios.get(`https://obscure-tor-64284.herokuapp.com/users/?user_id=${user.uid}`)
      .then(response => {
        this.setState({ postedBathrooms: response.data.bathrooms});
        this.setState({ usedBathrooms: response.data.histories});
        this.setState({ reviews: response.data.reviews});
      });
  }

  navigateToBathroomInfoPage(bathroomId) {
    this.props.navigation.navigate('Info', {id: bathroomId.toString()})
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Home');
  }

  render() {
    // if (this.state.userData) {
        return (
          <View
            style={styles.container}
            dividerStyle={{borderColor: '#ddd'}}
          >
            <TopBar />
            <ScrollView>
            <Text h2 style={styles.h2}>Hello, {this.state.username}</Text>
            <BathroomList
              title="POSTED BATHROOMS"
               bathrooms={this.state.postedBathrooms}
               navigateToBathroomInfoPage={this.navigateToBathroomInfoPage}n
             />
            <BathroomList
              title="USE HISTORY"
              bathrooms={this.state.usedBathrooms}
              navigateToBathroomInfoPage={this.navigateToBathroomInfoPage}
            />
            <Card title="Reviews You Wrote">
              {this.state.reviews.reverse().map((review) =>
                  <Review key={review.id} {...review} />
              )}
            </Card>
           </ScrollView>
           <ActionButton buttonColor="#4029b9" style={styles.ActionButton}>
            <ActionButton.Item buttonColor='#3F51B5' title="Find Bathroom" onPress={() => this.props.navigation.navigate('Map')}>
              <Icon name="search" color='white' />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0288D1' title="Post Bathroom" onPress={() => this.props.navigation.navigate('Form')}>
              <Icon name="add-location" color='white' />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#03A9F4' title="Logout" onPress={() => this.logout()}>
              <Icon name="person" color='white' />
            </ActionButton.Item>
          </ActionButton>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF'
  },
  ActionButton: {
    position: 'absolute',
    bottom: 0,
    right: 10
  },
  h2: {
    color: '#555'
  }
});
