import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import topBar from '../images/center-logo2x.png'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  CheckBox,
  Button
} from 'react-native-elements'
import axios from 'axios'

let geolocationCoordinates = []

export default class BathRoomForm extends Component<{}> {
  constructor() {
    super()

    this.state = {
        location_name: 'anson',
        latitude: 69,
        longitude: 69,
        over_21: false,
        handicapped: false,
        family: false,
        customer_only: false
    }
  }

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



  updateLocationName(locationName) {
    console.log(this.state.location_name)
    this.setState({ location_name: locationName  });
  }

  updateAddress(address) {
    this.setState({ address: address  });
  }

  toggleOver21() {
    if (this.state.over_21 === false) {
      this.setState({ over_21: true })
    } else {
      this.setState({ over_21: false })
    }
  }

  toggleHandicapped() {
    if (this.state.handicapped === false) {
      this.setState({ handicapped: true })
    } else {
      this.setState({ handicapped: false })
    }
  }

  toggleFamily() {
    if (this.state.family === false) {
      this.setState({ family: true })
    } else {
      this.setState({ family: false })
    }
  }

  toggleCustomerOnly() {
    if (this.state.customer_only === false) {
      this.setState({ customer_only: true })
    } else {
      this.setState({ customer_only: false })
    }
  }

  geolocateAddress(address) {
    // console.log('making request to google')
    var self = this

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDvzsWpabMDZzoKw5hpo5RODzQhqzE4dhg&address=${address}`)
    .then(response => {
      return geolocationLat = response.data.results[0].geometry.location.lat
      return geolocationLng = response.data.results[0].geometry.location.lng

      // console.log('printing state after setting it:')
      // console.log(this.state)
      // return geolocationCoordinates = [geolocationLat, geolocationLng]
    });
    self.setState({
      latitude: geolocationLat,
      longitude: geolocationLng
    })
  }

  addBathroom(bathroomData) {
    // console.log('printing bathroomData:')
    // console.log(bathroomData)
    this.geolocateAddress('dev bootcamp sf')

    console.log('printing state after calling geolocateAddress:')
    console.log(this.state)

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://localhost:3000/bathrooms/',  bathroomData
      // location_name: bathroomData.location_name,
      // latitude: geolocationCoordinates[0],
      // longitude: geolocationCoordinates[1],
      // over_21: bathroomData.over_21,
      // handicapped: bathroomData.handicapped,
      // family: bathroomData.family,
      // customer_only: bathroomData.customer_only
    )
    .then(response => {
      // console.log('printing google API response:')
      // console.log(geolocationCoordinates)
      // console.log('printing backend response:')
      // console.log(response)
    });
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Image
          source={topBar}
          style={styles.topBar}
        />

        <FormLabel>Business Name</FormLabel>
        <FormInput onChangeText={(locationName) => this.updateLocationName(locationName)}/>
        <FormValidationMessage>Error message</FormValidationMessage>

        <FormLabel>Address</FormLabel>
        <FormInput onChangeText={(address) => this.updateAddress(address)}/>

        <CheckBox
          title='21+'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.over_21}
          onPress={() => this.toggleOver21()}
        />

        <CheckBox
          title='Handicap accessible'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.handicapped}
          onPress={() => this.toggleHandicapped()}
        />

        <CheckBox
          title='Family'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.family}
          onPress={() => this.toggleFamily()}
        />

        <CheckBox
          title='Customer-only'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.customer_only}
          onPress={() => this.toggleCustomerOnly()}
        />

        <Button
          raised
          backgroundColor='#007fff'
          buttonStyle={{ marginTop: 10, marginBottom: 20 }}
          icon={{ name: 'add'}}
          title='Add Bathroom'
          onPress={() => this.addBathroom(this.state)}
         />

      </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  topBar: {
    height: 67,
    width: 375,

  }
});
