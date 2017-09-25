import React, { Component } from 'react';
import {connect} from "react-redux";
import * as Actions from "../../actions";
import App from "./App";
import {getMaxScore} from "../../helpers";
import {gameOverSelector} from "../../selectors";

class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerModalActive: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.started && (!this.props.started || nextProps.players.length !== this.props.players.length)) {
      this.setState({playerModalActive: false});
    }
    if (!nextProps.started && nextProps.players.length === 0) {
      this.setState({playerModalActive: true});
    }
  };

  togglePlayerModal = () => {
    this.setState(prevState => ({ playerModalActive: !prevState.playerModalActive }));
  };

  winner = () => {
    const maxScore = getMaxScore(this.props.players);
    return this.props.players.filter(player => player.score === maxScore)[0];
  };

  resetGame = () => {
    this.props.resetGame();
  };

  render = () => (
    <App
      {...this.props}
      { ...this.state }
      togglePlayerModal={this.togglePlayerModal}
      resetGame={this.props.resetGame}
    />
  );
}


const mapStateToProps = state => ({
  ...state,
  gameOver: gameOverSelector(state)
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(Actions.startGame()),
  resetGame: () => dispatch(Actions.newGame()),
  undo: () => dispatch(Actions.undo())
});

AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default AppContainer;