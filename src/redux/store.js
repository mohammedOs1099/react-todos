import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/Todo/todoSlice";
const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});
export default store;
