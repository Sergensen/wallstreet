import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class ListItem extends React.Component {
  addToCart() {
    const { item, price, addToCart } = this.props;
    this.props.addToCart(item, price);
  }

  render() {
    const { item, price } = this.props;
    return (
      <TouchableOpacity style={styles.textContainer} onPress={this.addToCart.bind(this)}>
        <Text style={styles.text}>{item+ ":"}</Text>
        <Text style={styles.text}>{price+"€"}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  textContainer: {
    flex: 1,
    height: 15,
    justifyContent: "space-between",
    flexDirection: "row"
  }
};
