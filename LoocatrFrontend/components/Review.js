import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import StarRating from 'react-native-star-rating';

export default ({ ratings, description, created_at }) => {
  const dateTime = new Date(created_at);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth();
  const date = dateTime.getDate();
  const hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return (
    <View style={styles.reviewWrapper}>
      <Text style={styles.timeText}>{`${month}/${date}/${year} - ${hours}:${minutes}`}</Text>
      <View style={styles.raitingsWrapper}>
        <StarRating
          disabled={true}
          halfStarEnabled
          maxStars={5}
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
