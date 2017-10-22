import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

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
    nearestBathrooms: [
      {
        latitude: 37,
        longitude: -122
      },
      {
        latitude: 38,
        longitude: -122
      },
      {
        latitude: 39,
        longitude: -122
      }
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

componentWillMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      const accuracy = position.coords.accuracy
      this.calcDelta(lat, long, accuracy)
      console.log(this.state.region)
      console.log(this.state.nearestBathrooms)

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
      {this.state.region.latitude ? <MapView
        style={styles.map}
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
                title={'marker'}
                coordinate={bathroomData}
              >
              </MapView.Marker>
            )
          })}

        </MapView> : null }
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
},
map: {
  flex: 1,
  width: width
}
});
