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
          this.setState({profile_pic_url: currentuser.attributes.profilepic});
          console.log(currentuser.attributes.profilepic);
          console.log(this.state.profile_pic_url);
      }
    )
  }

  _goBack() {
    this.props.navigator.pop();
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
  }
});

module.exports = ProfileScreen;
