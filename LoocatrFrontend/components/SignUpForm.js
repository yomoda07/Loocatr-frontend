import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import axios from 'axios';

export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: '',
      username: '',
      email: '',
      password: ''
    };
  }

  onSignUpPress() {
    this.setState({ loading: true, error: '' });
    const { email, password } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(response => {
     response.updateProfile({
        displayName: this.state.username
      }).then(() => {
        this.props.navigate('UserShowPage');
      })
    })
   .catch((error) => {
       this.setState({ error: error.message, loading: false });
   });
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator animating={this.state.loading} />;
    } else {
      return (
        <View style={styles.buttonDiv}>
          <Button
            onPress={ this.onSignUpPress.bind(this)}
            backgroundColor= '#007fff'
            style={styles.button}
            borderRadius= {4}
            fontFamily= 'verdana'
            fontWeight= 'bold'
            raised
            title='Signup'
            disabled={!(!!this.state.username && !!this.state.email && !!this.state.password)}
            disabledStyle={{backgroundColor:'#3d2d75'}}
          />
        </View>
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
            <FormLabel style={styles.label}>Username</FormLabel>
            <FormInput
              autoCapitalize='none'
              value={this.state.username}
              onChangeText={(text) => this.handleInput(text, 'username')}
            />
          </View>
          <View style={styles.input}>
            <FormLabel style={styles.label}>Email</FormLabel>
            <FormInput
              value={this.state.email}
              autoCapitalize='none'
              onChangeText={(text) => this.handleInput(text, 'email')}
            />
          </View>
          <View style={styles.input}>
            <FormLabel style={styles.label}>Password</FormLabel>
            <FormInput
              value={this.state.password}
              autoCapitalize='none'
              onChangeText={(text) => this.handleInput(text, 'password')}
              secureTextEntry={true}
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
    paddingBottom: 150
  },
  topBar: {
    height: 67,
    width: 375,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  label: {
    paddingLeft: 10
  },
  buttonDiv: {
    backgroundColor: 'lightgrey',
    padding: 20,
  }
});
