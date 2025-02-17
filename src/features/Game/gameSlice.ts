import { GameDetails } from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  isLocked: boolean;
  gameDetails: GameDetails | null;
}

const initialState: GameState = {
  isLocked: false,
  gameDetails: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameDetails: (state, action: PayloadAction<GameDetails>) => {
      state.gameDetails = action.payload;
    },
    lockGame: (state) => {
      state.isLocked = true;
    },
    unlockGame: (state) => {
      state.isLocked = false;
    },
    resetGame: (state) => {
      state = initialState;
    },
  },
});

export const { setGameDetails, lockGame, unlockGame, resetGame } =
  gameSlice.actions;
export default gameSlice.reducer;
