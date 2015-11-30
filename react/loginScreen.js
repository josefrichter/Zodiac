/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const FBSDKCore = require('react-native-fbsdkcore');
const FBSDKLogin = require('react-native-fbsdklogin');

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

Parse.initialize(
  'fqJrhjgv5uwpRrZgpHzW3l5U9GqelidCgNActEBw',
  'V5Q3KmrAWPUtLUdVeGlY3RFRsFhUngn2Sq5jtlPG'
);

const {
  StyleSheet,
  Text,
  View,
  Component,
} = React;


const {
  FBSDKGraphRequest,
} = FBSDKCore;

const {
  FBSDKLoginButton,
} = FBSDKLogin;

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Log in
        </Text>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                console.log(result);
                alert('Logged in.');

                var fetchMeRequest = new FBSDKGraphRequest((error, result) => {
                  if (error) {
                    alert('Error making request.');
                  } else {
                    // Data from request is in result
                    console.log(result);
                    // TODO save to Parse
                  }
                }, '/me?fields=id,first_name,name,birthday,gender,email');
                // Start the graph request.
                fetchMeRequest.start();
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={['public_profile', 'user_birthday', 'email']}
          publishPermissions={['publish_actions']}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = LoginScreen;
