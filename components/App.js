import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button } from 'react-native';

import PlayerList from './PlayerList';
import PlayerForm from './PlayerForm';
import BallGrid from './BallGrid';
import PlayActions from './PlayActions';
import playTypes from '../utils/PlayTypes';


export default class App extends Component {

    ballCount = 15;

    constructor(props) {
        super(props);

        const balls = {};
        for (let i = 1; i <= this.ballCount; i++) {
            balls[i] = { number: i, active: true, points: (i === 3 ? 6 : i < 3 ? i + this.ballCount: i)}
        }


        this.state = {
            balls: balls,
            players: [{ name: 'Toph', score: 0, active: false }, { name: "Toph2", score: 0, active: true}],
            started: false,
            ballGridActive: false,
            ballGridLegal: true,
            currentPlayer: 0,
            currentBall: 3
        };
    }

    addPlayer = (name) => {
        const players = this.state.players.slice();
        players.push({ name: name, score: 0, active: false });
        console.log(players);
        this.setState({players: players});
    };

    startGame = () => {
        this.setState({ started: true });
    };

    deletePlayer = (index) => {
        const players = this.state.players.slice();
        players.splice(index, 1);
        this.setState({players: players});
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
            const players = this.state.players.slice();
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
                    break;
                case 'hit':
                    newState.currentPlayer = this.nextPlayer(players);
                    break;
                case 'miss':
                    currentPlayer.score -= balls[this.state.currentBall].points;
                    newState.currentPlayer = this.nextPlayer(players);
                    break;
                case 'foulPort':
                    currentPlayer.score -= balls[this.state.currentBall].points;
                    newState.currentPlayer = this.nextPlayer(players);
                    break;
                case 'portCurrentAndWhiteBall':
                    balls[number].active = false;
                    newState.currentBall = this.nextBall(balls);
                    newState.currentPlayer = this.nextPlayer(players);
            }
            this.setState(newState);
        }
    };

    gameOver = (balls = this.state.balls) => {
        let gameOver = true;
        Object.keys(balls).map((number) => {
            if (balls[number].active) {
                gameOver = true;
                return false;
            }
        });
        return gameOver;
    };

    nextPlayer = (players, currentPlayer = this.state.currentPlayer) => {
        let nextPlayer = currentPlayer;
        if (!this.gameOver()) {
            let counter = 0;
            do {
                nextPlayer = (nextPlayer + 1) % players.length;
                counter++;
            } while (!players[nextPlayer].active && counter < players.length);
        }
        return nextPlayer;
    };

    nextBall = (balls, currentBall = this.state.currentBall) => {
        let nextBall = currentBall;
        while (!balls[nextBall].active) {
            nextBall = nextBall === this.ballCount ? 1 : nextBall + 1;
        }
        return nextBall;
    };


    render() {
        return (
            <View style={styles.container}>
                { !this.state.started ? <PlayerForm onSubmit={this.addPlayer} /> :
                    <PlayActions onPress={this.play} type={this.state.ballGridLegal ? 'port' : 'foulPort'}>
                        { this.state.ballGridActive && <BallGrid type={this.state.ballGridLegal ? 'port' : 'foulPort'} balls={this.state.balls} onPress={this.play}/> }
                    </PlayActions> }
                <PlayerList players={this.state.players} onDelete={this.deletePlayer}/>
                { this.state.players.length > 1 && <View style={{width: '100%'}}><Button title="start" onPress={this.startGame}/></View> }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF'
    }
});