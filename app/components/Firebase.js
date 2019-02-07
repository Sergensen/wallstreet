import firebase from 'firebase';
import React from 'react';
import { View, Button } from 'react-native';


export default class Firebase extends React.Component {
  componentDidMount() {
    this.test();
  }

  test(){

  }

  render() {
    return (
      <Button
        title="Scan another"
        onPress={() => {}}
      />
    );
  }
}
