import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';

import {colors} from '../assets/colors/';
import ChatInputBar from './ScreensComponents/ChatInputBar';
import ChatBubbleIncoming from './ScreensComponents/ChatBubbleIncoming';
import ChatBubbleOut from './ScreensComponents/ChatBubbleOut';

import firestore from '@react-native-firebase/firestore';

export default class ChatRoomcreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', 'ChatRoom'),
    };
  };

  componentDidMount() {
    const name = this.props.navigation.getParam('name', 'ChatRoom');
    this.props.navigation.setParams({name});

    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('created', 'desc')
      // .limit(5)
      .onSnapshot(querySnapshot => {
        console.log('Total users', querySnapshot.size);
        console.log('User Documents', querySnapshot.docs);
        this.setState({messages: querySnapshot.docs});
      });
  }
  render() {
    return (
      <View style={style.rootView}>
        <View style={style.chatsContainer}>
          <FlatList
            inverted
            data={this.state.messages}
            renderItem={({item}) => {
              if (item._data.name === 'New User') {
                return <ChatBubbleOut message={item._data.text} />;
              } else {
                return <ChatBubbleIncoming message={item._data.text} />;
              }
            }}
            keyExtractor={item => item.id}
          />
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
