import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  Modal,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import { Card, Button } from 'react-native-elements';
import Review from './Review';
import ReviewPage from './ReviewPage';
import Constraint from './Constraint';
import ActionButton from './ActionButton';
import TopBar from './TopBar';

export default class BathRoomInfo extends Component {
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

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      bathroom: {},
      timeFrames: [],
      reviews: [],
      images: [],
      newReview: '',
      newRatings: 1,
      user_id: 'anonymous'
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.registerImage = this.registerImage.bind(this);
    this.onStarRatingPress = this.onStarRatingPress.bind(this);
    this.onReviewTextChange = this.onReviewTextChange.bind(this);
  }
  componentWillMount() {
    const {state} = this.props.navigation;
    const id = state.params.id; // Replace with props later
    axios.get(`https://obscure-tor-64284.herokuapp.com/bathrooms/${id}`)
    .then(response => this.setState({ bathroom: response.data}));

    axios.get(`https://obscure-tor-64284.herokuapp.com/bathrooms/${id}/reviews`)
    .then(response => this.setState({ reviews: response.data}));

    axios.get(`https://obscure-tor-64284.herokuapp.com/bathrooms/${id}/time_frames`)
    .then(response => this.setState({ timeFrames: response.data}));

    axios.get(`https://obscure-tor-64284.herokuapp.com/bathrooms/${id}/images`)
    .then(response => this.setState({ images: response.data}));

    AsyncStorage.getItem('userData')
    .then((value) => {
      if (JSON.parse(value)) {
        this.setState({ user_id: JSON.parse(value).uid });
      }
    });
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onStarRatingPress(rating) {
    this.setState({ newRatings: parseInt(rating) });
  }

  onReviewTextChange(text) {
    this.setState({ newReview: text });
  }

  updateAverageRating(bathroomID) {

    axios.get(`https://obscure-tor-64284.herokuapp.com/bathrooms/${bathroomID}`)
    // .then(response => this.setState({ bathroom: response.data}));
    .then(response => {
      let bathroom = this.state.bathroom
      bathroom.average_ratings = response.data.average_ratings

      this.setState({bathroom})

    })

    // make call to backend
    // take average rating from response
    // update this.state to the new average rating
  }

  submitReview(ratings, description) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(`https://obscure-tor-64284.herokuapp.com/bathrooms/${this.state.bathroom.id}/reviews`,  {
      ratings: ratings,
      description: description,
      user_id: this.state.user_id
    })
    .then(response => {
      var bathroomID = this.state.bathroom.id
      // update the reviews array as well as the stars
      this.setState({ reviews: [response.data, ...this.state.reviews] });
      this.updateAverageRating(bathroomID)
      this.setModalVisible(false);
    });
  }

  registerImage(url) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(`https://obscure-tor-64284.herokuapp.com/bathrooms/${this.state.bathroom.id}/images`,  {
      image_url: url,
      user_id: this.state.user_id
    })
    .then(response => {
      this.setState({ images: [response.data, ...this.state.images] });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <ReviewPage
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          submitReview={this.submitReview}
          newRatings={this.state.newRatings}
          newReview={this.state.newReview}
          onReviewTextChange={this.onReviewTextChange}
          onStarRatingPress={this.onStarRatingPress}
          registerImage={this.registerImage}
          user_id={this.state.user_id}
         />
        <ScrollView>
        <View style={styles.swiperWrapper}>
          <Swiper showsButtons={true} height={270} >
            {!!this.state.images && this.state.images.map(image => {
              return (
                <View key={image.image_url} style={styles.slide}>
                  <Image
                    style={styles.image}
                    source={{ uri: image.image_url }}
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.headerStyle}>
          <Text style={styles.locatinName}>
            {this.state.bathroom.location_name}
          </Text>
          <View style={styles.raitingsWrapper}>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={25}
              rating={this.state.bathroom.average_ratings}
              starColor='#4029b9'
            />
            <Text style={styles.availableText}>OPEN NOW</Text>
          </View>
        </View>
        <Constraint {...this.state.bathroom} />
        <Button
          raised
          backgroundColor='#007fff'
          buttonStyle={{ marginTop: 10 }}
          icon={{ name: 'create'}}
          title='Write a Review!'
          onPress={() => this.setModalVisible(true)}
         />
          <Card title="Reviews">
            {this.state.reviews.map((review) =>
                <Review key={review.id} {...review} />
            )}
          </Card>
        </ScrollView>
        <ActionButton user_id={this.state.user_id} navigate={this.props.navigation.navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    height: 67,
    width: 375
  },
  swiperWrapper: {
    height: 270
  },
  slide: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    width: null
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF'
  },
  headerStyle: {
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
    flex: 1,
    width: null
  },
  raitingsWrapper: {
    width: null,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  availableText: {
    position: 'absolute',
    right: 20,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#00BCD4'
  }
  ,
  locatinName: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 3
  }
});
