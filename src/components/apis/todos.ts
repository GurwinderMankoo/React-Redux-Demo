import { createAsyncThunk } from "@reduxjs/toolkit";
import api from ".";
import { Todo } from "../../store/todoSlice";

export const fetchAllTodos = createAsyncThunk(
  "todo/fetchAllTodos",
  async () => {
    const response = await api.get(`todos`);
    const data = response.data;
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: number) => {
    const response = await api.delete(`todos/${id}`);
    return id;
  }
);

export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async (todo: Todo) => {
    const response = await api.put(`todos/${todo.id}`, todo);
    return response.data;
  }
);

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todo: Todo) => {
    const response = await api.post(`todos`, todo);
    return response.data;
  }
);
