import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native';
import AppButton from "../common/AppButton";


const PlayerForm = (props) => (
  <View style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
    <TextInput
      style={{paddingVertical: 10, color: '#ccc'}}
      placeholder="Enter Player Name"
      placeholderTextColor="#aaa"
      value={props.name}
      onChangeText={props.handleChange}
      onSubmitEditing={props.onSubmit}
      blurOnSubmit={false}
      returnKeyType="done"
      autoFocus
    />
    <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
      <View style={{flex: 1, marginRight: 2}}>
        <AppButton
          onPress={props.onSubmit}
          title="Add Player"
          disabled={!props.name.trim()}
        />
      </View>
      {!props.started && props.startable &&
      <View style={{flex: 1, marginLeft: 2}}>
        <AppButton
          onPress={props.startGame}
          title="Start Game"
        />
      </View>
      }
    </View>
  </View>
);

PlayerForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
  startable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default PlayerForm;