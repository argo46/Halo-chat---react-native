import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import {colors} from '../assets/colors/';
import ChatInputBar from './ScreensComponents/ChatInputBar';
import ChatBubbleIncoming from './ScreensComponents/ChatBubbleIncoming';
import ChatBubbleOut from './ScreensComponents/ChatBubbleOut';

export default class ChatRoomcreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', 'ChatRoom'),
    };
  };

  componentDidMount() {
    const name = this.props.navigation.getParam('name', 'ChatRoom');
    this.props.navigation.setParams({name});
  }
  render() {
    return (
      <View style={style.rootView}>
        <View style={style.chatsContainer}>
          <ScrollView>
            <ChatBubbleIncoming message="Halo" />
            <ChatBubbleIncoming message="apa kabar" />
            <ChatBubbleIncoming message="?" />
            <ChatBubbleOut message="Halo" />
            <ChatBubbleOut message="Kabar baik" />
            <ChatBubbleOut message="kamu?" />
          </ScrollView>
        </View>
        <ChatInputBar />
      </View>
    );
  }
}

const style = StyleSheet.create({
  rootView: {
    backgroundColor: colors.backgroundBlue,
    display: 'flex',
    flexGrow: 1,
  },
  chatsContainer: {
    marginTop: 10,
    marginBottom: 60,
    display: 'flex',
    flexDirection: 'column',
  },
});
