import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import {database} from '../firebase';
import ListItem from './ListItem';

export default class PaymentMethod extends React.Component {
  render() {
    const { method, total } = this.props;

    return (
      <TouchableOpacity key={Math.random()} style={styles.btnContainer} onPress={this.pay.bind(this)}>
        <Text style={styles.text}>{"Pay " + total+ "€ with " + method}</Text>
      </TouchableOpacity>
    );
  }

  pay() {
    const { method, total } = this.props;
    switch (method) {
      case "paypal":
          Linking.openURL('http://paypal.me/sergensen/'+total);
        break;
      case "cash":
          alert("This payment method is currently not avaiable!")
      break;
      default:
    }
  }
}

const styles = {
  btnContainer: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: 25
  }
};
