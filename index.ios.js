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
  NavigatorIOS,
} = React;

var LoginScreen = require('./react/loginScreen.js');

class Zodiac extends Component {
  render() {
    return (
      <NavigatorIOS ref="nav"
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        initialRoute={{
          title: "Login",
          component: LoginScreen,
          passProps: {
            toggleNavBar: this.toggleNavBar,
          }
        }} />
    );
  }
}

var styles = StyleSheet.create({
  navWrap: {
    flex: 1,
    marginTop: 64
  },
  nav: {
    flex: 1,
  },
  button: {
    backgroundColor: "#009DDD",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#fff"
  }
});


AppRegistry.registerComponent('Zodiac', () => Zodiac);
