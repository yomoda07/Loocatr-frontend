import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Button } from 'react-native-elements';

export default ({ handicapped, family, customer_only, over_21}) => (
  <View style={styles.container}>
    <Button
      raised
      disabled={!handicapped}
      backgroundColor='#007fff'
      buttonStyle={{ marginTop: 10, width: 30, paddingRight: 10, paddingLeft: 30 }}
      icon={{ name: 'accessible'}}
    />
    <Button
      raised
      disabled={!family}
      backgroundColor='#007fff'
      buttonStyle={{ marginTop: 10, width: 30, paddingRight: 10, paddingLeft: 30 }}
      icon={{ name: 'child-friendly'}}
    />
    <Button
      raised
      disabled={!customer_only}
      backgroundColor='#007fff'
      buttonStyle={{ marginTop: 10, width: 30, paddingRight: 10, paddingLeft: 30 }}
      icon={{ name: 'attach-money'}}
    />
    <Button
      raised
      disabled={!over_21}
      backgroundColor='#007fff'
      buttonStyle={{ marginTop: 10, width: 30, paddingRight: 15, paddingLeft: 26 }}
      title='21'
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: null,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
