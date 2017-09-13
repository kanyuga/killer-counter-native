import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

const AppText = ({style = {}, children, ...props}) => (<Text {...props} style={[styles.text, style]}> {children} </Text>);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#fff'
  }
});

export default AppText;