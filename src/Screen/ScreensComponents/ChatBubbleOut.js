import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

const ChatBubbleOut = props => {
  return (
    <View style={style.rootView}>
      <Text style={style.message}>{props.message}</Text>
    </View>
  );
};

export default ChatBubbleOut;

const style = StyleSheet.create({
  rootView: {
    display: 'flex',
  },
  message: {
    fontSize: 16,
    backgroundColor: colors.secondaryVeryLight,
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 24,
    marginHorizontal: 10,
    marginVertical: 3,
  },
});
