import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayActions from "./PlayActions";
import {getCurrentBall, getCurrentPlayer, pointsLeft} from "../../helpers";
import {hit, miss, portCurrentAndWhiteBall} from "../../actions";
import {currentBallSelector, currentPlayerSelector, pointsLeftSelector} from "../../selectors";

class PlayActionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballGridActive: false,
      ballGridLegal: true
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.currentBall !== nextProps.currentBall
      || this.props.currentPlayer !== nextProps.currentPlayer
      || this.props.pointsLeft !== nextProps.pointsLeft ) {
      this.hideBallGrid();
    }
  }

  showBallGrid = (legal) => {
    this.setState({
      ballGridActive: true,
      ballGridLegal: legal
    });
  };

  hideBallGrid = () => {
    this.setState({
      ballGridActive: false
    })
  };

  render() {
    return (
      <PlayActions { ...this.props } { ...this.state } showBallGrid={this.showBallGrid} />
    );
  }
}

const mapStateToProps = state => ({
  currentBall: currentBallSelector(state),
  currentPlayer: currentPlayerSelector(state),
  pointsLeft: pointsLeftSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  hit: () => dispatch(hit()),
  miss: () => dispatch(miss()),
  portCurrentAndWhiteBall: () => dispatch(portCurrentAndWhiteBall())
});

PlayActionsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayActionsContainer);

export default PlayActionsContainer;