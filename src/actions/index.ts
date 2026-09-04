import GamePhase from '../types/GamePhase';
import {
  SET_GAME_PHASE,
  SET_GAME_MENU_VISIBILITY,
  UPDATE_PLAYER,
  SET_ACTIVE_PLAYER,
  UPDATE_DEALER_HAND,
  SET_TRAY_AMOUNT,
} from './types';
import Game, { CreatedPlayer } from '../game';
import { AppThunk } from '../types/AppThunk';
import { GameAction } from '../types/GameAction';
import { PlayerAction } from '../types/PlayerAction';
import SerializedPlayer from '../types/SerializedPlayer';

let game: Game;

export const ensureGame = (startingChips = 2000): Game => {
  if (!game) {
    game = new Game([{ name: 'Player', startingChips }]);
  }
  return game;
};

export const startGame = (players?: CreatedPlayer[]): AppThunk => (dispatch) => {
  if (players && players.length > 0) {
    game = new Game(players);
  } else {
    game = new Game([{ name: 'Player', startingChips: 2000 }]);
  }
  dispatch(setGamePhase(GamePhase.Betting));
  dispatch(setGameMenuVisibility(false));
  dispatch(setActivePlayer());
  dispatch(updateDealer());
};

export const resetGame = (startingChips = 2000): AppThunk => (dispatch) => {
  dispatch(startGame([{ name: 'Player', startingChips }]));
};

export const rebuyChips = (amount = 1000): AppThunk => (dispatch) => {
  const g = ensureGame();
  const player = g.getPlayers()[0];
  if (player) {
    player.getStack().addChips(amount);
    dispatch(update(player.serialize()));
  }
};

export const setGameMenuVisibility = (
  isGameMenuVisible: boolean,
): GameAction => ({
  type: SET_GAME_MENU_VISIBILITY,
  isGameMenuVisible,
});

export const setActivePlayer = (): PlayerAction => {
  const g = ensureGame();
  return {
    type: SET_ACTIVE_PLAYER,
    activePlayer: g.getSerializedActivePlayer(),
  };
};

export const setGamePhase = (phase: GamePhase): GameAction => ({
  type: SET_GAME_PHASE,
  phase,
});

export const update = (player: SerializedPlayer): AppThunk => (dispatch) => {
  const g = ensureGame();
  dispatch({
    type: UPDATE_PLAYER,
    player,
  });
  dispatch(setActivePlayer());
  if (g.getGamePhase() !== GamePhase.DealerHand) {
    dispatch(updateDealer());
  }
  dispatch(setGamePhase(g.getGamePhase()));

  if (g.getGamePhase() === GamePhase.Results) {
    setTimeout(() => dispatch(startNewRound()), 3000);
  }
};

export const bet = (amount: number): AppThunk => (dispatch) => {
  const g = ensureGame();
  const bettingPlayer = g.bet(amount);
  dispatch(update(bettingPlayer));
};

export const hit = (): AppThunk => (dispatch) => {
  const g = ensureGame();
  const hittingPlayer = g.hit();
  dispatch(update(hittingPlayer));
};

export const stand = (): AppThunk => (dispatch) => {
  const g = ensureGame();
  const standingPlayer = g.stand();
  dispatch(update(standingPlayer));
};

export const double = (): AppThunk => (dispatch) => {
  const g = ensureGame();
  const doublingPlayer = g.double();
  dispatch(update(doublingPlayer));
};

export const updateDealer = (): AppThunk => (dispatch) => {
  const g = ensureGame();
  const hand = g.getDealer().serializeHand();
  const handValue = g.getDealer().getHandValue();

  dispatch({
    type: UPDATE_DEALER_HAND,
    dealer: { hand, handValue },
  });
};

export const playDealerHand = (): AppThunk => (dispatch) => {
  const g = ensureGame();
  g.playDealerHand();
  dispatch(updateDealer());
  dispatch({
    type: UPDATE_PLAYER,
    player: g.getSerializedActivePlayer(),
  });
};

export const setTrayAmount = (trayAmount: number): GameAction => ({
  type: SET_TRAY_AMOUNT,
  trayAmount,
});

export const startNewRound = (): AppThunk => (dispatch) => {
  const g = ensureGame();
  g.startNewRound();
  dispatch(setTrayAmount(0));
  dispatch(update(g.getSerializedActivePlayer()));
};

export const saveGame = (): AppThunk => (dispatch) => {
  if (!game) {
    throw new Error('There is no game instance to save the game state.');
  }

  game.saveGame();
};

export const loadGame = (): AppThunk => (dispatch) => {
  if (!game) {
    game = new Game([{ name: 'foo', startingChips: 1000 }]);
  }

  game.loadGame();
  dispatch(update(game.getSerializedActivePlayer()));
};
