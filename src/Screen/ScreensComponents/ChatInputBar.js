import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {shareLiveLocation, stopShareLiveLocation} from '../../helpers/map';

import {colors} from '../../assets/colors';
import {Button} from 'native-base';

const ChatInputBar = props => {
  const [text, setText] = useState('');
  const [isMore, setMore] = useState(false);
  const [isShare, setShare] = useState(false);
  const [watchId, setWatchId] = useState('');

  const textOnChange = value => {
    setText(value);
  };

  const onMapPress = () => {
    Alert.alert(
      'Confirmation',
      'Do you really want to share your live location?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'YES', onPress: () => shareLocation()},
      ],
    );
  };

  const onShowMapPress = () => {
    props.navigation.navigate('MapViewScreen', {ref});
  };

  const shareLocation = () => {
    setShare(true);
    setWatchId(shareLiveLocation(ref));
  };

  const stopShareLocation = () => {
    setShare(false);
    stopShareLiveLocation(watchId, ref);
    console.log(watchId);
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
    <View style={style.rootContainer}>
      {isShare ? (
        <View style={style.snackBarView}>
          <Text style={style.snackBarText}>Live location has been shared</Text>
          <TouchableOpacity
            style={style.showMapContainer}
            onPress={() => onShowMapPress()}>
            <Text style={style.showMapText}>SHOW</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <View style={style.rootView}>
        <TouchableOpacity
          style={style.plusIcon}
          onPress={() => {
            setMore(!isMore);
            Keyboard.dismiss();
          }}>
          <Icon size={25} name="plus-circle-outline" color="grey" />
        </TouchableOpacity>
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
      {isMore ? (
        <View style={style.moreOptionsContainer}>
          <TouchableOpacity>
            <View style={{...style.iconContainer, backgroundColor: '#1abc9c'}}>
              <Icon size={30} name="image" color="white" />
            </View>
          </TouchableOpacity>
          {!isShare ? (
            <TouchableOpacity onPress={() => onMapPress()}>
              <View
                style={{...style.iconContainer, backgroundColor: '#9b59b6'}}>
                <Icon size={30} name="map-marker" color="white" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => stopShareLocation()}>
              <View
                style={{...style.iconContainer, backgroundColor: '#9b59b6'}}>
                <Icon size={30} name="map-marker-off" color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ChatInputBar;

const style = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
  },
  snackBarText: {
    fontSize: 14,
    // color: 'white',
  },
  showMapContainer: {
    backgroundColor: colors.secondary,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginLeft: 'auto',
  },
  showMapText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  snackBarView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    margin: 10,
    paddingLeft: 10,
  },
  rootView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
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
  moreOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.veryLightgrey,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  iconContainer: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 10,
  },
});
