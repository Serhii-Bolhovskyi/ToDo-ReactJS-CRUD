import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { fetchTodosEpic } from "./todosEpic.ts";

import todosReducer from "./features/todos/todosSlice.ts";
import categoriesReducer from "./features/categories/categoriesSlice.ts";

export const rootEpic = combineEpics(fetchTodosEpic);

const rootReducer = combineReducers({
  todos: todosReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
