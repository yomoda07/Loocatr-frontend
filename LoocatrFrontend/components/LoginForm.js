import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import firebase from 'firebase';

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
    this.setState({ loading: true, error: '' });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
        AsyncStorage.setItem("userData", JSON.stringify(response));
        this.setState({ loading: false })
        this.props.navigate('UserShowPage');
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
        <View style={styles.buttonDiv}>
          <Button
            backgroundColor= '#007fff'
            borderRadius= {4}
            fontFamily= 'verdana'
            fontWeight= 'bold'
            raised
            onPress={this.onLoginPress.bind(this)}
            title='Login'
            disabled={!(!!this.state.email && !!this.state.password)}
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
            <FormLabel style={styles.label}>Email</FormLabel>
            <FormInput
              value={this.state.email}
              onChangeText={(text) => this.handleInput(text, 'email')}
              autoCapitalize='none'
             />
          </View>
          <View style={styles.input}>
            <FormLabel style={styles.label}>Password</FormLabel>
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
    paddingBottom: 150
  },
  topBar: {
    height: 67,
    width: 375,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  label: {
    paddingLeft: 10
  },
  buttonDiv: {
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
});
