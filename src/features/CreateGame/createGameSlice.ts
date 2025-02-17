import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  gameLink: string | null;
  gameCreated: boolean;
}

const initialState: GameState = {
  gameLink: null,
  gameCreated: false,
};

export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    createGame: (state, action: PayloadAction<string>) => {
      state.gameLink = action.payload;
      state.gameCreated = true;
    },
    resetCreateGame: (state) => {
      state = initialState;
    },
  },
});

export const { createGame, resetCreateGame } = createGameSlice.actions;
export default createGameSlice.reducer;
