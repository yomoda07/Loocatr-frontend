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
  ListItem,
  Button
} from 'react-native';
import { Header, Icon } from 'react-native-elements'
import MapView from 'react-native-maps'
import topBar from '../images/center-logo2x.png'
import axios from 'axios'
import StarRating from 'react-native-star-rating'
import geolib from 'geolib'


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
      console.log(response)
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
        console.log(lat)
        const long = position.coords.longitude
        console.log(long)
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

  renderIcon(handicapped, family, over21, customer) {
    if (handicapped == true) {
      return <Icon name='accessible' />
    } 
    else if (family == true) {
      return <Icon name='baby-buggy' />
    } 
    else if (over21 == true) {
      return <Icon name='attach-money' />
    }
    else if (customer == true) {
      return <Icon name='mid-wine' />
    }
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
                // image={require('../images/')}
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
                    <View style={styles.icon}>
                       {this.renderIcon(bathroomData.handicapped, bathroomData.family, bathroomData.over_21, bathroomData.customer_only)}
                    </View>
                    <View style={styles.listDetails}>
                      <View style={{padding: 3}}>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={item.rating}
                          starSize={30}
                          starColor={'#4029b9'}
                        />
                      </View>
                      <View style={styles.button}>
                        <Button
                          color="white"
                          title="Loocate"
                          coordinate={{latitude: parseFloat(bathroomData.latitude), longitude: parseFloat(bathroomData.longitude)}}
                          onPress={() => this.openLocation(parseFloat(bathroomData.latitude), parseFloat(bathroomData.longitude))}
                        />
                      </View>
                    </View>
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
  button: {
    backgroundColor: '#007fff',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'white'
  },
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
  icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  item: {
    padding: 5,
    fontSize: 21,
    height: 44
  },
  distance: {
    color: 'grey',
    padding: 5
  }
});
