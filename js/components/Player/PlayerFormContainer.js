import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerForm from "./PlayerForm";
import {addPlayer, startGame} from "../../actions";

class PlayerFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleChange = (name) => {
    this.setState({ name: name });
  };

  handlePress = () => {
    this.props.addPlayer(this.state.name);
    this.setState({name: ''});
  };

  render() {
    return (
      <PlayerForm {...this.props } name={this.state.name} onSubmit={this.handlePress} handleChange={this.handleChange} />
    );
  }
}

const mapStateToProps = state => ({
  started: state.started,
  startable: state.players.length > 1
});

const mapDispatchToProps = dispatch => ({
  addPlayer: (name) => dispatch(addPlayer(name)),
  startGame: () => dispatch(startGame())
});

PlayerFormContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerFormContainer);

export default PlayerFormContainer;