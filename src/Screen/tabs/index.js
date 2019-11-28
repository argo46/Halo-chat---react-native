import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

//page import

import ChatsScreen from '../ChatsScreen';
import ContactsScreen from '../ContactsScreen';
import SettingsScreen from '../SettingsScreen';
import UserDetailScreen from '../UserDetailScreen';

import {colors} from '../../assets/colors';

export default createBottomTabNavigator(
  {
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: {
        title: 'Contacts',
        tabBarIcon: ({tintColor}) => (
          <Icon size={20} name="user-friends" color={tintColor} />
        ),
      },
    },
    Home: {
      screen: ChatsScreen,
      navigationOptions: {
        title: 'Chats',
        tabBarIcon: ({tintColor}) => (
          <Icon size={20} name="comments" solid color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: UserDetailScreen,
      navigationOptions: {
        title: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon size={20} name="user" solid color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      inactiveBackgroundColor: '#f5f5f5',
      activeBackgroundColor: '#f5f5f5',
      activeTintColor: colors.primaryLight,
      inactiveTintColor: colors.inactive,
      // showLabel: false,
    },
  },
);
