import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {List} from 'native-base';
import ChatBar from './ScreensComponents/ChatBar';

export default class ContactsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
  };
  render() {
    return (
      <List>
        <ChatBar
          imageUrl="https://randomuser.me/api/portraits/men/74.jpg"
          name="Rufus Hodge"
        />
        <ChatBar
          imageUrl="https://randomuser.me/api/portraits/men/74.jpg"
          name="Rufus Hodge"
        />
        <ChatBar
          imageUrl="https://randomuser.me/api/portraits/men/74.jpg"
          name="Rufus Hodge"
        />
      </List>
    );
  }
}
