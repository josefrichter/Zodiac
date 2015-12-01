/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const FBSDKCore = require('react-native-fbsdkcore');
const FBSDKLogin = require('react-native-fbsdklogin');

// var Parse = require('parse').Parse;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

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
  FBSDKAccessToken,
} = FBSDKCore;

const {
  FBSDKLoginButton,
} = FBSDKLogin;

class LoginScreen extends Component {

  // _saveToParse(data) {
  //     Parse.User._logInWith('facebook', {
  //       authData: {
  //         id: data.userID, // FB_USER_ID
  //         access_token: data.tokenString, // USER_ACCESS_TOKEN
  //         expiration_date: data._expirationDate // TOKEN_EXPIRATION_DATE
  //       }
  //     });
  // },

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

                    var myToken;

                    FBSDKAccessToken.getCurrentAccessToken((token) => {
                      console.log(token);
                      // myToken = token;

                      // saveToParse(token);
                      Parse.User._logInWith('facebook', {
                        authData: {
                          id: token.userID, // FB_USER_ID
                          access_token: token.tokenString, // USER_ACCESS_TOKEN
                          expiration_date: token._expirationDate // TOKEN_EXPIRATION_DATE
                        }
                      });

                      // Parse.User._linkWith('facebook', {
                      //   authData: {
                      //     id: token.userID, // FB_USER_ID
                      //     access_token: token.tokenString, // USER_ACCESS_TOKEN
                      //     expiration_date: token._expirationDate // TOKEN_EXPIRATION_DATE
                      //   }
                      // });

                    });
                    // TODO save to Parse
                    // Parse.FacebookUtils.init({ // this line replaces FB.init({
                    //   appId      : '407258446137661', // Facebook App ID
                    //   status     : false,  // check Facebook Login status
                    //   cookie     : false,  // enable cookies to allow Parse to access the session
                    //   xfbml      : false,  // initialize Facebook social plugins on the page
                    //   version    : 'v2.3' // point to the latest Facebook Graph API version
                    // });
                    //
                    // Parse.FacebookUtils.logIn(null, {
                    //   success: function(user) {
                    //     if (!user.existed()) {
                    //       alert("User signed up and logged in through Facebook!");
                    //     } else {
                    //       alert("User logged in through Facebook!");
                    //     }
                    //   },
                    //   error: function(user, error) {
                    //     alert("User cancelled the Facebook login or did not fully authorize.");
                    //   }
                    // });

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
