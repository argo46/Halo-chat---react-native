import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import {colors} from '../../assets/colors';

const ChatInputBar = props => {
  const [text, setText] = useState('');

  const textOnChange = value => {
    setText(value);
  };

  const ref = firestore()
    .collection('chat_rooms')
    .doc(props.chatroomId);
  const sendText = () => {
    ref.collection('messages').add({
      sender_id: props.senderId,
      text,
      created: firestore.FieldValue.serverTimestamp(),
    });
  };
  const onSendPress = () => {
    setText('');
    ref.get().then(dataSnapshot => {
      if (!dataSnapshot.exists) {
        ref.set({tags: props.tags}).then(() => {
          sendText();
        });
      } else {
        sendText();
      }
    });
  };

  return (
    <View style={style.rootView}>
      <Icon
        size={25}
        name="plus-circle-outline"
        color="grey"
        style={style.plusIcon}
      />
      <TextInput
        style={style.textInput}
        onChangeText={text => textOnChange(text)}
        value={text}
      />
      <TouchableOpacity
        style={style.sendContainer}
        onPress={() => onSendPress()}>
        <Icon size={25} name="send" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInputBar;

const style = StyleSheet.create({
  rootView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    // paddingHorizontal: 12,
    // paddingVertical: 5,
    marginTop: 'auto',
    alignItems: 'center',
    height: 50,
  },
  plusIcon: {
    marginVertical: 5,
    marginLeft: 10,
  },
  textInput: {
    marginVertical: 5,
    fontSize: 16,
    flex: 1,
    height: 40,
    padding: 0,
    marginHorizontal: 10,
  },
  sendContainer: {
    marginLeft: 'auto',
    backgroundColor: colors.secondary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
