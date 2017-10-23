import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
  List,
  ListItem
} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

const { width, height } = Dimensions.get('window')

export default class MapPage extends Component<{}> {
  constructor() {
    super()

    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      nearestBathrooms: []
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
    axios.get(`http://localhost:3000/bathrooms?lat=${lat}&lng=${lng}`)
    .then(function (response) {
      self.setState({ nearestBathrooms: response.data})
    })
    .catch(function (error) {
      console.log(error)
    })
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

  marker() {
    return {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? 
          <MapView
            style={styles.map, {height: '50%'}}
            showsUserLocation={true}
            followUserLocation={true}
            initialRegion={this.state.region}
          >
            <MapView.Marker
              coordinate={this.marker()}
              title = "Im here!"
              description = "Home"
            />

            {this.state.nearestBathrooms.map((bathroomData, index) => {
              return (
                <MapView.Marker
                  key={index}
                  title={bathroomData.location_name}
                  coordinate={{longitude: bathroomData.longitude, latitude: bathroomData.latitude}}
                >
                </MapView.Marker>
              )
            })}
          </MapView> : null }
          <ScrollView>
            {this.state.nearestBathrooms.map((bathroomData, index) => {
                return (
                  <FlatList style={{flex: 1}}
                    key={index}
                    data={[
                      {name: bathroomData.location_name, rating: bathroomData.average_ratings}
                    ]}
                    renderItem={({item}) => (
                      <View style={styles.list}>
                        <Text style={styles.item}>{item.name}</Text>
                        <Text style={styles.item}>{item.rating}</Text>
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
  list: {
    borderWidth: 0.5, 
    borderColor: '#d3d3d3'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 1,
    width: width
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
});
