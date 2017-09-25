import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import {deletePlayer} from "../../actions";

let PlayerListContainer = ({players, sort, ...props}) => {
  if (sort === 'score') {
    players = players.slice();
    players.sort((a, b) => (b.score - a.score));
  }
  return (
    <PlayerList {...props} players={players} />
  );
};

PlayerListContainer.defaultProps = {
  sort: 'orderOfPlay',
};

PlayerListContainer.propTypes = {
  sort: PropTypes.oneOf(['orderOfPlay', 'score'])
};

const mapStateToProps = state => ({
  players: state.players,
  started: state.started
});

const mapDispatchToProps = dispatch => ({
  onDelete: index => dispatch(deletePlayer(index))
});

PlayerListContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerListContainer);

export default PlayerListContainer;