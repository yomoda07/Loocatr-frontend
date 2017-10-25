import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  Linking,
  FlatList,
  ScrollView,
  List,
  ListItem
} from 'react-native';
import { Header, Icon, Button } from 'react-native-elements'
import MapView from 'react-native-maps'
import topBar from '../images/center-logo2x.png'
import axios from 'axios'
import StarRating from 'react-native-star-rating'
import geolib from 'geolib'
import Geocoder from 'react-native-geocoder'



const { width, height } = Dimensions.get('window')

export default class MapPage extends Component<{}> {
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

  constructor() {
    super()

    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      nearestBathrooms: [
        // example of simple marker object: { latitude: 37, longitude: -122 }
      ]
    }
  }

  calcDelta(lat, long, accuracy) {
    const oneDegreeofLongitudeInMeters = 111.32;
    const circumference = (40075 / 360)

    const latDelta = accuracy * (1 / (Math.cos(lat) * circumference))
    const lonDelta = (accuracy / oneDegreeofLongitudeInMeters)

    this.setState({
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta
      }
    })
  }

  getBathrooms(lat, lng) {
    var self = this;
    axios.get(`https://obscure-tor-64284.herokuapp.com/bathrooms?lat=${lat}&lng=${lng}`)
    .then(function (response) {
      self.setState({ nearestBathrooms: response.data})
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  openLocation(lat, lng) {
    Linking.openURL(`http://maps.apple.com/?daddr=${lat},${lng}&dirflg=w`)
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        const accuracy = position.coords.accuracy
        this.calcDelta(lat, long, accuracy)
        this.getBathrooms(lat, long)
      }
    )
  }

  distance(lat, long) {
    const miles = 1609.34709
    const meters = geolib.getDistance(
    {latitude: this.state.region.latitude, longitude: this.state.region.longitude},
    {latitude: lat, longitude: long}) 
    const calc = (meters / miles)
    const dist = Math.round(calc * 10) / 10

    return dist
  }

  renderHandicapped(handicapped) {
    if (handicapped == true) {
      return <Icon name='accessible' color='#7a8288' size={20}/>
    } 
  }

  renderFamily(family) {
    if (family == true) {
      return <Icon name='child-friendly' color='#7a8288' size={20}/>
    } 
  }

  renderCustomer(customer) {
    if (customer == true) {
      return <Icon name='attach-money' color='#7a8288' size={20}/>
    } 
  }

  renderOver21(over21) {
    if (over21 == true) {
      return <Icon name='local-bar' color='#7a8288' size={20}/>
    } 
  }

  address(lat, long) {
    // var position = {
    //   lat: parseFloat(lat),
    //   lng: parseFloat(long)
    // };
    // console.log("**************")
    // console.log(position)
    // console.log(lat)

    // Geocoder.geocodePosition(position).then(res => {
    //     // res is an Array of geocoding object (see below)
    //   const address = res[0].feature
    //   console.log(address)
    // })
    // .catch(err => console.log(err))
    
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const address = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDvzsWpabMDZzoKw5hpo5RODzQhqzE4dhg`)
    .then(response => {

      var number = response.data.results[0].address_components[0].long_name
      var street = response.data.results[0].address_components[1].long_name
      var address = number + " " + street

      return address 
    })
    address.then((response) => {

      console.log(response)
    })
    return "hello"
  }

  render() {
    return (

      <View style={styles.container}>
      <Image
        source={topBar}
        style={styles.topBar}
      />

        {this.state.region.latitude ?
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          initialRegion={this.state.region}
        >
          {this.state.nearestBathrooms.map((bathroomData, index) => {
            return (
              <MapView.Marker
                pinColor={'blue'}
                image={require('../images/toilet-icon-04.png')}
                key={index}
                title={bathroomData.location_name}
                coordinate={{latitude: parseFloat(bathroomData.latitude), longitude: parseFloat(bathroomData.longitude)}}
                onPress={() => this.openLocation(parseFloat(bathroomData.latitude), parseFloat(bathroomData.longitude))}
              >
              </MapView.Marker>
            )
          })}
        </MapView> : null }
        <ScrollView>
          {this.state.nearestBathrooms.map((bathroomData, index) => {
            const { navigate } = this.props.navigation;
            return (
              <FlatList style={{flex: 1}}
                key={index}
                data={[
                  {name: bathroomData.location_name, rating: bathroomData.average_ratings}
                ]}
                renderItem={({item}) => (
                  <View style={styles.list}>
                    <View style={styles.listDetails}>
                      <Text 
                      onPress={() =>
                        navigate('Info', {id: bathroomData.id.toString()})
                      }
                      style={styles.item}
                      >
                        {item.name}
                      </Text>
                      <Text style={styles.distance}>
                        {this.distance(bathroomData.latitude, bathroomData.longitude)} mi
                      </Text>
                    </View>
                    <View style={styles.icon1}>
                       {this.renderHandicapped(bathroomData.handicapped)}
                       {this.renderFamily(bathroomData.family)}
                    </View>
                    <View style={styles.icon2}>
                       {this.renderCustomer(bathroomData.customer_only)}
                       {this.renderOver21(bathroomData.over_21)}
                    </View>
                    <View style={styles.listDetails}>
                      <View style={{padding: 3}}>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={item.rating}
                          starSize={20}
                          starColor={'#4029b9'}
                        />
                      </View>
                      <View style={styles.button}>
                        <Button 
                          buttonStyle={{
                            backgroundColor: '#007fff',
                            borderRadius: 10,
                            borderWidth: 1,
                            height: 40,
                            width: 100,
                            bottom: 5,
                            left: 9,
                            overflow: 'hidden',
                            borderColor: 'white'
                          }}
                          color="white"
                          title="loocate"
                          icon={{name: 'near-me'}}
                          coordinate={{latitude: parseFloat(bathroomData.latitude), longitude: parseFloat(bathroomData.longitude)}}
                          onPress={() => this.openLocation(parseFloat(bathroomData.latitude), parseFloat(bathroomData.longitude))}
                        />
                      </View>
                    </View>
                    <Text>
                      {this.address(bathroomData.latitude, bathroomData.longitude)}
                    </Text>
                  </View>
                )}
              />
            )
          })}
        </ScrollView>
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
  map: {
    flex: 1,
    width: width
  },
  topBar: {
    height: 67,
    width: 375
  },
  list: {
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    padding: 5
  },
  listDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon1: {
    position: 'absolute',
    left: 160,
    top: 45,
    flexDirection: 'column'
  },
  icon2: {
    position: 'absolute',
    left: 180,
    top: 45,
    flexDirection: 'column'
  },
  item: {
    padding: 5,
    fontSize: 21,
    height: 44,
    fontFamily: 'verdana'
  },
  distance: {
    color: 'grey',
    padding: 5
  }
});
