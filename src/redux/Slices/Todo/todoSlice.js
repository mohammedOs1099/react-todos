import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: [
   
  ],
  toggelFormInput: true,
  updateTodo: null,
  currentPag: 0,
  itemsPerPag: 7
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    toggelTodoDone: (state, action) => {
      const todo = state.todos.find(todo => {
        return todo.id === action.payload;
      });
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => {
        return todo.id !== action.payload;
      });
    },
    clearTodos: state => {
      state.todos = [];
    },
    setToggelFormeInpute: (state, action) => {
      state.toggelFormInput = !state.toggelFormInput;
      state.updateTodo = { ...state.updateTodo, ...action.payload };
    },
    todoupdate: (state, action) => {
      let updateElement = state.todos.find(todo => {
        return todo.id === action.payload.id;
      });
      if (updateElement) {
        updateElement.name = action.payload.name;
        updateElement.done = action.payload.done;
        state.toggelFormInput = !state.toggelFormInput;
        state.updateTodo = null;
      }
    },
    setCurrentPag: (state, action) => {
      state.currentPag = action.payload;
    }
  }
});

export default todoSlice.reducer;
export const {
  addTodo,
  clearTodos,
  toggelTodoDone,
  deleteTodo,
  setToggelFormeInpute,
  todoupdate,
  setCurrentPag
} = todoSlice.actions;
