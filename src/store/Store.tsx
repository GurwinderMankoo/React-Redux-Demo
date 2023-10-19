import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import modalSlice from "./modalSlice";
import editModal from "./editModal";

export const rootReducer = combineReducers({
  todos: todoSlice,
  modal: modalSlice,
  editModal: editModal
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
