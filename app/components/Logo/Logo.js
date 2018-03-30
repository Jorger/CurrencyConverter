import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  Text,
  Keyboard,
  Animated,
  Platform
} from "react-native";
import styles from "./styles";
const ANIMATION_DURATION = 250;

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.containerImageWith = new Animated.Value(styles.$largeContainerSize);
    this.imageWith = new Animated.Value(styles.$largeImageSize);
    this.keyboardShow = this.keyboardShow.bind(this);
    this.keyboardHide = this.keyboardHide.bind(this);
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      this.keyboardShow
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      this.keyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardShow() {
    Animated.parallel([
      Animated.timing(this.containerImageWith, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageWith, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  }

  keyboardHide() {
    Animated.parallel([
      Animated.timing(this.containerImageWith, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.imageWith, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  }

  render() {
    const containerImageStyle = [
      styles.containerImage,
      { width: this.containerImageWith, height: this.containerImageWith }
    ];

    const imageStyle = [
      styles.image,
      { width: this.imageWith, height: this.imageWith },
      this.props.tintColor ? { tintColor: this.props.tintColor } : null
    ];

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Animated.Image
            resizeMode="contain"
            style={containerImageStyle}
            source={require("./images/background.png")}
          />
          <Animated.Image
            resizeMode="contain"
            source={require("./images/logo.png")}
            style={imageStyle}
          />
        </View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;
