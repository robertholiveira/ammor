import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CadastroScreen from '../screens/CadastroScreen';

import AssociadoNavigator from './AssociadoNavigator';
import GerenciadorNavigator from './GerenciadorNavigator';

const AuthStack = createStackNavigator({ Home: HomeScreen, Login: LoginScreen, Cadastro: CadastroScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Associado: AssociadoNavigator,
    Gerenciador: GerenciadorNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));