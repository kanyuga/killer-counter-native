import React, { Component } from 'react';
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import AppText from './AppText';

let LeaderBoard = ({players}) => {
  players = players.slice();
  players.sort((a, b) => b.score - a.score);
  return <View style = {styles.container}>
    { players.map((player, index) => (
      <View key={index} style={ styles.row }>
        <AppText style={{flex: 4}} >{player.name}</AppText>
        <AppText style={{flex: 1, textAlign: 'right', marginRight: 10}} >{player.score}</AppText>
      </View>
      ))
    }
  </View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  }
});

const mapStateToProps = state => ({
  players: state.players
});

const mapDispatchToProps = dispatch => ({

});

LeaderBoard = connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);

export default LeaderBoard;