import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Button} from 'native-base';
import {colors} from '../assets/colors';
import {firebase} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const UserDetailScreen = () => {
  useEffect(() => {
    // Update the document title using the browser API
    const user = firebase.auth().currentUser;
    console.log(user);
  });

  const onLogoutPress = () => {
    auth()
      .signOut()
      .then(() => this.props.navigation.navigate('LoginScreen'))
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={style.rootView}>
      <View style={style.upperView}>
        <Image
          style={style.thumbnail}
          source={{uri: 'https://randomuser.me/api/portraits/men/74.jpg'}}
        />
        <Text style={style.nameText}>Aditya Argo</Text>
      </View>
      <View style={style.bottomView}>
        <View style={style.infoContainer}>
          <Icon size={25} name="email" color={colors.inactive} />
          <Text style={style.infoText}>Email</Text>
          <Text style={style.valueInfoText}>email@email.com</Text>
        </View>
        <View style={style.divider} />
        <View style={style.infoContainer}>
          <Icon size={25} name="cellphone" color={colors.inactive} />
          <Text style={style.infoText}>Phone</Text>
          <Text style={style.valueInfoText}>+62123456789</Text>
        </View>
        <View style={style.divider} />
        <View style={style.infoContainer}>
          <Icon size={25} name="map-marker" color={colors.inactive} />
          <Text style={style.infoText}>Location</Text>
          <Text style={style.valueInfoText}>Jakarta, Indonesia</Text>
        </View>
        <View style={style.divider} />
        <Button style={style.button} onPress={() => onLogoutPress()}>
          <Text style={style.buttonText}>LOGOUT</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.inactive,
    width: '100%',
    marginVertical: 10,
  },
  upperView: {
    height: '40%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    marginTop: 10,
    fontSize: 25,
    color: '#fff',
  },
  bottomView: {
    paddingTop: 10,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  infoText: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 10,
  },
  valueInfoText: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 'auto',
  },
  button: {
    width: 150,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserDetailScreen;
