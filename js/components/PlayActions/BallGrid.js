import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import baseStyles from "../../utils/styles";
import AppButton from "../common/AppButton";

let BallGrid = (props) => {
  let numbers = Object.keys(props.balls);
  numbers = [...numbers.slice(2), ...numbers.slice(0, 2)];
  return (
    <View style={styles.container}>
      {numbers.map((number) => {
        let ball = props.balls[number];
        return (
          <View key={ball.number} style={styles.ballContainer}>
            <AppButton
              disabled={!ball.active}
              backgroundColor={!ball.active ? '#333' : props.legal ? baseStyles.colors.primaryDark : baseStyles.colors.secondaryDark}
              title={ball.number}
              style={styles.ballWrapper}
              onPress={() => props.onPress(ball.number)}
            />
          </View>
        )
      })}
    </View>
  );
};

BallGrid.propTypes = {
  balls: PropTypes.objectOf(PropTypes.shape()).isRequired,
  legal: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  ballContainer: {
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ballWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 50,
    marginVertical: 5,
    marginHorizontal: 10
  }
});

export default BallGrid;

