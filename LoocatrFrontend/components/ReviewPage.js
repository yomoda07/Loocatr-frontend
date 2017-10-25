import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {FormLabel, Button, Icon, Card } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'

export default class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageBlob: null,
      imageName: null
    };
    this.uploadImage = this.uploadImage.bind(this);
  }


  openPicker(){
    this.setState({ loading: true })
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    ImagePicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      this.setState({ imageName: image.filename })
      const imagePath = image.path;
      let mime = 'image/jpg';
      const imageBlob = fs.readFile(imagePath, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` });
      })
      this.setState({ imageBlob });
      this.setState({ loading: false });
    })
    .catch((error) => {
      this.setState({ loading: false });
    })
  }

  uploadImage() {
    let uploadBlob = null;
    let mime = 'image/jpg';
    const imageRef = firebase.storage().ref(this.props.uid).child(this.state.imageName);
    this.state.imageBlob
    .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        this.props.registerImage(url);
        this.setState({ imageBlob: null });
        this.setState({ imageName: null });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {

    const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View>
      <View>
        <Button
          raised
          onPress={ () => this.openPicker() }
          title={ this.state.imageBlob ? this.state.imageName : "Upload photo" }
          backgroundColor='#00BCD4'
        />
      </View>
    </View>)

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <ScrollView>
         <View style={{marginTop: 100}}>
          <Card>
            <View style={styles.raitingsWrapper}>
              <StarRating
                maxStars={5}
                starSize={30}
                starColor='#4029b9'
                rating={this.props.newRatings}
                selectedStar={(rating) => this.props.onStarRatingPress(rating)}
              />
              <Icon style={styles.closeButton} name='close' onPress={() => {
                this.props.setModalVisible(false);
              }} />
            </View>
            <TextField
               label='Review'
               fontSize={20}
               inputContainerPadding={80}
               value={this.props.newReview}
               multiline={true}
               onChangeText={ (text) => this.props.onReviewTextChange(text) }
             />
            <View>
               { dps }
            </View>
            <Button
              raised
              disabled={ !this.props.newReview }
              backgroundColor='#007fff'
              buttonStyle={{ marginTop: 10 }}
              icon={{ name: 'add'}}
              title='Post Review'
              onPress={() => {
                if (this.state.imageBlob) {
                  this.uploadImage();
                }
                this.props.submitReview(this.props.newRatings, this.props.newReview);
              }}
            />
          </Card>
         </View>
       </ScrollView>
      </Modal>
    );
  }
}


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
