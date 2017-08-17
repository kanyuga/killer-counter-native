import React from 'react';
import App from '../components/App';

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
});