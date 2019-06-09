import React from 'react';
import { Text , StyleSheet } from 'react-native';

export default class StyledText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.textStyle]} > {this.props.text}</Text>;
  }
}

const styles = StyleSheet.create({
  textStyle: {
    padding: 10,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poppins-bold'
  }
});