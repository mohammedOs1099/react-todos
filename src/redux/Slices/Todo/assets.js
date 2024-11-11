import { createSelector } from "@reduxjs/toolkit";

export const selectPagesTodo = createSelector(
  [
    state => state.todos?.todos,
    state => state.todos?.currentPag,
    state => state.todos?.itemsPerPag
  ],
  (todos, currentPag, itemsPerPag) => {
    const startIndex = currentPag  * itemsPerPag;
    const endIndex = startIndex + itemsPerPag;
    return todos.slice(startIndex, endIndex);
  }
);
