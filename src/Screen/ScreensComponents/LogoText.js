import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

const LogoText = () => {
  return (
    <Text style={style.logoText}>
      <Text style={style.haloText}>Halo</Text>Chat
    </Text>
  );
};

const style = StyleSheet.create({
  logoText: {
    alignSelf: 'center',
    fontSize: 30,
    color: colors.secondaryDark,
  },
  haloText: {
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
});

export default LogoText;
