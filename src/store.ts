import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./root.ts";
import rootReducer from "./root.ts";
import { TodoAction } from "./features/todos/todoTypes.ts";
import { RootState } from "./root.ts";

const epicMiddleware = createEpicMiddleware<TodoAction, TodoAction, RootState>()

const composeEnhancer = 
  (typeof window !== 'undefined' && 
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch
export default store;
