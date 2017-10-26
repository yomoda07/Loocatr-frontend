import React, { Component } from 'react';
import axios from 'axios';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import firebase from 'firebase';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import { Header, Text, Card, ListItem, Button, Badge } from 'react-native-elements';
import TopBar from './TopBar';
import Review from './Review';

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
      postedBathrooms: [{
        id: 5,
        location_name: "Super Duper",
        latitude: "37.0",
        longitude: "122.0",
        over_21: false,
        handicapped: false,
        family: false,
        customer_only: false,
        average_ratings: 0,
        created_at: "2017-10-26T05:37:32.808Z",
        updated_at: "2017-10-26T05:37:32.808Z",
        is_private: null,
        user_id: null
        },
        {
        id: 2,
        location_name: "The Bird",
        latitude: "37.784585",
        longitude: "-122.397215",
        over_21: false,
        handicapped: false,
        family: false,
        customer_only: true,
        average_ratings: 3,
        created_at: "2017-10-26T00:05:12.655Z",
        updated_at: "2017-10-26T00:05:12.655Z",
        is_private: null,
        user_id: null
      }],
      usedBathrooms: [{
        id: 1,
        location_name: "Dev boot camp",
        latitude: "37.0",
        longitude: "122.0",
        over_21: true,
        handicapped: false,
        family: false,
        customer_only: true,
        average_ratings: 3,
        created_at: "2017-10-25T22:55:32.753Z",
        updated_at: "2017-10-25T22:55:32.753Z",
        is_private: null,
        user_id: null
        },
        {
        id: 3,
        location_name: "Anson’s house",
        latitude: "37.0",
        longitude: "122.0",
        over_21: true,
        handicapped: false,
        family: false,
        customer_only: true,
        average_ratings: 4,
        created_at: "2017-10-26T00:20:35.787Z",
        updated_at: "2017-10-26T00:20:35.787Z",
        is_private: null,
        user_id: null
      }],
      reviews: [{"id":31,"ratings":1,"description":"Nice bathroom you should definitely use it while you still can before they close forever","bathroom_id":1,"user_id":"1","created_at":"2017-10-26T00:57:21.969Z","updated_at":"2017-10-26T00:57:21.969Z"},{"id":19,"ratings":5,"description":"lol polo","bathroom_id":1,"user_id":"1","created_at":"2017-10-25T23:54:34.748Z","updated_at":"2017-10-25T23:54:34.748Z"}]
    };
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

  render() {
    // if (this.state.userData) {
        return (
          <View
            style={styles.container}
            dividerStyle={{borderColor: '#ddd'}}
          >
            <TopBar />
            <Text h2 style={styles.h2}>Hello, {this.state.username}</Text>
            <Button
              backgroundColor='#4029b9'
              buttonStyle={{borderRadius: 0, marginTop: 10, marginLeft: 0, marginRight: 0, marginBottom: -15}}
              title='POSTED BATHROOMS' />
            <Card containerStyle={{padding: 0}}>
              {
                this.state.postedBathrooms.map((bathroom) => {
                  return (
                    <ListItem
                      key={bathroom.id}
                      title={bathroom.location_name}
                      onPress={() => this.navigateToBathroomInfoPage(bathroom.id)}
                    />
                  );
                })
              }
            </Card>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginTop: 10, marginLeft: 0, marginRight: 0, marginBottom: -15}}
              title='USE HISTORY' />
            <Card containerStyle={{padding: 0}}>
              {
                this.state.usedBathrooms.map((bathroom) => {
                  return (
                    <ListItem
                      key={bathroom.id}
                      title={bathroom.location_name}
                      onPress={() => this.navigateToBathroomInfoPage(bathroom.id)}
                    />
                  );
                })
              }
            </Card>
            <ScrollView>
              <Card title="Reviews You Wrote">
                {this.state.reviews.map((review) =>
                    <Review key={review.id} {...review} />
                )}
              </Card>
            </ScrollView>
            <Button
              raised
              backgroundColor='#FF9800'
              buttonStyle={{ marginTop: -70, borderRadius: 5 }}
              icon={{ name: 'search'}}
              title='Find Bathroom'
              onPress={() => this.props.navigation.navigate('Map')}
             />
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
  h2: {
    color: '#555'
  }
});
