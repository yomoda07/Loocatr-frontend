import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Icon } from 'react-native-elements';
import TopBar from './TopBar';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';


export default class UserAuth extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'signup'
    };
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

  changeTab(selectedTab) {
    this.setState({selectedTab});
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <View style={styles.container}>
        <TopBar />
        <TabNavigator tabBarStyle={styles.tabNavigator}>
          <TabNavigator.Item
            tabStyle={styles.tab}
            titleStyle={styles.tabTitle}
            selected={this.state.selectedTab === 'signup'}
            title="Signup"
            renderIcon={() => <Icon name='account-circle' color='#7a8288' />}
            renderSelectedIcon={() => <Icon name='account-circle' color='#7a8288' />}
            onPress={() => this.setState({ selectedTab: 'signup' })}>
            <SignUpForm navigate={this.props.navigation.navigate} />
          </TabNavigator.Item>
          <TabNavigator.Item
            tabStyle={styles.tab}
            titleStyle={styles.tabTitle}
            selected={this.state.selectedTab === 'login'}
            title="Login"
            renderIcon={() => <Icon name='perm-identity' color='#7a8288' />}
            renderSelectedIcon={() => <Icon name='perm-identity' color='#7a8288' />}
            onPress={() => this.setState({ selectedTab: 'login' })}>
            <LoginForm navigate={this.props.navigation.navigate} />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topBar: {
    height: 67,
    width: 375
  },
  tabNavigator: {
    height: 70,
    position: 'absolute',
    bottom: 0
  },
  tab: {
    height: 60
  },
  tabTitle: {
    fontSize: 16,
    color:'#3d2d75'
  }
})
