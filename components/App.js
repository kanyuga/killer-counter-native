import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button } from 'react-native';

import PlayerList from './PlayerList';
import PlayerForm from './PlayerForm';
import BallGrid from './BallGrid';
import PlayActions from './PlayActions';
import { Ball, Player } from '../utils/dataDef';
import baseStyles from "../utils/styles";
import PlayerModal from "./PlayerModal";


export default class App extends Component {

    ballCount = 15;

    constructor(props) {
        super(props);
        this.state = this.defaultState();
    }

    defaultState = () => {
        const balls = {};
        for (let i = 1; i <= this.ballCount; i++) {
            balls[i] = new Ball(i);
        }

        return {
            balls: balls,
            players: [new Player("Player 1"), new Player("Player 2")],
            started: false,
            ballGridActive: false,
            ballGridLegal: true,
            currentPlayer: 0,
            currentBall: 3,
            playerModalActive: false
        };
    };

    addPlayer = (name) => {
        const players = this.state.players.slice();
        players.push(new Player(name));
        console.log(players);
        this.setState({players: players, playerModalActive: false});
    };

    startGame = () => {
        this.setState({ started: true });
    };

    deletePlayer = (index) => {
        const players = this.state.players.slice();
        players.splice(index, 1);
        let currentPlayer = this.state.currentPlayer;
        if (currentPlayer > index) {
            currentPlayer--;
        }
        else if (currentPlayer === index) {
            currentPlayer = this.nextPlayer(players, currentPlayer - 1);
        }
        this.setState({
            players: players,
            currentPlayer: currentPlayer
        });
    };

    play = (type, number = null) => {
        console.log(type, number);
        if ((type === 'port' || type === 'foulPort') && number === null) {
            this.setState({
               ballGridActive: true,
               ballGridLegal: type === 'port'
            });
        }
        else {
            let players = this.state.players.slice();
            const balls = Object.assign({}, this.state.balls);
            const currentPlayer = players[this.state.currentPlayer];

            const newState = {
                ballGridActive: false,
                players: players,
                balls: balls
            };

            switch(type) {
                case 'port':
                    balls[number].active = false;
                    currentPlayer.score += balls[number].points;
                    newState.currentBall = this.nextBall(balls);
                    players = this.refreshActivePlayers(players, balls);
                    break;
                case 'hit':
                    newState.currentPlayer = this.nextPlayer(players);
                    break;
                case 'miss':
                    currentPlayer.score -= (this.ballHasBeenPorted() ? balls[this.state.currentBall].points : 0);
                    players = this.refreshActivePlayers(players);
                    newState.currentPlayer = this.nextPlayer(players);
                    break;
                case 'foulPort':
                    currentPlayer.score -= (this.ballHasBeenPorted() ? balls[number].points : 0);
                    players = this.refreshActivePlayers(players);
                    newState.currentPlayer = this.nextPlayer(players);
                    break;
                case 'portCurrentAndWhiteBall':
                    balls[this.state.currentBall].active = false;
                    newState.currentBall = this.nextBall(balls);
                    players = this.refreshActivePlayers(players, balls);
                    newState.currentPlayer = this.nextPlayer(players);
            }
            this.setState(newState);
        }
    };

    gameOver = (balls = this.state.balls) => {
        let gameOver = true;
        Object.keys(balls).map((number) => {
            if (balls[number].active) {
                gameOver = false;
                return false;
            }
        });
        return gameOver;
    };

    nextPlayer = (players, currentPlayer = this.state.currentPlayer) => {
        let nextPlayer = (currentPlayer + 1) % players.length;
        while (!players[nextPlayer].active) {
            nextPlayer = (nextPlayer + 1) % players.length;
        }
        return nextPlayer;
    };

    nextBall = (balls, currentBall = this.state.currentBall) => {
        let nextBall = currentBall;
        if (!this.gameOver(balls)) {
            while (!balls[nextBall].active) {
                nextBall = (nextBall === this.ballCount) ? 1 : nextBall + 1;
            }
        }
        return nextBall;
    };

    ballHasBeenPorted = (balls = this.state.balls) => {
        let ballHasBeenPorted = false;
        Object.keys(balls).map((number) => {
            if (!balls[number].active) {
                ballHasBeenPorted = true;
                return false;
            }
        });
        return ballHasBeenPorted;
    };

    refreshActivePlayers = (players = this.state.players, balls = this.state.balls) => {
        const pointsLeft = this.pointsLeft(balls);
        const maxScore = this.maxScore(players);
        players = players.slice();
        for (let i=0; i < players.length; i++) {
            players[i].active = (players[i].score + pointsLeft) >= maxScore;
        }
        return players;
    };

    pointsLeft = (balls = this.state.balls) => {
        let pointsLeft = 0;
        Object.keys(balls).map((number) => {
            pointsLeft += balls[number].active ? balls[number].points : 0
        });
        return pointsLeft;
    };

    maxScore = (players = this.state.players) => {
        let maxScore = players[0].score;
        players.forEach((player) => {
            maxScore = Math.max(player.score, maxScore);
        });
        return maxScore;
    };

    resetGame = () => {
        this.setState(this.defaultState());
    };

    togglePlayerModal = () => {
        this.setState({
            playerModalActive: !this.state.playerModalActive,
        });
    };

    render() {
        const playerForm = <PlayerForm onSubmit={this.addPlayer} />;
        return (
            <View style={styles.container}>
                { this.state.playerModalActive && <PlayerModal onRequestClose={this.togglePlayerModal}>{playerForm}</PlayerModal> }
                { !this.state.started ? playerForm :
                    <PlayActions onPress={this.play} type={this.state.ballGridLegal ? 'port' : 'foulPort'}>
                        { this.state.ballGridActive
                            ? <BallGrid type={this.state.ballGridLegal ? 'port' : 'foulPort'} balls={this.state.balls} onPress={this.play}/>
                            :null
                        }
                    </PlayActions> }
                <PlayerList players={this.state.players} onDelete={this.deletePlayer} currentPlayer={this.state.currentPlayer}/>
                { this.state.players.length > 1 && !this.state.started &&
                    <View style={{width: '100%'}}>
                        <Button title="start" onPress={this.startGame}/>
                    </View>
                }
                { this.state.started &&
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={{ flex: 1 }}>
                            <Button color={baseStyles.colors.secondaryDark} title="New Game" onPress={this.resetGame}/>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button color={baseStyles.colors.primaryDark} title="Add Player" onPress={this.togglePlayerModal}/>
                        </View>
                    </View>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    }
});