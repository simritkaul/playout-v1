import { Player } from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JoinGameState {
  gameId: string | null;
  isJoined: boolean;
  additionalPlayers: Player[];
}

const initialState: JoinGameState = {
  gameId: null,
  isJoined: false,
  additionalPlayers: [],
};

const joinGameSlice = createSlice({
  name: "joinGame",
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
    setIsJoined: (state, action: PayloadAction<boolean>) => {
      state.isJoined = action.payload;
    },
    setAdditionalPlayers: (state, action: PayloadAction<Player[]>) => {
      state.additionalPlayers = action.payload;
    },
    resetJoinGame: (state) => {
      state = initialState;
    },
  },
});

export const { setGameId, setIsJoined, setAdditionalPlayers, resetJoinGame } =
  joinGameSlice.actions;
export default joinGameSlice.reducer;
