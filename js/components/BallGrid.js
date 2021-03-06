import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {foulPort, port} from "../actions";
import {connect} from "react-redux";
import baseStyles from "../utils/styles";
import AppButton from "./AppButton";

let BallGrid = (props) => {
    let numbers = Object.keys(props.balls);
    numbers = [ ...numbers.slice(2), ...numbers.slice(0, 2)];
    return (
        <View style={styles.container}>
            {numbers.map((number) => {
                let ball = props.balls[number];
                return (
                  <View key={ball.number} style={styles.ballContainer}>
                    <AppButton
                      disabled = {!ball.active}
                      backgroundColor = {!ball.active ? '#333' : props.legal ? baseStyles.colors.primaryDark : baseStyles.colors.secondaryDark}
                      title = { ball.number }
                      style = { styles.ballWrapper }
                      onPress = {() => props.onPress(ball.number)}
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
      height: 40,
      width: 40,
      borderRadius: 50,
      marginVertical: 5,
      marginHorizontal: 10
    }
});

const mapStateToProps = state => ({ balls: state.balls });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: number => ownProps.legal ? dispatch(port(number)) : dispatch(foulPort(number))
});

BallGrid = connect(mapStateToProps, mapDispatchToProps)(BallGrid);

export default BallGrid;

