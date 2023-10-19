import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Todo } from "./todoSlice";

export interface modalState {
  isOpen: boolean;
  selected: Todo | null;
}

const initialState: modalState = {
  isOpen: false,
  selected: null
};

const editModal = createSlice({
  name: "editModal",
  initialState,
  reducers: {
    openEditModal: (state, action: PayloadAction<Todo>) => {
      state.isOpen = true;
      state.selected = action.payload;
    },
    closeEditModal: (state, action) => {
      state.isOpen = false;
      state.selected = null;
      return state;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
      return state;
    },
    titleHandler: (state, action: PayloadAction<string>) => {
      if (state.selected) {
        state.selected.title = action.payload;
      }
      return state;
    }
  }
});

export const {
  openEditModal,
  closeEditModal,
  toggleModal,
  titleHandler
} = editModal.actions;

export const editModalSelector = (state: RootState) => state.editModal;
export default editModal.reducer;
