import React from 'react';
import { View } from 'react-native';
import {database} from '../firebase';
import List from './List';
import Pay from './Pay';

export default class Container extends React.Component {
  state = {
    ordered: false,
    menu: {},
    cart: {},
    data: {},
    payment: {}
  }

  componentDidMount(){
    this.fetchMenu();
    this.sitDown();
  }

  order() {
    this.setState({ordered: true});
  }

  addToCart(item, price) {
    const { cart } = this.state;
    if(cart[item]) {
      cart[item].count++;
    } else {
      cart[item] = {count:1, price}
    }
    this.setState({cart});
  }

  remove(itemName) {
    const { cart } = this.state;
    if(cart[itemName].count===1) {
      delete cart[itemName];
    } else {
      cart[itemName].count--;
    }
    this.setState({cart});
  }

  fetchMenu() {
    const data = JSON.parse(this.props.data);
    database.ref(data.store).on("value", (snap) => {
      this.setState({ menu: snap.val().products, data, payment: snap.val().payment });
    });
  }

  sitDown() {
    const data = JSON.parse(this.props.data);
    const user = database.ref(data.store+"/desks/"+data.desk+"/Sergen Sentuerk");
    user.set({
        status: "ordering",
        total: 0,
        paid: false
    });
  }

  render() {
    const { ordered, menu, cart, data, payment } = this.state;
    return (
      <View style={styles.container}>
        {!ordered &&
          <List
            remove={this.remove.bind(this)}
            addToCart={this.addToCart.bind(this)}
            menu={menu}
            data={data}
            cart={cart}
            order={this.order.bind(this)}
          />}
        {ordered && <Pay data={data} cart={cart} payment={payment} /> }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  }
};
