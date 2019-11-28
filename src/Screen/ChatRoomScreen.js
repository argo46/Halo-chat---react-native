import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';

import {colors} from '../assets/colors/';
import ChatInputBar from './ScreensComponents/ChatInputBar';
import ChatBubbleIncoming from './ScreensComponents/ChatBubbleIncoming';
import ChatBubbleOut from './ScreensComponents/ChatBubbleOut';

import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

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

  goToLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  unsubscribe = () => {};

  async componentDidMount() {
    const name = this.props.navigation.getParam('name', 'ChatRoom');
    this.props.navigation.setParams({name});

    const unsubscribe = firestore()
      .collection('chat_rooms')
      .doc(this.props.navigation.getParam('chatroomId', ''))
      .collection('messages')
      .orderBy('created', 'desc')
      // .limit(5)
      .onSnapshot(querySnapshot => {
        // console.log('Total users', querySnapshot.size);
        // console.log('User Documents', querySnapshot.docs);
        this.setState({messages: querySnapshot.docs});
        this.unsubscribe = unsubscribe;
      });

    // const update = {
    //   displayName: 'Bodo',
    // };

    // await firebase
    //   .auth()
    //   .currentUser.updateProfile(update)
    //   .then(() => {
    //     const user = firebase.auth().currentUser;

    //     if (user) {
    //       console.log(user);
    //     }
    //   });

    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => this.goToLogin())
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }
  render() {
    return (
      <View style={style.rootView}>
        <View style={style.chatsContainer}>
          <FlatList
            contentContainerStyle={style.flatList}
            inverted
            data={this.state.messages}
            renderItem={({item}) => {
              console.log(item);
              console.log(this.props.navigation.getParam('currentId', ''));
              if (
                item._data.sender_id ===
                this.props.navigation.getParam('currentId', '')
              ) {
                return <ChatBubbleOut message={item._data.text} />;
              } else {
                return <ChatBubbleIncoming message={item._data.text} />;
              }
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <ChatInputBar
          chatroomId={this.props.navigation.getParam('chatroomId', '')}
          senderId={this.props.navigation.getParam('currentId', '')}
        />
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
    marginHorizontal: 10,
  },
});
