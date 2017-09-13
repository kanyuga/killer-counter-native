import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import baseStyles from "../utils/styles";
import {getCurrentBall, getCurrentPlayer, pointsLeft} from "../helpers";
import {hit, miss, portCurrentAndWhiteBall} from "../actions";
import {connect} from "react-redux";
import BallGrid from "./BallGrid";
import AppButton from "./AppButton";

class PlayActions extends Component {
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
            this.setState({ ballGridActive: false });
        }
    }

    showBallGrid = (legal) => {
        this.setState( {
          ballGridActive: true,
          ballGridLegal: legal
        });
    };

    hideBallGrid = () => {
        this.setState({
          ballGridActive: false
        })
    };

    render = () => (
        <View style={styles.playActions}>
            <View style={styles.buttonWrapper}>
                <AppButton
                  style={styles.button}
                  onPress={() => this.props.hit()}
                  title={'Hit'}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <AppButton
                  style={styles.button}
                  color={baseStyles.colors.primaryLight}
                  onPress={() => this.showBallGrid(true)}
                  title={'Port'}
                />
                { this.state.ballGridActive && this.state.ballGridLegal && <BallGrid legal={true}/> }
            </View>
            <View style={styles.buttonWrapper}>
                <AppButton
                  style={styles.button}
                  color={baseStyles.colors.secondaryLight}
                  onPress={() => this.props.miss()}
                  title={'Miss'}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <AppButton
                  style={styles.button}
                  color={baseStyles.colors.secondaryLight}
                  onPress={() => this.showBallGrid(false)}
                  title={'Foul Port'}
                />
              { this.state.ballGridActive && !this.state.ballGridLegal && <BallGrid legal={false} /> }
            </View>
            <View style={styles.buttonWrapper}>
                <AppButton
                  style={styles.button}
                  color={baseStyles.colors.secondaryLight}
                  onPress={() => this.props.portCurrentAndWhiteBall()}
                  title={`Port ${this.props.currentBall} followed by white ball`}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playActions: {

    },
    buttonWrapper: {
        marginHorizontal: 5
    },
    button: {
        margin: 5,
    }
});

const mapStateToProps = state => ({ currentBall: getCurrentBall(state.balls), currentPlayer: getCurrentPlayer(state.players), pointsLeft: pointsLeft(state.balls) });
const mapDispatchToProps = (dispatch) => ({
  hit: () => dispatch(hit()),
  miss: () => dispatch(miss()),
  portCurrentAndWhiteBall: () => dispatch(portCurrentAndWhiteBall())
});

PlayActions = connect(mapStateToProps, mapDispatchToProps)(PlayActions);

export default PlayActions;