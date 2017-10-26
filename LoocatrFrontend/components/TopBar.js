import React from 'react';
import { StyleSheet, Image } from 'react-native';
import topBar from '../images/center-logo2x.png';

export default () => (
  <Image
    source={topBar}
    style={styles.topBar}
  />
);

const styles = StyleSheet.create({
  topBar: {
    height: 67,
    width: 375
  }
});
