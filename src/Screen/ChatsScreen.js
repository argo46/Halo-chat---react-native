import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import ChatBar from './ScreensComponents/ChatBar';
import {List} from 'native-base';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

export default class ChatsScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  async componentDidMount() {
    const user = auth().currentUser;

    if (user) {
      console.log(user);
    }
  }
  render() {
    return (
      <View style={style.rootView}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ChatRoomScreen', {
                  name: item.name,
                })
              }>
              <ChatBar
                imageUrl={item.imageUrl}
                name={item.name}
                text={item.text}
                date={item.date}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  rootView: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});

const DATA = [
  {
    imageUrl: 'https://randomuser.me/api/portraits/men/74.jpg',
    name: 'Rufus Hodge',
    text: 'Doing what you like will always keep you happy . .',
    date: '3:43 pm',
  },
  {
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    name: 'Cain Mcmanus',
    text: 'Doing what you like will always keep you happy . .',
    date: '3:43 pm',
  },
  {
    imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
    name: 'Aneurin Kramer',
    text: 'Doing what you like will always keep you happy . .',
    date: '3:43 pm',
  },
];
