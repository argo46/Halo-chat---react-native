import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View>
        <Text> Home Screen </Text>
      </View>
    );
  }
}
