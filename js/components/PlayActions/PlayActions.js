import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import baseStyles from "../../utils/styles";
import AppButton from "../common/AppButton";
import BallGridContainer from "./BallGridContainer";

const PlayActions = ({ballGridActive, ballGridLegal, hit, miss, portCurrentAndWhiteBall, currentBall, showBallGrid, ...props}) => (
  <View style={styles.playActions}>
    <View style={styles.buttonWrapper}>
      <AppButton
        style={styles.button}
        onPress={hit}
        title={'Hit'}
      />
    </View>
    <View style={styles.buttonWrapper}>
      <AppButton
        style={styles.button}
        color={baseStyles.colors.primaryLight}
        onPress={() => showBallGrid(true)}
        title={'Port'}
      />
      {ballGridActive && ballGridLegal && <BallGridContainer legal={true}/>}
    </View>
    <View style={styles.buttonWrapper}>
      <AppButton
        style={styles.button}
        color={baseStyles.colors.secondaryLight}
        onPress={miss}
        title={'Miss'}
      />
    </View>
    <View style={styles.buttonWrapper}>
      <AppButton
        style={styles.button}
        color={baseStyles.colors.secondaryLight}
        onPress={() => showBallGrid(false)}
        title={'Foul Port'}
      />
      {ballGridActive && !ballGridLegal && <BallGridContainer legal={false}/>}
    </View>
    <View style={styles.buttonWrapper}>
      <AppButton
        style={styles.button}
        color={baseStyles.colors.secondaryLight}
        onPress={portCurrentAndWhiteBall}
        title={`Port ${currentBall} followed by white ball`}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  playActions: {},
  buttonWrapper: {
    marginHorizontal: 5
  },
  button: {
    margin: 5,
  }
});

export default PlayActions;