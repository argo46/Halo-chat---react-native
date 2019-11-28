import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {StatusBar} from 'react-native';

import {colors} from './src/assets/colors';

import firestore from '@react-native-firebase/firestore';

import TabNav from './src/Screen/tabs';
import ChatRoomScreen from './src/Screen/ChatRoomScreen';
import ChatsScreen from './src/Screen/ChatsScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import LoginScreen from './src/Screen/LoginScreen';
import MapViewScreen from './src/Screen/MapViewScreen';
import SplashScreen from './src/Screen/SplashScreen';
import UserDetailProfile from './src/Screen/UserDetailScreen';

export default class App extends Component {
  componentDidMount() {
    async function bootstrap() {
      await firestore().settings({
        cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED, // unlimited cache size
      });
    }
  }
  render() {
    return (
      <>
        <StatusBar
          backgroundColor={colors.primaryDark}
          barStyle="light-content"
        />
        <AppContainer />
      </>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    TabNav,
    ChatRoomScreen,
    ChatsScreen,
    RegisterScreen,
    LoginScreen,
    MapViewScreen,
    SplashScreen,
    UserDetailProfile,
  },
  {
    initialRouteName: 'TabNav',
    defaultNavigationOptions: {
      title: 'Halo Chat',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);
