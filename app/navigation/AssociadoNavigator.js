import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import DoacaoScreen from '../screens/DoacaoScreen';
import HomeAssociadoScreen from '../screens/HomeAssociadoScreen';
import VoluntariarScreen from '../screens/VoluntariarScreen';

import Icon from '@expo/vector-icons/FontAwesome';

const HomeStack = createStackNavigator({
  Home: HomeAssociadoScreen,
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


const DoacaoStack = createStackNavigator({
  Doacao: DoacaoScreen,
});
DoacaoStack.navigationOptions = {
  tabBarLabel: 'Doações',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="heart"
      color={tintColor}
      size={24}
    />
  ),
};


const VoluntariarStack = createStackNavigator({
  Voluntariar: VoluntariarScreen,
});
VoluntariarStack.navigationOptions = {
  tabBarLabel: 'Voluntariar',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="child"
      color={tintColor}
      size={24}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  DoacaoStack,
  VoluntariarStack,
  VoluntariarStack,
  VoluntariarStack
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#d75156',
    activeBackgroundColor: '#eee',
    inactiveTintColor: '#ff9e9e',
    inactiveBackgroundColor: '#eee'
  },
});
