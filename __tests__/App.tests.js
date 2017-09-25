import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/components/App/App';

describe('unit tests', () => {
    let app;
    let players;
    let balls;
    beforeEach(() => {
        app = new App;
        players = [
            { name: "Player 1", active: true, score: 0 },
            { name: "Player 2", active: true, score: -30 },
            { name: "Player 3", active: false, score: 15 },
            { name: "Player 4", active: true, score: 0 }
        ];
        balls = {
            1: {number: 1, active: true, points: 16},
            2: {number: 2, active: true, points: 17},
            3: {number: 3, active: false, points: 6}
        };
        // Hacky but required to test state
        app.setState = function (newState) {
            this.state = Object.assign({}, this.state, newState);
        };
    });
    it ('maxScore calculates correctly',() => {
        expect(app.maxScore(players)).toEqual(15);
    });
    it ('pointsLeft', () => {
        expect(app.pointsLeft(balls)).toEqual(33);
    });
    it ('refreshes active players', () => {
        players = app.refreshActivePlayers(players, balls);
        expect(players[0].active).toEqual(true);
        expect(players[1].active).toEqual(false);
        expect(players[2].active).toEqual(true);
    });
    it ('game over returns true if no balls are active', () => {
        expect(app.gameOver(balls)).toEqual(false);
        balls[1].active = false;
        expect(app.gameOver(balls)).toEqual(false);
        balls[2].active = false;
        balls[3].active = false;
        expect(app.gameOver(balls)).toEqual(true);
    });
    it ('nextPlayer returns the next player correctly', () => {
        expect(app.nextPlayer(players, 0)).toEqual(1);
        expect(app.nextPlayer(players, 1)).toEqual(3);
        expect(app.nextPlayer(players, 3)).toEqual(0);
    });
    it ('start game', () => {
        app.startGame();
        expect(app.state.started).toBe(true);
    });


    it ('nextBall returns the next ball correctly', () => {
        const balls = Object.assign({}, app.state.balls);
        expect(app.nextBall(balls, 3)).toEqual(3);
        balls[14].active = false;
        expect(app.nextBall(balls, 14)).toEqual(15);
        balls[15].active = false;
        expect(app.nextBall(balls, 15)).toEqual(1);
        balls[4].active = false;
        balls[3].active = false;
        expect(app.nextBall(balls, 3)).toEqual(5);
    });

    describe ('play', () => {

        beforeEach(() => {
            app.state.players = players;
            app.startGame();
        });
        it('hit', () => {
            app.play('hit');
            expect(app.state.currentPlayer).toBe(1);
            expect(app.state.currentBall).toBe(3);
        });

        it('miss when no ball has been ported', () => {
            app.play('miss');
            expect(app.state.currentPlayer).toBe(1);
            expect(app.state.currentBall).toBe(3);
            expect(app.state.players[0].score).toBe(0);
        });

        it('miss when ball has been ported', () => {
            app.state.balls[4].active = false;
            app.play('miss');
            expect(app.state.currentPlayer).toBe(1);
            expect(app.state.currentBall).toBe(3);
            expect(app.state.players[0].score).toBe(-6);
        });

        it('port', () => {
            app.play('port');
            expect(app.state.ballGridActive).toBe(true);
            expect(app.state.ballGridLegal).toBe(true);
            app.play('port', 3);
            expect(app.state.players[0].score).toBe(6);
            expect(app.state.currentPlayer).toBe(0);
            expect(app.state.currentBall).toBe(4);
            expect(app.state.ballGridActive).toBe(false);
        });

        it('foul port when no ball has been ported', () => {
            app.play('foulPort');
            expect(app.state.ballGridActive).toBe(true);
            expect(app.state.ballGridLegal).toBe(false);
            app.play('foulPort', 5);
            expect(app.state.players[0].score).toBe(0);
            expect(app.state.currentPlayer).toBe(1);
            expect(app.state.currentBall).toBe(3);
            expect(app.state.ballGridActive).toBe(false);
        });
        it('foul port when no ball has been ported', () => {
            app.state.balls[4].active = false;
            app.play('foulPort');
            expect(app.state.ballGridActive).toBe(true);
            expect(app.state.ballGridLegal).toBe(false);
            app.play('foulPort', 5);
            expect(app.state.players[0].score).toBe(-5);
            expect(app.state.currentPlayer).toBe(1);
            expect(app.state.currentBall).toBe(3);
            expect(app.state.ballGridActive).toBe(false);
        });
        it('port current ball and white ball', () => {
            app.play('portCurrentAndWhiteBall');
            expect(app.state.players[0].score).toBe(0);
            expect(app.state.currentPlayer).toBe(1);
            expect(app.state.currentBall).toBe(4);

        });
    });
    it ('resetGame', () => {
        app.resetGame();
        expect(app.state).toEqual(app.defaultState());
    });
    describe ('delete player', () => {
        beforeEach(() => {
            app.state.players = players;
        });
        it ('when current player is deleted, the next player is selected', () => {
            app.deletePlayer(0);
            expect(app.state.players.length).toBe(3);
            expect(app.state.currentPlayer).toBe(0);
        });

        it ('when current player is deleted and is last, the first player is selected', () => {
            app.state.currentPlayer = 3;
            app.deletePlayer(3);
            expect(app.state.players.length).toBe(3);
            expect(app.state.currentPlayer).toBe(0);
        });

        it ('when current player is after the deleted player, it is still the current players turn', () => {
            app.state.currentPlayer = 3;
            app.deletePlayer(1);
            expect(app.state.players.length).toBe(3);
            expect(app.state.currentPlayer).toBe(2);
        });
    });
});