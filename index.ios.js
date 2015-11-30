/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
} = React;

const LoginScreen = require('./react/loginScreen.js');

class Zodiac extends Component {
  render() {
    return (
        <LoginScreen/>
    );
  }
}

AppRegistry.registerComponent('Zodiac', () => Zodiac);
