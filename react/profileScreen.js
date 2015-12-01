'use strict';

const React = require('react-native');

const {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableWithoutFeedback,
} = React;

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _goBack() {
    this.props.navigator.pop();
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
        <TouchableWithoutFeedback
          onPress={this._goBack.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Testing - Go to ProfileScreen</Text>
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
});

module.exports = ProfileScreen;
