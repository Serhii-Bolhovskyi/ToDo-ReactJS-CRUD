import { combineReducers } from "redux";

import todosReducer from "./features/todos/todosSlice.ts";
import categoriesReducer from "./features/categories/categoriesSlice.ts";

const rootReducer = combineReducers({
  todos: todosReducer,
  categories: categoriesReducer,
});

export default rootReducer;
