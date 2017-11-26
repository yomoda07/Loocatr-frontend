import React from 'react';
import { View } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';

export default (props) => (
  <View>
    <Button
      backgroundColor='#4029b9'
      buttonStyle={{borderRadius: 2, marginTop: 10, marginLeft: 0, marginRight: 0, marginBottom: -15}}
      title={props.title}
    />
    <Card containerStyle={{padding: 0}}>
      {
        props.bathrooms.reverse().map((bathroom) => {
          return (
            <ListItem
              key={bathroom.id}
              title={bathroom.location_name}
              onPress={() => props.navigateToBathroomInfoPage(bathroom.id)}
            />
          );
        })
      }
    </Card>
  </View>
);
