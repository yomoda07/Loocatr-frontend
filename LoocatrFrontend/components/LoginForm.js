import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: '',
      email: '',
      password: ''
    };
  }

  onLoginPress() {
    console.log("Login button is pressed!");
    this.setState({ loading: true, error: '' });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
        AsyncStorage.setItem("userData", JSON.stringify(response));
        this.props.navigate('Map');
    })
    .catch((error) => {
      this.setState({ error: error.message, loading: false })
    })
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator animating={this.state.loading} />;
    } else {
      return (
        <Button
          backgroundColor= '#007fff'
          borderRadius= {4}
          fontFamily= 'verdana'
          fontWeight= 'bold'
          raised
          onPress={this.onLoginPress.bind(this)}
          title='Login'
          disabled={!(!!this.state.email && !!this.state.password)}
        />
      )
    }
  }

  handleInput(text, key){
    let updatedState = {};
    updatedState[key] = text;
    this.setState(updatedState);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormValidationMessage>
            {this.state.error}
          </FormValidationMessage>
          <View style={styles.input}>
            <FormLabel>Email</FormLabel>
            <FormInput
              value={this.state.email}
              onChangeText={(text) => this.handleInput(text, 'email')}
              autoCapitalize='none'
             />
          </View>
          <View style={styles.input}>
            <FormLabel>Password</FormLabel>
            <FormInput
              value={this.state.password}
              onChangeText={(text) => this.handleInput(text, 'password')}
              secureTextEntry={true}
              autoCapitalize='none'
             />
          </View>
          {this.renderButtonOrSpinner()}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom: 80
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
