import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {StatusBar} from 'react-native';

import {colors} from './src/assets/colors';

import TabNav from './src/Screen/tabs';
import ChatRoomScreen from './src/Screen/ChatRoomScreen';
import ChatsScreen from './src/Screen/ChatsScreen';

export default class App extends Component {
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
