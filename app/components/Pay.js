import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {database} from '../firebase';
import PaymentMethod from './PaymentMethod';

export default class Pay extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{"Total:" + this.getTotal() +"€"}</Text>
        {this.getItems()}
        {this.getPaymentMethods()}
      </View>
    );
  }

  getTotal() {
    const { cart } = this.props;
    let total = 0;
    for(let key in cart) total += cart[key].count*cart[key].price;
    return total;
  }

  getItems() {
    const { cart } = this.props;
    let items = [];
    for(let key in cart) items.push(
      <Text key={Math.random()} style={styles.items}>{cart[key].count + "x " + key+": " + cart[key].count*cart[key].price + "€"}</Text>
    );
    return items;
  }

  getPaymentMethods() {
    const { payment } = this.props;
    let items = [];
    payment.forEach(method => items.push(<PaymentMethod key={Math.random()} total={this.getTotal()} method={method} />));
    return items;
  }
}

const styles = {
  container: {
    flex: 1
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: 25
  },
  items: {
    fontSize: 20
  }
};
