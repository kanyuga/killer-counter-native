import { createSelector } from 'reselect';
import {getCurrentBall, getCurrentPlayer, pointsLeft} from "./helpers";

export const gameOverSelector = createSelector(
  state => state.balls,
  balls => pointsLeft(balls) === 0
);

export const currentPlayerSelector = createSelector(
  state => state.players,
  players => getCurrentPlayer(players)
);

export const currentBallSelector = createSelector(
  state => state.balls,
  balls => getCurrentBall(balls)
);

export const pointsLeftSelector = createSelector(
  state => state.balls,
  balls => pointsLeft(balls)
);