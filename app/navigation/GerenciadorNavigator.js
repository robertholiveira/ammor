import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeGerenciadorScreen from '../screens/HomeGerenciadorScreen';
import AddLancamentoScreen from '../screens/AddLancamentoScreen';
import ListaVoluntariadosScreen from '../screens/ListaVoluntariadosScreen';
import RelatorioScreen from '../screens/RelatorioScreen';

import Icon from '@expo/vector-icons/FontAwesome';


const HomeStack = createStackNavigator({
  Home: HomeGerenciadorScreen,
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="home"
      color={tintColor}
      size={24}
    />
  ),
};


const ListaVoluntariadosStack = createStackNavigator({
  ListaVoluntariados: ListaVoluntariadosScreen,
});
ListaVoluntariadosStack.navigationOptions = {
  tabBarLabel: 'Lista de voluntariados',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="child"
      color={tintColor}
      size={24}
    />
  ),
};


const AddLancamentoStack = createStackNavigator({
  AddLancamento: AddLancamentoScreen
});
AddLancamentoStack.navigationOptions = {
  tabBarLabel: 'Adicionar lançamento',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="dollar"
      color={tintColor}
      size={24}
    />
  ),
};


const RelatorioStack = createStackNavigator({
  Relatorio: RelatorioScreen,
});
RelatorioStack.navigationOptions = {
  tabBarLabel: 'Relatórios',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="pie-chart"
      color={tintColor}
      size={24}
    />
  ),
};




export default createBottomTabNavigator({
  HomeStack,
  AddLancamentoStack,
  ListaVoluntariadosStack,
  RelatorioStack
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#d75156',
    activeBackgroundColor: '#eee',
    inactiveTintColor: '#ff9e9e',
    inactiveBackgroundColor: '#eee'
  },
});
