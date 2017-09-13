import React, {Component} from 'react';
import {Platform, Text, TouchableNativeFeedback, TouchableOpacity, StyleSheet, View} from "react-native";

export default class AppButton extends Component {

  static defaultProps = {
    backgroundColor: '#1B2836',
    color: '#ccc'
  };

  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        {...{...this.props, style: {}}}
      >
        <View style={[{
          backgroundColor: this.props.backgroundColor,
          ...StyleSheet.flatten(styles.textWrapper)
        }, this.props.style]}>
          <Text style={{ color: this.props.color }}>{this.props.title}</Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});