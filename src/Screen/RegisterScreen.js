import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../assets/colors';
import {Input, Button} from 'native-base';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegisterScreen = () => {
  const onRegisterPressed = async () => {
    auth().createUserWithEmailAndPassword(email, password, name);
  };

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isHide, setHide] = useState(true);
  return (
    <ScrollView style={style.upperView}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Image source={require('../assets/img/Logo.png')} style={style.logo} />
      <View style={style.form}>
        <View style={style.inputContainer}>
          <Input
            style={style.Input}
            placeholder="name"
            onChangeText={value => setName(value)}
            value={name}
            keyboardType="default"
          />
        </View>
        <View style={style.inputContainer}>
          <Input
            style={style.Input}
            placeholder="email"
            onChangeText={value => setEmail(value)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={style.inputContainer}>
          <Input
            style={style.Input}
            placeholder="password"
            onChangeText={value => setPassword(value)}
            value={password}
            keyboardType="default"
            secureTextEntry={isHide}
          />
          {isHide ? (
            <TouchableOpacity onPress={() => setHide(!isHide)}>
              <Icon size={20} name="eye-slash" color={colors.inactive} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setHide(!isHide)}>
              <Icon size={20} name="eye" color={colors.primaryLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Button onPress={() => onRegisterPressed()} style={style.button}>
        <Text style={style.registerText}>REGISTER</Text>
      </Button>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  rootView: {},
  upperView: {},
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
    // backgroundColor: '#0f0',
  },
  form: {
    marginTop: 70,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: colors.secondaryVeryLight,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Input: {
    // backgroundColor: '#0f0',
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.primaryLight,
    marginTop: 30,
    marginHorizontal: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 18,
    color: '#fff',
  },
});

RegisterScreen.navigationOptions = () => {
  return {
    headerTitle: 'Register',
    // headerRight: () => (
    //   <LogoText style={{alignSelf: 'center', marginHorizontal: 'auto'}} />
    // ),
  };
};

export default RegisterScreen;
