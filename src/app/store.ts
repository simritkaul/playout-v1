import { configureStore } from "@reduxjs/toolkit";
import createGameReducer from "@/features/CreateGame/createGameSlice";
import joinGameReducer from "@/features/JoinGame/joinGameSlice";
import gameReducer from "@/features/Game/gameSlice";
import adminReducer from "@/features/Admin/adminSlice";
import authReducer from "@/features/Auth/authSlice";
export const store = configureStore({
  reducer: {
    createGame: createGameReducer,
    joinGame: joinGameReducer,
    game: gameReducer,
    admin: adminReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
