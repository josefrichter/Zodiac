'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Component,
  PanResponder, } from 'react-native';
import clamp from 'clamp';

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);

var Id = require('parse-react/lib/react-native/Id');


var People = [
  'red',
  'green',
  'blue',
  'purple',
  'orange',
]

var SWIPE_THRESHOLD = 120;

// taken from https://github.com/brentvatne/react-native-animated-demo-tinder
class BrowsingScreen extends ParseComponent {

  constructor() {
    super();

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: {attributes: {firstName: 'empty'}},
    }

    this.componentWillMount = this.componentWillMount.bind(this)
    this._handleYes = this._handleYes.bind(this)
  }

  // By extending ParseComponent, it is possible to observe queries
  observe(props, state) {
    // var query = new Parse.Query('User');
    // query.equalTo("gender", "female").limit(5);  // find all the women
    // console.log(query);
    // console.log('props', props);
    return {
      users: new Parse.Query('User')
    }
    // console.log('props', props);
  }

  _goToNextPerson() {
    let currentPersonIdx = People.indexOf(this.state.person);
    let newIdx = currentPersonIdx + 1;

    this.setState({
      person: People[newIdx > People.length - 1 ? 0 : newIdx]
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {

    var query = new Parse.Query('User');
    query.equalTo("gender", "Female").limit(15);  // find all the women
    // console.log(query);
    // console.log('this', this);
    // var _this = this;
    query.find({
      success: (object) => {
        // Successfully retrieved the object.
        console.log('query response:', object);
        People = object
        this.setState({person: People[0]});
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
          if (this.state.pan.x._value > 0) {
              console.log('yes');
              this._handleYes();
          } else {
            console.log('no');
          }

        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextPerson();
    this._animateEntrance();
  }

  _handleYes() {
      // add shown person's ID to yeses
      var me = new Id('_User', Parse.User.current().id);
      // dunno why this was needed, taken from https://github.com/wdragon/Teamz/blob/dc5ea4f52423fcb572bc158f77c70f741f1f8930/js/GroupCreateModal.react.js
      ParseReact.Mutation.AddUnique(me, 'yeses', this.state.person.id).dispatch();

      // check match
      // console.log(this.state.person);
      // console.log(String(Parse.User.current().id));
      // console.log('not undefined?', typeof(this.state.person.yeses) !== 'undefined')
      if (typeof(this.state.person.attributes.yeses) !== 'undefined') {
          // console.log(this.state.person.attributes.yeses);
          if (this.state.person.attributes.yeses.includes(String(Parse.User.current().id))) {
            console.log("it's a match!");
          }
      }

  }

  render() {
    // console.log(this.state.person);
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>

        <Animated.View style={[styles.card, animatedCardStyles, {backgroundColor: 'red'}]} {...this._panResponder.panHandlers}>
          <Image
            source={{uri: this.state.person.attributes.profilePictureUrl}}
            style={styles.profilepic}
          />
          <Text style={styles.yupText}>{this.state.person.attributes.firstName}</Text>
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>Nope!</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Yup!</Text>
        </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },
  profilepic: {
      margin: 10,
      width: 200,
      height: 200,
  },
});

module.exports = BrowsingScreen;
