import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducer.ts";
import { print1, print2, print3 } from "./exampleAddons/middleware";

export type RootState = ReturnType<typeof rootReducer>;

const composedEnhancer = composeWithDevTools(
  applyMiddleware(print1, print2, print3)
);

const store = createStore(rootReducer, undefined, composedEnhancer);

export default store;
