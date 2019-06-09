import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import CadastroScreen from '../screens/CadastroScreen';

const AuthStack = createStackNavigator({ Home: HomeScreen, Login: LoginScreen, Cadastro: CadastroScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));