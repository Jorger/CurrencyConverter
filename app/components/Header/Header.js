import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

const Header = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("./images/gear.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
);

Header.prototype = {
  onPress: PropTypes.func
};

export default Header;
