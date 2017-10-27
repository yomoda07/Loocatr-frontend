import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';

export default (props) => {
  const session = () => {
    if (props.user_id !== 'anonymous') {
      return (
        <ActionButton.Item buttonColor='#1abc9c' title="Profile" onPress={() => props.navigate('UserShowPage')}>
          <Icon name="person-outline" />
        </ActionButton.Item>
      );
    } else {
      return (
        <ActionButton.Item buttonColor='#1abc9c' title="Signin/Login" onPress={() => props.navigate('UserAuth')}>
          <Icon name="person-add" />
        </ActionButton.Item>
      )
    }
  }
  return (
    <ActionButton buttonColor="rgba(231,76,60,1)">
     <ActionButton.Item buttonColor='#9b59b6' title="Find Bathroom" onPress={() => props.navigate('Map')}>
       <Icon name="search" />
     </ActionButton.Item>
     <ActionButton.Item buttonColor='#3498db' title="Post Bathroom" onPress={() => props.navigate('Form')}>
       <Icon name="add-location" />
     </ActionButton.Item>
     {session()}
   </ActionButton>
  );
};
