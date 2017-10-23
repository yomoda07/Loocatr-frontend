import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import StarRating from 'react-native-star-rating';

export default ({ ratings, description, created_at }) => {
  return (
    <View style={styles.reviewWrapper}>
      <Text style={styles.timeText}>{new Date(created_at).toString()}</Text>
      <View style={styles.raitingsWrapper}>
        <StarRating
          disabled={true}
          halfStarEnabled
          maxStars={5}
          // emptyStar={'ios-star-outline'}
          // fullStar={'ios-star'}
          // halfStar={'ios-star-half'}
          // iconSet={'Ionicons'}
          rating={ratings}
          starSize={20}
          starStyle={{ width: 20 }}
          starColor='#4029b9'
        />
      </View>
      <Text style={styles.reviewText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewWrapper: {
    paddingBottom: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#EEEEEE',
  },
  raitingsWrapper: {
    width: 50,
    marginTop: 5,
    marginBottom: 10,
  },
  timeText: {
      color: '#aaa'
  },
  reviewText: {
    color: '#444'
  }
});
