import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Container from './Container';

export default class Main extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    data: null
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned, data } = this.state;

    if (hasCameraPermission === null) return <Text>Requesting for camera permission</Text>;
    if (hasCameraPermission === false) return <Text>No access to camera</Text>;

    return (
      <View style={{ flex: 1, justifyContent: "center"}}>
        <StatusBar hidden />

        {!scanned &&
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        }

        {scanned &&
          <Container
            unlock={() => {
              this.setState({ scanned: false });
            }}
            data={data}
          />
        }
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, data });
  }
}
