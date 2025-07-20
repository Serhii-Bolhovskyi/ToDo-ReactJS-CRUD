import { combineReducers } from "redux";

import todosReducer from "./features/todos/todosSlice";
import categoriesReducer from "./features/categories/categoriesSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
  categories: categoriesReducer,
});

export default rootReducer;
