import { GameDetails } from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JoinGameState {
  gameDetails: GameDetails | null;
  playerName: string;
  additionalPlayers: string[];
}

const initialState: JoinGameState = {
  gameDetails: null,
  playerName: "",
  additionalPlayers: [],
};

const joinGameSlice = createSlice({
  name: "joinGame",
  initialState,
  reducers: {
    setGameDetails: (state, action: PayloadAction<GameDetails>) => {
      state.gameDetails = action.payload;
    },
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    setAdditionalPlayers: (state, action: PayloadAction<string[]>) => {
      state.additionalPlayers = action.payload;
    },
    resetJoinGame: (state) => {
      state = initialState;
    },
  },
});

export const {
  setGameDetails,
  setPlayerName,
  setAdditionalPlayers,
  resetJoinGame,
} = joinGameSlice.actions;
export default joinGameSlice.reducer;
