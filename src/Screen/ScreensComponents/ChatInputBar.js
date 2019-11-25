import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../assets/colors';

const ChatInputBar = () => {
  return (
    <View style={style.rootView}>
      <Icon
        size={25}
        name="plus-circle-outline"
        color="grey"
        style={style.plusIcon}
      />
      <TextInput style={style.textInput} />
      <View style={style.sendContainer}>
        <Icon size={25} name="send" color="white" />
      </View>
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
