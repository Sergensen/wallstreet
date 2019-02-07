import React from 'react';
import { Text, View } from 'react-native';
import {database} from '../firebase';
import ListItem from './ListItem';

export default class Cart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.getTotal()}
      </View>
    );
  }

  getTotal() {
    const { cart } = this.props;
    let total = 0;
    for(let key in cart) {
      const { count, price } = cart[key];
      total += count*price;
    }

    return <Text style={styles.text}>{"Total:" + total+"€"}</Text>;
  }
}

const styles = {
  container: {
    flex: 1
  },
  text: {
    fontSize: 25
  }
};
