import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import Icon from "./Icon";
import PropTypes from "prop-types";
import styles from "./styles";

const ListItem = ({
  text,
  onPress,
  selected = false,
  checkMark = true,
  visible = true,
  customIcon = null,
  iconBackground
}) => (
  <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      {selected ? (
        <Icon
          checkMark={checkMark}
          visible={visible}
          iconBackground={iconBackground}
        />
      ) : (
        <Icon />
      )}
      {customIcon}
    </View>
  </TouchableHighlight>
);

ListItem.prototype = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  checkMark: PropTypes.bool,
  visible: PropTypes.bool,
  customIcon: PropTypes.element,
  iconBackground: PropTypes.string
};

export default ListItem;

// {selected && <Icon />}
