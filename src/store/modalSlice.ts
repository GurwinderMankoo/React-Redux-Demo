import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type ModalState = {
  isOpen: boolean;
};

const initialState: ModalState = {
  isOpen: false
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction) => {
      state.isOpen = true;
      return state;
    },
    close: (state, action: PayloadAction) => {
      state.isOpen = false;
      return state;
    },
    toggle: (state, action: PayloadAction) => {
      state.isOpen = !state.isOpen;
      return state;
    },
    title: (state, action: PayloadAction) => {}
  }
});

export const { open, close, toggle } = modal.actions;

export const modalStateSelector = (state: RootState) => state.modal.isOpen;

export default modal.reducer;
