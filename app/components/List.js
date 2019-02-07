import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {database} from '../firebase';
import ListItem from './ListItem';
import Cart from './Cart';

export default class List extends React.Component {
  render() {
    const { data, cart, remove, order } = this.props;
    return (
      <View style={styles.container}>
        <Text>{data.store+ " - Tisch: " + data.desk}</Text>
        {this.getItems()}
        <View style={styles.footer}>
          <Cart cart={cart} remove={remove} />
          <TouchableOpacity onPress={order.bind(this)}>
            <Text style={styles.header}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  getItems() {
    const { menu, addToCart } = this.props;
    let categorys = [];
    for(let category in menu) {
      categorys.push(<Text style={styles.header} key={Math.random()}>{category}</Text>);
      for(let item in menu[category]) categorys.push(<ListItem key={Math.random()} addToCart={addToCart} item={item} price={menu[category][item]} />);
    }
    return categorys;
  }
}

const styles = {
  container: {
    flex: 1
  },
  header: {
    fontSize: 20
  },
  footer: {
    flexDirection: "row",
    flex: 1
  }
};
