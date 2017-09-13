import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';

import PlayerList from './PlayerList';
import PlayerForm from './PlayerForm';
import PlayActions from './PlayActions';
import baseStyles from "../utils/styles";
import PlayerModal from "./PlayerModal";
import {getCurrentBall, getCurrentPlayer, getMaxScore, pointsLeft} from "../helpers";
import * as Actions from "../actions";
import {connect} from "react-redux";
import AppTabs from "./AppTabs";
import LeaderBoard from "./LeaderBoard";
import AppButton from "./AppButton";
import AppText from "./AppText";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          playerModalActive: false
        };
    }

    componentWillReceiveProps = (nextProps) => {
      if (this.state.started && nextProps.players.length !== this.props.players.length) {
        this.setState({playerModalActive: false});
      }
    };

    togglePlayerModal = () => {
        this.setState(prevState => ({ playerModalActive: !prevState.playerModalActive }));
    };

    gameOver = () => {
        return pointsLeft(this.props.balls) === 0;
    };

    winner = () => {
        const maxScore = getMaxScore(this.props.players);
        return this.props.players.filter(player => player.score === maxScore)[0];
    };

    resetGame = () => {
        this.props.dispatch(Actions.newGame());
    };

    render() {
        const playerForm = <PlayerForm />;
        return (
            <View style={styles.container}>
              <StatusBar barStyle="light-content"></StatusBar>
                { this.state.playerModalActive &&
                  <PlayerModal onRequestClose={this.togglePlayerModal}>{playerForm}</PlayerModal>
                }
                { this.props.started &&
                  (<View>
                    {this.gameOver() ?
                      <AppText style={{color: '#ccc', textAlign: 'center'}}>
                          {`Winner: ${this.winner().name}`}
                      </AppText> :
                      <View style={{ marginHorizontal: 10, paddingVertical: 5, backgroundColor: '#222'}}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                          <AppText style={{flex: 1, textAlign: 'center', fontSize: 12}}>Current Player</AppText>
                          <AppText style={{flex: 1, textAlign: 'center', fontSize: 12}}>Current Ball</AppText>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                          <AppText style={{flex: 1, textAlign: 'center'}}>{this.props.players[getCurrentPlayer(this.props.players)].name}</AppText>
                          <AppText style={{flex: 1, textAlign: 'center'}}>{getCurrentBall(this.props.balls)}</AppText>
                        </View>
                      </View>
                    }
                    {!this.gameOver() && <PlayActions/>}
                  </View>)

                }
                <AppTabs>
                  <PlayerList tabLabel="Players"/>
                  <LeaderBoard/>
                  <View tabLabel="Log">
                    {this.props.playLog.map((log, index) => (
                      <AppText
                        key={index}
                        style = {{ padding: 10,
                          color : log.type === 'success'
                            ? baseStyles.colors.primaryLight
                            : log.type === 'fail' ? baseStyles.colors.secondaryLight : 'white'}}>
                        {index + 1}: {log.log}
                      </AppText>
                    ))}
                    {this.props.playLog.length > 0 &&
                    <AppButton
                      onPress={() => this.props.dispatch(Actions.undo())}
                      style={{marginHorizontal: 10}}
                      title="Undo"
                    />
                    }
                  </View>
                </AppTabs>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>

                  { this.props.players.length > 1 && !this.props.started &&
                      <View style={{flex: 1}}>
                          <AppButton style={{margin: 0}} title="Start Game" onPress={() => this.props.dispatch(Actions.startGame())}/>
                      </View>
                  }
                  {this.props.started &&
                    <View style={{flex: 1}}>
                      <AppButton style={{margin: 0}} title="New Game" onPress={this.resetGame}/>
                    </View>
                  }
                  <View style={{ flex: 1 }}>
                      <AppButton style={{margin: 0}} title="Add Player" onPress={this.togglePlayerModal}/>
                  </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS !== "android" ? 30 : 10 ,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#000'
    }
});

App = connect(state => state)(App);

export default App;