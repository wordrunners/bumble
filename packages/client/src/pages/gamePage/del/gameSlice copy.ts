import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';
import { cardType, playersType, playerType } from "../types/canvas"

export type GameType = {
  word: string;
  status: 'idle' | 'loading' | 'failed';
  width: number,
  height: number,
  card: cardType | undefined,
  canvas: undefined,
  timer: number,
  setI: undefined,
  players: playersType,
}

const initialState: GameType = {
  word: '',
  status: 'idle',
  width: 300,
  height: 300,
  card: undefined,
  canvas: undefined,
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
    setCanvas: (state, action: PayloadAction<CanvasRenderingContext2D>) => {
      state.canvas = action.payload;
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

    // enablePlayers: (state, action: PayloadAction<playerType>) => {
    //   state.players = action.payload;
    // },
  },
});

export const { increment, deleteLetter, addLetter, deleteWord } = gameSlice.actions;

export const { setWidth, setHeight } = gameSlice.actions;

export const { setCard } = gameSlice.actions;

export const { setCanvas } = gameSlice.actions;

export const { setTimer, decrementTimer, setSetI } = gameSlice.actions;

export const { addPlayers, deletePlayers, addPlayer } = gameSlice.actions;

export const selectWord = (state: RootState) => state.game.word;

export const selectWidth = (state: RootState) => state.game.width;

export const selectHeight = (state: RootState) => state.game.height;

export const selectCard = (state: RootState) => state.game.card;

export const selectCanvas = (state: RootState) => state.game.canvas;

export const selectTimer = (state: RootState) => state.game.timer;

export const selectSetI = (state: RootState) => state.game.setI;

export const selectPlayers = (state: RootState) => state.game.players;

export const decrementIfTime =
  (): AppThunk =>
  (dispatch, getState) => {
    const currentSetI = selectSetI(getState());
    const currentTimer = selectTimer(getState());

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
    const cloneWords = JSON.parse(JSON.stringify(players[player].words));

    // cloneWords.push(word);
    console.log(clonePlayers[player].words)
    clonePlayers[player].words.push(word);
    console.log(clonePlayers[player].words)

    // const clone = players[player].words;
    dispatch(deletePlayers());
    dispatch(addPlayers(clonePlayers));
    
    // words.push('1s')
    // players.map((player) => {
    //   if (player.enabled) {
        // console.log(clonePlayer)
        // console.log(cloneWords)

        // players[player].words.push(word);
        // console.log(player.words)

    //   }
    // })
    // if (players === '1') {
    //   dispatch(addLetter(amount));
    // }
  };

export const incrementIfOdd =
  (amount: string): AppThunk =>
  (dispatch, getState) => {
    const currentWord = selectWord(getState());
    if (currentWord === '1') {
      dispatch(addLetter(amount));
    }
  };

export default gameSlice.reducer;
