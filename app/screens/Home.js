import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import { Container } from "../components/Container";
import { Logo } from "../components/Logo";
import { InputWithButton } from "../components/TextInput";
import { ClearButton } from "../components/Buttons";
import { LastConverted } from "../components/Text";
import { Header } from "../components/Header";
import { connectAlert } from "../components/Alert";

import {
  swapCurrency,
  changeCurrencyAmount,
  getInitialConversion
} from "../actions/currencies";

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currencyError &&
      nextProps.currencyError !== this.props.currencyError
    ) {
      this.props.alertWithType("error", "Error", nextProps.currencyError);
    }
  }

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate("CurrencyList", {
      title: "Base Currency",
      type: "base"
    });
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate("CurrencyList", {
      title: "Quote Currency",
      type: "quote"
    });
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate("Options");
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleTextChange = text => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  render() {
    let quotePrice = this.props.isFetching
      ? "..."
      : (this.props.amount * this.props.conversionRate).toFixed(2);
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            editable={false}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            date={this.props.lastConvertedDate}
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton
            text="Reverse currencies"
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { baseCurrency, quoteCurrency, amount } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const { rates = {}, isFetching } = conversionSelector;
  const { primaryColor } = state.theme;
  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching,
    lastConvertedDate: conversionSelector.date
      ? new Date(conversionSelector.date)
      : new Date(),
    primaryColor,
    currencyError: state.currencies.error
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
