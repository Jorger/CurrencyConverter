import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import color from "color";
import styles from "./styles";

const InputWithButton = props => {
  const { onPress, buttonText, defaultValue, editable = true } = props;
  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier
  );
  const containerStyles = [styles.container];
  if (!editable) {
    containerStyles.push(styles.containerDisabled);
  }
  const buttonTextStyles = [styles.buttonText];
  if (props.textColor) {
    buttonTextStyles.push({
      color: props.textColor
    });
  }
  return (
    <View style={containerStyles}>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <Text style={buttonTextStyles}>{buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.border} />
      <TextInput
        underlineColorAndroid="transparent"
        style={styles.input}
        {...props}
      />
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  textColor: PropTypes.string
};

export default InputWithButton;
