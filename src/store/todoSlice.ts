import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/reduxUtils";
import {
  fetchAllTodos,
  deleteTodo,
  editTodo,
  createTodo
} from "../components/apis/todos";
import { date } from "../components/utils";

const ITEMS_PER_PAGE = 10;

export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

export interface AddTodo {
  title: string;
  userId: number;
}

export interface TodoState {
  allTodos: Todo[];
  todos: Todo[];
  page: number;
  totalPage: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: Error | null | unknown;
}

const initialState: TodoState = {
  todos: [],
  allTodos: [],
  page: 1,
  totalPage: 1,
  loading: "idle",
  error: null
};

const todos = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodo>) => {
      const id = Number(Date.now());
      const { title, userId } = action.payload;
      const newTodo = {
        id,
        title,
        userId,
        completed: false,
        createdAt: new Date()
      };

      state.allTodos = [newTodo, ...state.allTodos];
      state.todos = [newTodo, ...state.todos];

      return state;
    },
    // deleteTodo: (state, action: PayloadAction<number>) => {
    //   state.allTodos.filter((todo) => todo.id === action.payload);
    //   state.todos.filter((todo) => todo.id === action.payload);
    //   return state;
    // },
    completeTodo: (state, action: PayloadAction<number>) => {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload) {
          todo.completed = true;
        }
      });
      state.allTodos.forEach((todo) => {
        if (todo.id === action.payload) {
          todo.completed = true;
        }
      });
    },
    pageHandler: (state, action: PayloadAction<string>) => {
      let page;
      if (action.payload === "next") {
        page = state.page >= state.totalPage ? state.page : state.page + 1;
      } else {
        page = state.page <= 1 ? state.page : state.page - 1;
      }

      state.todos = state.allTodos.slice(
        ITEMS_PER_PAGE * (page - 1),
        ITEMS_PER_PAGE * page
      );
      state.page = page;
      return state;
    },
    gotPrevPage: (state, action: PayloadAction) => {
      const page = state.page--;

      if (page > state.totalPage) return state;

      state.todos = state.allTodos.slice(
        ITEMS_PER_PAGE * (page - 1),
        ITEMS_PER_PAGE * page
      );

      return state;
    }
  },
  extraReducers: (buidler) => {
    buidler
      .addCase(fetchAllTodos.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        const newState: any = action.payload;

        state.allTodos = newState;
        const totalPages = Math.ceil(newState.length / ITEMS_PER_PAGE);
        const currentPage = state.page;
        const data = newState || [];
        const todos = data?.slice(
          ITEMS_PER_PAGE * (currentPage - 1),
          ITEMS_PER_PAGE * currentPage
        );
        state.todos = todos;
        state.totalPage = totalPages;
        state.loading = "succeeded";
        return state;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.error = action.error;
        state.loading = "failed";
      })
      .addCase(deleteTodo.pending, (state, action: PayloadAction) => {
        state.loading = "pending";
        return state;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = "idle";
        const allData = state.allTodos.filter(
          (todo) => todo.id !== action.payload
        );
        const totalPages = allData.length / ITEMS_PER_PAGE;
        const page = state.page > totalPages ? totalPages : state.page;
        const newData = allData.slice(
          ITEMS_PER_PAGE * (page - 1),
          ITEMS_PER_PAGE * page
        );
        state.todos = newData;
        state.allTodos = allData;
        return state;
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = "pending";
        return state;
      })
      .addCase(
        editTodo.fulfilled,
        (state, action: PayloadAction<Todo | any>) => {
          state.loading = "succeeded";
          const allTodos: Todo[] = [];
          const currentTodos: Todo[] = [];

          state.allTodos.forEach((task) => {
            if (task.id === action.payload.id) {
              allTodos.push(action.payload);
            } else {
              allTodos.push(task);
            }
          });

          state.todos.forEach((task) => {
            if (task.id === action.payload.id) {
              currentTodos.push(action.payload);
            } else {
              currentTodos.push(task);
            }
          });

          state.todos = currentTodos;
          state.allTodos = allTodos;
          return state;
        }
      )
      .addCase(createTodo.pending, (state) => {
        state.loading = "pending";
        return state;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const newState = [action.payload, ...state.allTodos];
        console.log(newState);
        state.allTodos = newState;
        state.page = 1;

        const totalPages = Math.ceil(newState.length / ITEMS_PER_PAGE);
        const currentPage = 1;
        const data = newState || [];
        const todos = data?.slice(
          ITEMS_PER_PAGE * (currentPage - 1),
          ITEMS_PER_PAGE * currentPage
        );
        state.todos = todos;
        state.totalPage = totalPages;
        state.loading = "succeeded";
        return state;
      });
  }
});

export const {
  addTodo,
  completeTodo,
  gotPrevPage,
  pageHandler
} = todos.actions;

export const GetAllTodos = () => useAppSelector((state) => state.todos);

export default todos.reducer;
