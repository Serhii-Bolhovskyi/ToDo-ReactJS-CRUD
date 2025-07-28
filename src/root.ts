import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { loadTodosEpic } from "./epics/todosEpic.ts";

import todosReducer from "./features/todos/todosSlice.ts";
import categoriesReducer from "./features/categories/categoriesSlice.ts";

export const rootEpic = combineEpics(loadTodosEpic);

const rootReducer = combineReducers({
  todos: todosReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
