import React, { Component } from 'react';
import axios from 'axios';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import { Card, ListItem, Button } from 'react-native-elements';
import Review from './Review';
import ReviewPage from './ReviewPage';
import Constraint from './Constraint';
import topBar from '../images/center-logo2x.png'

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
      images: [{ image_url: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg' },
      { image_url: 'https://images-na.ssl-images-amazon.com/images/I/51qmhXWZBxL.jpg' },
      { image_url: 'https://images-na.ssl-images-amazon.com/images/I/51vlGuX7%2BFL.jpg' }],
      newReview: '',
      newRatings: 1
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.submitReview = this.submitReview.bind(this);
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

    // axios.get(`http://localhost:3000/bathrooms/${id}/images`)
    // .then(response => this.setState({ images: response.data}));
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

  submitReview(ratings, description) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(`https://obscure-tor-64284.herokuapp.com/bathrooms/${this.state.bathroom.id}/reviews`,  {
      ratings: ratings,
      description: description,
      user_id: 1
    })
    .then(response => {
      this.setState({ reviews: [response.data, ...this.state.reviews] });
      this.setModalVisible(false);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={topBar}
          style={styles.topBar}
        />
        <ReviewPage
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          submitReview={this.submitReview}
          newRatings={this.state.newRatings}
          newReview={this.state.newReview}
          onReviewTextChange={this.onReviewTextChange}
          onStarRatingPress={this.onStarRatingPress}
         />
        <ScrollView>
        <View style={styles.swiperWrapper}>
          <Swiper showsButtons={true} height={250} >
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
          <StarRating
            disabled={false}
            maxStars={5}
            // emptyStar={'ios-star-outline'}
            // fullStar={'ios-star'}
            // halfStar={'ios-star-half'}
            // iconSet={'Ionicons'}
            starSize={25}
            rating={this.state.bathroom.average_ratings}
            starColor='#4029b9'
          />
        </View>
        <Constraint {...this.state.bathroom} />
        <Button
          raised
          backgroundColor='#007fff'
          buttonStyle={{ marginTop: 10 }}
          icon={{ name: 'create'}}
          title='Write a review'
          onPress={() => this.setModalVisible(true)}
         />
          <Card title="Reviews">
            {this.state.reviews.map((review) =>
                <Review key={review.id} {...review} />
            )}
          </Card>
        </ScrollView>
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
    height: 200
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
    width: 150
  },
  locatinName: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 3
  }
});
