import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar
} from 'react-native';

export default class HomePage extends Component<{}> {
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



  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground
       source={require('../images/backgroundbg.png')}
       style={styles.container}>
       <StatusBar hidden={true}/>

        <View style={styles.container}>
        <Image
        source={require('../images/logo2x.png')}
        style={styles.logo}
        />
        <Text style={styles.find} onPress={() => navigate('Map')}>
          Find Bathroom
        </Text>
        <Text style={styles.add} onPress={() => navigate('Form')}>
          Add Bathroom
        </Text>
        <Text style={styles.userauth} onPress={() => navigate('UserAuth')}>
          Signup / Login
        </Text>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',


  },
  logo: {
    width: 191,
    height: 208,
    flexDirection: 'row',
    bottom: 60
  },
  find: {
    width: 304,
    height: 65,
    padding: 10,
    margin: 4,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    paddingTop: 20,
    borderRadius: 4,
    backgroundColor: '#007fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    elevation: 1
  },
  add: {
    width: 304,
    height: 65,
    padding: 10,
    margin: 4,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    paddingTop: 20,
    borderRadius: 4,
    backgroundColor: '#4029b9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    elevation: 1
  },
  userauth: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingTop: 10
  }

});
