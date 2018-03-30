import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView, StatusBar, Platform, Linking } from "react-native";
import { ListItem, Separator } from "../components/List";
import { connectAlert } from "../components/Alert";
import { Ionicons } from "@expo/vector-icons";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";
const ICON_COLOR = "#868686";
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func
  };
  handleThemePress = () => {
    this.props.navigation.navigate("Themes");
  };

  handleSitePress = () => {
    Linking.openURL("https://twitter.com/ostjh").catch(() =>
      this.props.alertWithType("error", "Error", "Error al abrir la página")
    );
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemePress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text="@ostjh"
          onPress={this.handleSitePress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-link`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default connectAlert(Options);
