import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FlatList, StatusBar, View } from "react-native";
import currencies from "../data/currencies";
import { ListItem, Separator } from "../components/List";
import { changeBaseCurrency, changeQuoteCurrency } from "../actions/currencies";

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string
  };

  handlePress = currency => {
    const { type } = this.props.navigation.state.params;
    this.props.dispatch(
      type === "base"
        ? changeBaseCurrency(currency)
        : changeQuoteCurrency(currency)
    );
    this.props.navigation.goBack(null);
  };

  render() {
    const currentCurrency =
      this.props.navigation.state.params.type === "base"
        ? this.props.baseCurrency
        : this.props.quoteCurrency;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={currencies}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === currentCurrency}
              onPress={() => this.handlePress(item)}
              iconBackground={this.props.primaryColor}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { baseCurrency, quoteCurrency } = state.currencies;
  const { primaryColor } = state.theme;
  return {
    baseCurrency,
    quoteCurrency,
    primaryColor
  };
};

export default connect(mapStateToProps)(CurrencyList);
