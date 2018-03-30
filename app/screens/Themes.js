import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScrollView, StatusBar, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { ListItem, Separator } from "../components/List";
import { changePrimaryColor } from "../actions/theme";

const colorOptions = ["Blue", "Orange", "Green", "Purple"];

const colorsStyles = {};
for (let color of colorOptions) {
  colorsStyles[`$${color.toLowerCase()}`] = `$primary${color}`;
}
const styles = EStyleSheet.create(colorsStyles);

class Themes extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  };

  handleThemePress = color => {
    //console.log("handleThemePress OPTIONS", color);
    //this.props.navigation.navigate("Options", { color });
    this.props.dispatch(changePrimaryColor(color));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        {colorOptions.map((theme, index) => {
          return (
            <View key={index}>
              <ListItem
                text={theme}
                onPress={() =>
                  this.handleThemePress(styles[`$${theme.toLowerCase()}`])
                }
                selected
                checkMark={false}
                iconBackground={styles[`$${theme.toLowerCase()}`]}
              />
              <Separator />
            </View>
          );
        })}
        <Separator />
      </ScrollView>
    );
  }
}

// const mapStateToProps = state => ({
//   primaryColor: state.theme.primaryColor
// });

export default connect()(Themes);
