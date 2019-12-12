import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import ChatBar from './ScreensComponents/ChatBar';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';
import {NavigationEvents} from 'react-navigation';

let unsubscribe = '';
export default class ChatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
    };
  }
  static navigationOptions = {
    title: 'Chats',
  };

  async componentDidMount() {
    console.log(this.state.docs);
    const user = auth().currentUser;

    console.log(user.uid);
    const ref = firestore()
      .collection('chat_rooms')
      .where('tags', 'array-contains', user.uid);

    unsubscribe = ref.onSnapshot(dataSnapshot => {
      // this.setState({docs: dataSnapshot.docs});
      console.log(dataSnapshot);
      let docsVal = [];
      dataSnapshot.docs.forEach(doc => {
        let object = {};
        doc._data.tags.forEach(tag => {
          if (tag !== user.uid) {
            firestore()
              .collection('users')
              .doc(tag)
              .get()
              .then(dataUser => {
                object.name = dataUser._data.name;
                // docsVal.push(object);
                // this.setState({docs: docsVal});
                firestore()
                  .collection('chat_rooms')
                  .doc(doc.id)
                  .collection('messages')
                  .orderBy('created', 'desc')
                  .limit(1)
                  .get()
                  .then(messageData => {
                    // console.log(dataSnapshot);
                    console.log(messageData.docs[0]);
                    object.lastMessage = messageData.docs[0]._data.text;
                    let date =
                      moment().unix() -
                      messageData.docs[0]._data.created.seconds;
                    if (date < 24 * 3600) {
                      object.date = moment(
                        messageData.docs[0]._data.created.seconds * 1000,
                        'x',
                      ).format('hh:mm a');
                    } else {
                      object.date = moment(
                        messageData.docs[0]._data.created.seconds * 1000,
                        'x',
                      ).format('DD MMM');
                    }
                    object.id = doc.id;
                    object.userId = user.uid;
                    object.tags = doc._data.tags;
                    docsVal.push(object);
                    this.setState({docs: docsVal});
                  });
              });
          }
        });
      });
      console.log(docsVal);
    });
  }
  render() {
    return (
      <View style={style.rootView}>
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />
        <FlatList
          data={this.state.docs}
          renderItem={({item}) => {
            console.log(item);
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ChatRoomScreen', {
                    name: item.name,
                    chatroomId: item.id,
                    currentId: item.userId,
                    tags: item.tags,
                  })
                }>
                <ChatBar
                  imageUrl={
                    'https://i.pravatar.cc/50/?img=' +
                    parseInt(Math.random() * 70)
                  }
                  name={item.name}
                  text={item.lastMessage}
                  date={item.date}
                  divider={true}
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
