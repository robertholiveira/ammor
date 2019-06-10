import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    const loginToken = await AsyncStorage.getItem('loginToken');
    const isAdmin = JSON.parse(await AsyncStorage.getItem('isAdmin'));
  
    this.props.navigation.navigate(loginToken ? isAdmin ? 'Gerenciador' : 'Associado' : 'Auth');

  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}