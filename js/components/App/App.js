import React from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';

import PropTypes from 'prop-types';

import PlayActionsContainer from '../PlayActions/PlayActionsContainer';
import PlayerModal from "../Player/PlayerModal";
import {getCurrentBall, getCurrentPlayer} from "../../helpers";
import AppTabs from "../common/AppTabs";
import AppButton from "../common/AppButton";
import AppText from "../common/AppText";
import PlayerListContainer from "../Player/PlayerListContainer";
import PlayLogContainer from "../PlayLog/PlayLogContainer";
import PlayerFormContainer from "../Player/PlayerFormContainer";

const App = (props) => {
  const playerForm = <PlayerFormContainer/>;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"black"}/>
      {props.playerModalActive &&
      <PlayerModal onRequestClose={props.togglePlayerModal}>{playerForm}</PlayerModal>
      }
      {props.started &&
      (<View>
        {props.gameOver ?
          <AppText style={{color: '#ccc', textAlign: 'center', fontWeight: 'bold', fontSize: 40, paddingVertical: 40}}>
            {`${props.winner().name} wins!`}
          </AppText> :
          <View style={{marginHorizontal: 10, paddingVertical: 5, backgroundColor: '#222'}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <AppText style={{flex: 1, textAlign: 'center', fontSize: 12}}>Current Player</AppText>
              <AppText style={{flex: 1, textAlign: 'center', fontSize: 12}}>Current Ball</AppText>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <AppText
                style={{flex: 1, textAlign: 'center'}}>{props.players[getCurrentPlayer(props.players)].name}</AppText>
              <AppText style={{flex: 1, textAlign: 'center'}}>{getCurrentBall(props.balls)}</AppText>
            </View>
          </View>
        }
        {!props.gameOver && <PlayActionsContainer/>}
      </View>)

      }
      <AppTabs>
        <PlayerListContainer />
        <PlayerListContainer sort="score"/>
        <PlayLogContainer />
      </AppTabs>
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>

        {props.players.length > 1 && !props.started &&
        <View style={{flex: 1}}>
          <AppButton style={{margin: 0}} title="Start Game" onPress={props.startGame}/>
        </View>
        }
        {props.started &&
        <View style={{flex: 1}}>
          <AppButton style={{margin: 0}} title="New Game" onPress={props.resetGame}/>
        </View>
        }
        <View style={{flex: 1}}>
          <AppButton style={{margin: 0}} title="Add Player" onPress={props.togglePlayerModal}/>
        </View>
      </View>

    </View>
  );
};

App.propTypes = {
  playerModalActive: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  balls: PropTypes.objectOf(PropTypes.shape()).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS !== "android" ? 30 : 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#000'
  }
});

export default App;