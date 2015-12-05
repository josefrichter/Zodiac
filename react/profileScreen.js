'use strict';

const React = require('react-native');
const FBSDKCore = require('react-native-fbsdkcore');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');


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
} = FBSDKCore;

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var currentUser = Parse.User.currentAsync().then(
      (currentuser) => {
          this.setState({profile_pic_url: currentuser.attributes.profilePictureUrl});
      }
    )
  }

  _goBack() {
    this.props.navigator.pop();
  }

  _goBrowsing() {
    this.props.navigator.push({
      title: "Browse",
      id: "browsing",
      // component: BrowsingScreen,
      passProps: {} // TODO https://github.com/facebook/react-native/issues/1103
    });
  }

  render () {
    return (
      <View style={styles.container}>

        <Image
          style={styles.profilepic}
          source={{uri: this.state.profile_pic_url}}
        />

        <Text style={styles.welcome}>
          Profile
        </Text>

        <TouchableWithoutFeedback
          onPress={this._goBack.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Testing - Go back</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={this._goBrowsing.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profile ready - let's go!</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCF5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  profilepic: {
      margin: 10,
      width: 200,
      height: 200,
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

module.exports = ProfileScreen;
