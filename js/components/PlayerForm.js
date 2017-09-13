import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput} from 'react-native';
import {connect} from "react-redux";
import {addPlayer, startGame} from "../actions";
import AppButton from "./AppButton";


class PlayerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
    }

    handlePress = () => {
        this.props.onSubmit(this.state.name);
        this.setState({ name: '' });
    };

    render () {
        return (
            <View style={{display: 'flex', flexDirection: 'column', width : '100%'}}>

              <TextInput
                  style={{paddingVertical: 10, color: '#ccc'}}
                  placeholder="Enter Player Name"
                  placeholderTextColor="#aaa"
                  value={this.state.name}
                  onChangeText={(name) => this.setState({name})}
                  onSubmitEditing={this.handlePress}
                  blurOnSubmit={false}
                  returnKeyType="done"
                  autoFocus
                />
                <View style={{display: 'flex', flexDirection: 'row', width : '100%', justifyContent: 'space-around'}}>
                  <View style={{ flex: 1, marginRight: 2}}>
                    <AppButton
                      onPress={this.handlePress}
                      title="Add Player"
                      disabled={!this.state.name.trim()}
                    />
                  </View>
                  { !this.props.started && this.props.startable &&
                    <View style={{ flex: 1, marginLeft: 2}}>
                      <AppButton
                        onPress={this.startGame}
                        title="Start Game"
                      />
                    </View>
                  }
                </View>
            </View>
        )
    }
}

PlayerForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

PlayerForm = connect(
  state => ({ started: state.started, startable: state.players.length > 1}),
  dispatch => ({
    onSubmit: (name) => dispatch(addPlayer(name)),
    startGame: () => dispatch(startGame())
  }))
(PlayerForm);

export default PlayerForm;