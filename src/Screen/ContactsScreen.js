import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {List} from 'native-base';
import ChatBar from './ScreensComponents/ChatBar';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
    };
  }
  static navigationOptions = {
    title: 'Friends',
  };

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    // const documentSnapshot = await firestore()
    //   .collection('users')
    //   .doc(user.uid)
    //   .collection('friends_list')
    //   .get()
    //   .then(result => {
    //     console.log(result.data());
    //     // this.setState({friendList: result.docs});
    //   });
    await firestore()
      .collection('users')
      .get()
      .then(result => {
        let friendListTemp = result.docs.filter(
          userInList => userInList.id !== user.uid,
        );
        this.setState({friendList: friendListTemp, currentUser: user.uid});
      });
    console.log(this.state.friendList);
  }
  render() {
    return (
      <View style={style.rootView}>
        <FlatList
          data={this.state.friendList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let idArray = [this.state.currentUser, item.id];
                  idArray.sort();

                  this.props.navigation.navigate('ChatRoomScreen', {
                    name: item._data.name,
                    chatroomId: idArray[0] + idArray[1],
                    currentId: this.state.currentUser,
                    tags: idArray,
                  });
                }}>
                <ChatBar
                  imageUrl={'https://randomuser.me/api/portraits/men/74.jpg'}
                  name={item._data.name}
                />
              </TouchableOpacity>
            );
          }}
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
