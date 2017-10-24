import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  Switch
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { SearchBar } from 'react-native-elements'
import topBar from '../images/center-logo2x.png'
import customer from '../icons/customer.svg'
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
        latitude: '',
        longitude: '',
        over_21: false,
        handicapped: false,
        family: false,
        customer_only: false,
        trueSwitchIsOn: true,
        falseSwitchIsOn: false
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

  submitReview(data) {
    console.log(data)
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // axios.post('https://localhost:3000/bathrooms/',  {
    //   locationName: '',
    //   latitude: '',
    //   longitude: '',
    //   over_21: false,
    //   handicapped: false,
    //   family: false,
    //   customer_only: false
    // })
    // .then(response => {
    //   console.log(response)
      // this.setState({ reviews: [response.data, ...this.state.reviews] });
    // });
  }


  render() {
    return (


      <View style={styles.container}>
        <Image
          source={topBar}
          style={styles.topBar}
        />
        <ScrollView>
        <View style={styles.headDiv}>
          <Text style={styles.header}>
            Tell us about this bathroom
          </Text>
        </View>
        <View style={styles.input}>
          <FormLabel>Business Name</FormLabel>
          <FormInput onChangeText={(locationName) => this.updateLocationName(locationName)}/>
        </View>
        <View style={styles.input}>
          <FormLabel>Address</FormLabel>
          <FormInput onChangeText={(address) => this.updateAddress(address)}/>
        </View>
        <View style={styles.toggle}>
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Age restrictions 21+'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

        <View style={styles.toggle}>
          <Image
            source={customer}
            style={styles.icon}
          />
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Customer only'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

       <View style={styles.divider}>
          <Text style={styles.divideText}>
            AMENITIES
          </Text>
        </View>

        <View style={styles.toggle}>
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Handicap accessible'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

        <View style={styles.toggle}>
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='changing table'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>

        <View style={styles.toggle}>
          <ToggleSwitch
             isOn={false}
             onColor='#3d2d75'
             offColor='grey'
             label='Family'
             labelStyle={{color: '#7a8288', fontWeight: '900'}}
             size='small'
             onToggle={ (isOn) => console.log('changed to : ', isOn) }
          />
        </View>
        <View style={styles.buttonDiv}>
          <Button
            backgroundColor= '#007fff'
            borderRadius= {4}
            fontFamily= 'verdana'
            fontWeight= 'bold'
            raised
            title='Submit Bathroom'
            onPress={() => this.submitReview(this.state)}
          />
        </View>


      </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  headDiv: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'verdana'
  },
  divider: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  divideText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'verdana',
    color: '#7a8288'
  },
  topBar: {
    height: 67,
    width: 375,
  },
  checkBox: {
    padding: 30
  },
  icon: {

  },
  toggle: {
    flex: 1,
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5,
    fontFamily: 'verdana',
    fontSize: 16,
    lineHeight: 1.38,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  buttonDiv: {
    backgroundColor: 'lightgrey',
    padding: 20,
    color: '#007fff'
  },
  button: {
    backgroundColor: '#007fff',

  }
});
