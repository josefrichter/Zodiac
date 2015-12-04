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
  TouchableWithoutFeedback,
  Image,
} = React;


const {
  FBSDKGraphRequest,
  FBSDKAccessToken,
} = FBSDKCore;

const {
  FBSDKLoginButton,
} = FBSDKLogin;

var ProfileScreen = require('./profileScreen.js');

var currentuser;

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this._goToProfile = this._goToProfile.bind(this);
    this.state = {};
  }

  _goToProfile() {
    this._getProfilePic;
    this.props.navigator.push({
      title: "Profile",
      component: ProfileScreen,
      passProps: {} // TODO https://github.com/facebook/react-native/issues/1103
    });
  }

  _getProfilePic() {
      // we need to make one more request to get the token becase the token is not sent back in the login
      var fetchPorfilePicRequest = new FBSDKGraphRequest((error, result) => {
        if (error) {
          console.log(error);
          alert('Error making request.');
        } else {
          // Data from request is in result
          console.log(result);
          // this.setState({profile_pic_url: result.data.url});
          // console.log(this.state);

          var currentUser = Parse.User.currentAsync().then(
              (currentuser) =>  {
                  if (currentUser) {
                      // do stuff with the user
                      currentuser.set("profilePictureUrl", result.data.url);
                      currentuser.save();
                      console.log(currentuser);
                  } else {
                      // show the signup or login page
                      alert("cannot get currentuser");
                  }
              }

          );


        }
      }, '/me/picture?type=large&redirect=false');
      // Start the graph request.
      fetchPorfilePicRequest.start();
  }

  _onPressFBLoginButton() {
      // we need to make one more request to get the token becase the token is not sent back in the login
      var fetchMeRequest = new FBSDKGraphRequest((error, result) => {
        if (error) {
          alert('Error making request.');
        } else {
          // Data from request is in result
          console.log(result);
          FBSDKAccessToken.getCurrentAccessToken((token) => {
            console.log(token);
            // this.setState({access_token: token.tokenString});
            this._afterFBLoginButton(token);

          });

        }
      }, '/me?fields=id,first_name,name,birthday,gender,email');
      // Start the graph request.
      fetchMeRequest.start();
  }

  _afterFBLoginButton(credentials) {

    // the timestamp needs to be reformatted for Parse http://stackoverflow.com/questions/12945003/format-date-as-yyyy-mm-ddthhmmss-sssz
    var expdate = new Date(credentials._expirationDate);
    expdate = expdate.toISOString();

    // these are the data from the successful FB login we will pass to Parse.FacebookUtils.logIn instead of null
    let authData = {
      id: credentials.userID,
      access_token: credentials.tokenString,
      expiration_date: expdate
    };

    Parse.FacebookUtils.logIn(authData, {
      success: function(user) {
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
        currentuser = user;
        this._goToProfile;
      },
      error: function(user, error) {
        console.log(user,error);
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
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
                // alert('Logged in.');
                this._onPressFBLoginButton();
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={['public_profile', 'email']}
          publishPermissions={[]}/>

          <TouchableWithoutFeedback
            onPress={this._goToProfile.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Testing - Go to ProfileScreen</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={this._getProfilePic.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Testing - Get profile pic</Text>
            </View>
          </TouchableWithoutFeedback>

          <Image
            style={styles.profilepic}
            source={{uri: this.state.profile_pic_url}}
          />

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
  button: {
    backgroundColor: "#009DDD",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#fff"
  },
});

module.exports = LoginScreen;
