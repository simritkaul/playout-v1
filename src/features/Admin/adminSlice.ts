import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminControlState {
  isLocked: boolean;
}

const initialState: AdminControlState = {
  isLocked: false,
};

const adminControlSlice = createSlice({
  name: "adminControl",
  initialState,
  reducers: {
    lockGame: (state) => {
      state.isLocked = true;
    },
    unlockGame: (state) => {
      state.isLocked = false;
    },
    resetAdminControl: (state) => {
      state = initialState;
    },
  },
});

export const { lockGame, unlockGame, resetAdminControl } =
  adminControlSlice.actions;
export default adminControlSlice.reducer;
