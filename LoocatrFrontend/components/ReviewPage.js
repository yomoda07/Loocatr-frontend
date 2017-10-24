import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Text,
  TextInput,
  View
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {FormLabel, Button, Icon, Card } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

export default (props) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={props.modalVisible}
    onRequestClose={() => {alert("Modal has been closed.")}}
    >
   <View style={{marginTop: 100}}>
    <Card>
      <View style={styles.raitingsWrapper}>
        <StarRating
          maxStars={5}
          // emptyStar={'ios-star-outline'}
          // fullStar={'ios-star'}
          // halfStar={'ios-star-half'}protect_from_forgery
          // iconSet={'Ionicons'}
          starSize={30}
          starColor='#4029b9'
          rating={props.newRatings}
          selectedStar={(rating) => props.onStarRatingPress(rating)}
        />
        <Icon style={styles.closeButton} name='close' onPress={() => {
          props.setModalVisible(false);
        }} />
      </View>
      <TextField
         label='Review'
         fontSize={20}
         inputContainerPadding={80}
         value={props.newRatings}
         multiline={true}
         onChangeText={ (text) => props.onReviewTextChange(text) }
       />
        <Button
          raised
          disabled={ !props.newReview }
          backgroundColor='#007fff'
          buttonStyle={{ marginTop: 10 }}
          icon={{ name: 'add'}}
          title='Post Review'
          onPress={() => props.submitReview(props.newRatings, props.newReview)}
         />
    </Card>
   </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  raitingsWrapper: {
    height: 50,
    flex: 1,
    width: null,
    marginTop: 5,
    marginBottom: 25,
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    right: 10
  }
});
