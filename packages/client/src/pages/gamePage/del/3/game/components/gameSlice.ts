import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../../store/store';
import { GameType, cardType, playersType, playerType, cardsType,
  statusType } from "../types/canvas"
import { cardToArrays } from "../helpers/cardToArrays"


const initialState: GameType = {
  totalPlayers: -1,
  activePlayer: 0,
  activeCard: 0,
  cards: undefined,
  word: '',
  points: 0,
  status: 'start',
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
    setStatus: (state, action: PayloadAction<statusType>) => {
      state.status = action.payload;
    },
    setCards: (state, action: PayloadAction<cardsType>) => {
      state.cards = action.payload;
    },
    addCards: (state, action: PayloadAction<cardType>) => {
      state.cards?.push(action.payload);
    },
    deleteCards: (state, action: PayloadAction<cardType>) => {
      const newCards: cardsType = []
      state.cards?.map((card) => {
        if (card !== action.payload) {
          newCards.push(card);
        }
      })
      // console.log(newCards)
      state.cards = newCards;
    },
    setTotalPlayers: (state, action: PayloadAction<number>) => {
      state.totalPlayers = action.payload;
    },
    nextTotalPlayers: (state,) => {
      if (state.totalPlayers === 3) {
        state.totalPlayers = 0;
      } else {
        state.totalPlayers += 1;
      }
    },
    setActivePlayer: (state, action: PayloadAction<number>) => {
      state.activePlayer = action.payload;
    },
    nextActivePlayer: (state,) => {
      if (state.activePlayer === state.totalPlayers) {
        state.activePlayer = 0;
      } else {
        state.activePlayer += 1;
      }
    },
    setActiveCard: (state, action: PayloadAction<number>) => {
      state.activeCard = action.payload;
      state.card = state.cards![action.payload];
    },
    nextActiveCard: (state,) => {
      if (state.activeCard === ((state.totalPlayers + 1)*3 - 1)) {
        state.activeCard = 0;
        // state.card = state.cards[0];
        state.status = 'over'
        // state.setI = undefined;

      } else {
        state.activeCard += 1;
        state.card = state.cards![state.activeCard];
      }
      // setActiveCard(2)
    },
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
    countPoints: (state) => {
      const { set, point } = cardToArrays(state.card);
      let points = 0;
      let oneSet = 0, twoSet = 0, threeSet = 0;
      for (let i = 0; i < state.word.length; i++) {
        points += point[+state.word[i]] 
        if (set[+state.word[i]] === 1) {
          oneSet++;
        } else if (set[+state.word[i]] === 2) {
          twoSet++;
        } else if (set[+state.word[i]] === 3) {
          threeSet++;
        } 
      }
    
      if (oneSet === 3) {
        points += 1;
      } else if (twoSet === 3) {
        points += 2;
      } else if (threeSet === 3) {
        points += 3;
      } 
      state.points = points;
      // return points
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

export const { setActiveCard, nextActiveCard } = gameSlice.actions;

export const { setStatus } = gameSlice.actions;

export const { setCards, addCards, deleteCards } = gameSlice.actions;

export const { setTotalPlayers, setActivePlayer, nextActivePlayer, nextTotalPlayers } = gameSlice.actions;

export const { increment, deleteLetter, addLetter, deleteWord, setPoints, clearPoints, countPoints } = gameSlice.actions;

export const { setWidth, setHeight } = gameSlice.actions;

export const { setCard } = gameSlice.actions;

export const { setContext } = gameSlice.actions;

export const { setTimer, decrementTimer, setSetI } = gameSlice.actions;

export const { addPlayers, deletePlayers, addPlayer } = gameSlice.actions;

export const selectActiveCard = (state: RootState) => state.game.activeCard;

export const selectStatus = (state: RootState) => state.game.status;

export const selectCards = (state: RootState) => state.game.cards;

export const selectTotalPlayers = (state: RootState) => state.game.totalPlayers;

export const selectActivePlayer = (state: RootState) => state.game.activePlayer;

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
      const timer = selectTimer(getState());

      if (timer === 1) {
        dispatch(nextActivePlayer());
        dispatch(nextActiveCard());

        dispatch(setTimer(60));
        dispatch(deleteWord());
        dispatch(setPoints(0));

      }

      dispatch(decrementTimer());
    }, 1000);
    dispatch(setSetI(newSetI));
  };

export const addWord =
  (player: number, word: string): AppThunk =>
  (dispatch, getState) => {
    const players = selectPlayers(getState());
    const activePlayer = selectActivePlayer(getState());
    const points = selectPoints(getState());


    const clonePlayers = JSON.parse(JSON.stringify(players));
    clonePlayers[player].words.push(word);
    clonePlayers[player].score += points;

    // clonePlayers[activePlayer] = false;
    // if (clonePlayers.length-1 !== player) {
    //   clonePlayers[activePlayer+1] = true;
    // } else {
    //   clonePlayers[0] = true;
    // }

    dispatch(nextActivePlayer());


    dispatch(setTimer(60));

    dispatch(deletePlayers());
    dispatch(addPlayers(clonePlayers));
  };
  

export default gameSlice.reducer;
