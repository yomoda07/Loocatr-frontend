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

export default class BathRoomForm extends Component<{}> {
  constructor() {
    super()

    this.state = {
        locationName: '',
        address: '',
        over_21: false
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
    this.setState({ locationName: locationName  });
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

  submitReview() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('https://localhost:3000/bathrooms/',  {
      locationName: '',
      address: ''
    })
    .then(response => {
      this.setState({ reviews: [response.data, ...this.state.reviews] });
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
          title='Customer-only'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />

        <CheckBox
          title='Key/code required'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />

        <CheckBox
          title='Handicap accessible'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />

        <CheckBox
          title='Stalls'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />

        <CheckBox
          title='Changing table'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />

        <CheckBox
          title='Family'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />


        <Button
          raised
          backgroundColor='#007fff'
          buttonStyle={{ marginTop: 10, marginBottom: 20 }}
          icon={{ name: 'add'}}
          title='Add Bathroom'
          onPress={() => props.submitReview(props.newRatings, props.newReview)}
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
