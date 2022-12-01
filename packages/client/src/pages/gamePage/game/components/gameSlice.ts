import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';
import { GameType, cardType, playersType, playerType } from "../types/canvas"


const initialState: GameType = {
  word: '',
  points: 0,
  status: 'idle',
  width: 0,
  height: 0,
  card: undefined,
  context: undefined,
  timer: 0,
  setI: undefined,
  players: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: (state) => {
      state.word += 1;
    },
    deleteLetter: (state) => {
      const lastLetter = +state.word.charAt(state.word.length-1);
      if (state.card) state.card[lastLetter].enabled = true;
      state.word = state.word.slice(0, -1);
    },
    addLetter: (state, action: PayloadAction<string>) => {
      if ((state.card) && (state.card[+action.payload].enabled)) {
        state.word += action.payload;
        state.card[+action.payload].enabled = false;
      }
    },
    setPoints: (state, action: PayloadAction<number>) => {
      // if ((state.card) && (state.card[+action.payload].enabled)) {
        state.points = action.payload;
      // }
    },
    clearPoints: (state) => {
      state.points = 0;
    },
    deleteWord: (state) => {
      state.word = '';
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },

    setCard: (state, action: PayloadAction<cardType>) => {
      state.card = action.payload;
    },
    setContext: (state, action: PayloadAction<CanvasRenderingContext2D>) => {
      state.context = action.payload;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    setSetI: (state, action: PayloadAction<any>) => {
      state.setI = action.payload;
    },
    decrementTimer: (state) => {
      state.timer -= 1;
    },
    deletePlayers: (state) => {
      state.players = [];
    },
    addPlayers: (state, action: PayloadAction<playersType>) => {
      state.players = action.payload;
    },
    addPlayer: (state, action: PayloadAction<playerType>) => {
      state.players.push(action.payload);
    },
    setWord: (state, action: PayloadAction<playerType, string>) => {
      // action.payload.words.push(action.payload);
    },
  },
});

export const { increment, deleteLetter, addLetter, deleteWord, setPoints, clearPoints } = gameSlice.actions;

export const { setWidth, setHeight } = gameSlice.actions;

export const { setCard } = gameSlice.actions;

export const { setContext } = gameSlice.actions;

export const { setTimer, decrementTimer, setSetI } = gameSlice.actions;

export const { addPlayers, deletePlayers, addPlayer } = gameSlice.actions;

export const selectWord = (state: RootState) => state.game.word;

export const selectPoints = (state: RootState) => state.game.points;

export const selectWidth = (state: RootState) => state.game.width;

export const selectHeight = (state: RootState) => state.game.height;

export const selectCard = (state: RootState) => state.game.card;

export const selectContext = (state: RootState) => state.game.context;

export const selectTimer = (state: RootState) => state.game.timer;

export const selectSetI = (state: RootState) => state.game.setI;

export const selectPlayers = (state: RootState) => state.game.players;

export const decrementIfTime =
  (): AppThunk =>
  (dispatch, getState) => {
    const currentSetI = selectSetI(getState());

    if (currentSetI) {
      clearInterval(currentSetI);
      dispatch(setSetI(undefined));
    }

    const newSetI = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);
    dispatch(setSetI(newSetI));
  };

export const addWord =
  (player: number, word: string): AppThunk =>
  (dispatch, getState) => {
    const players = selectPlayers(getState());
    const clonePlayers = JSON.parse(JSON.stringify(players));
    clonePlayers[player].words.push(word);

    clonePlayers[player].enabled = false;
    if (clonePlayers.length-1 !== player) {
      clonePlayers[player+1].enabled = true;
    } else {
      clonePlayers[0].enabled = true;
    }


    dispatch(setTimer(60));

    dispatch(deletePlayers());
    dispatch(addPlayers(clonePlayers));
  };
  

export default gameSlice.reducer;
