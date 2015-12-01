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

var LoginScreen = require('./react/loginScreen.js');

class Zodiac extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // docs for Navigator: http://stackoverflow.com/questions/29335523/react-native-custom-navigation-with-navigator-component
  render() {
    return (
      <Navigator
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        initialRoute={{name: 'Login', component: LoginScreen}}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
            // count the number of func calls
            console.log(route, navigator);

            if (route.component) {
                return React.createElement(route.component, { navigator });
            }
        }}
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
