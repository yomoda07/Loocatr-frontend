import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';

export default (props) => {
  const session = () => {
    if (props.user_id !== 'anonymous') {
      return (
        <ActionButton.Item buttonColor='#03A9F4' title="Profile" onPress={() => props.navigate('UserShowPage')}>
          <Icon name="person-outline" color='white' />
        </ActionButton.Item>
      );
    } else {
      return (
        <ActionButton.Item buttonColor='#03A9F4' title="Signin/Login" onPress={() => props.navigate('UserAuth')}>
          <Icon name="person-add" color='white' />
        </ActionButton.Item>
      )
    }
  }
  return (
    <ActionButton buttonColor="#4029b9">
     <ActionButton.Item buttonColor='#3F51B5' title="Find Bathroom" onPress={() => props.navigate('Map')}>
       <Icon name="search" color='white' />
     </ActionButton.Item>
     <ActionButton.Item buttonColor='#0288D1' title="Post Bathroom" onPress={() => props.navigate('Form')}>
       <Icon name="add-location" color='white' />
     </ActionButton.Item>
     {session()}
   </ActionButton>
  );
};
