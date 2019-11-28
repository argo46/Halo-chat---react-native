import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {firebase} from '@react-native-firebase/auth';

const SplashScreen = props => {
  useEffect(() => {
    // Update the document title using the browser API
    const user = firebase.auth().currentUser;

    if (user) {
      props.navigation.navigate('TabNav');
    } else {
      props.navigation.navigate('LoginScreen');
    }
  });

  return (
    <View style={style.rootView}>
      <Image source={require('../assets/img/Logo.png')} style={style.logo} />
    </View>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

SplashScreen.navigationOptions = () => {
  return {
    header: null,
  };
};
