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
  Navigator,
} = React;

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
Parse.initialize(
  'fqJrhjgv5uwpRrZgpHzW3l5U9GqelidCgNActEBw',
  'V5Q3KmrAWPUtLUdVeGlY3RFRsFhUngn2Sq5jtlPG'
);

var LoginScreen = require('./react/loginScreen.js');
var ProfileScreen = require('./react/profileScreen.js');
var BrowsingScreen = require('./react/browsingScreen.js');
// var RealtimeRCT = require('./react/RealtimeRCT.js');
var MessagingScreen = require('./react/messagingScreen.js');
// var RCTRealtimeMessaging = require('./RCTRealtimeMessagingIOS.js');

class Zodiac extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/Navigator/NavigatorExample.js
  _renderScene(route, nav) {
    // console.log(nav);
    var FallbackComponent = LoginScreen;
    var Component = FallbackComponent;
    switch (route.id) {
      case 'login':
        return <LoginScreen navigator={nav} />;
      case 'profile':
        return <ProfileScreen navigator={nav} />;
      case 'browsing':
        return <BrowsingScreen navigator={nav} />;
      case 'messaging':
        return <MessagingScreen navigator={nav} />;
    }
    return <Component navigator={nav} />;
  }

  // docs for Navigator: http://stackoverflow.com/questions/29335523/react-native-custom-navigation-with-navigator-component
  // v2 https://github.com/facebook/react-native/issues/3076
  render() {
    return (
      <Navigator
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        initialRoute={{
          name: 'Login',
          id: 'login',
          // component: LoginScreen
        }}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={this._renderScene}
     />
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
