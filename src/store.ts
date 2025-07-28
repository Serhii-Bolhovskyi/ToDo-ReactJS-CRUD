import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { rootEpic } from "./root.ts";
import { TodoAction } from "./features/todos/todoTypes.ts";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./root.ts";

export type RootState = ReturnType<typeof rootReducer>;

const epicMiddleware: EpicMiddleware<TodoAction, TodoAction, RootState> =
  createEpicMiddleware<TodoAction, TodoAction, RootState>();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
