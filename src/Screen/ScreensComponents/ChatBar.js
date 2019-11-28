import React from 'react';
import {View, Text} from 'react-native';
import {Thumbnail} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {colors} from '../../assets/colors';

const ChatBar = props => {
  return (
    <View style={style.dividerContainer}>
      <View style={style.rootView}>
        <Thumbnail source={{uri: props.imageUrl}} />
        <View style={style.middleView}>
          <Text style={style.nameText}>{props.name}</Text>
          {props.text ? (
            <Text style={style.longText}>{props.text}</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={style.rightView}>
          <Text style={style.dateText}>{props.date}</Text>
        </View>
      </View>
      {props.divider ? (
        <View style={style.divider} />
      ) : (
        <View style={style.noDivider} />
      )}
    </View>
  );
};

export default ChatBar;

const style = StyleSheet.create({
  dividerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    height: 1,
    backgroundColor: colors.inactive,
    width: '100%',
    marginVertical: 10,
  },
  noDivider: {
    height: 1,
    // backgroundColor: colors.inactive,
    width: '100%',
    marginVertical: 10,
  },
  rootView: {
    display: 'flex',
    flexDirection: 'row',
  },
  middleView: {
    marginLeft: 15,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameText: {
    fontWeight: 'bold',
  },
  longText: {
    color: 'grey',
  },
  dateText: {
    color: 'grey',
  },
  rightView: {
    marginLeft: 'auto',
  },
});
