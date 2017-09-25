import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlayLog from "./PlayLog";
import {undo} from "../../actions";
import {currentBallSelector, currentPlayerSelector, pointsLeftSelector} from "../../selectors";

let PlayLogContainer = (props) => (
  <PlayLog {...props} />
);

const mapStateToProps = state => ({
  playLog: state.playLog,
  currentBall: currentBallSelector(state),
  currentPlayer: currentPlayerSelector(state),
  pointsLeft: pointsLeftSelector(state)

});
const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(undo())
});

PlayLogContainer = connect(mapStateToProps, mapDispatchToProps)(PlayLogContainer);

export default PlayLogContainer;