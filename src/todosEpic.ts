import { ofType, Epic } from "redux-observable";
import { catchError, switchMap, map } from "rxjs/operators";
import { from, of } from "rxjs";
import { TodoAction, todoActions } from "./features/todos/todoTypes.ts";
import { RootState } from "./root.ts";
import { todosApi } from "./graphClient.ts";

export const fetchTodosEpic: Epic<TodoAction, TodoAction, RootState> = (
  action$
) =>
  action$.pipe(
    ofType("todos/fetchTodosRequest"),
    switchMap(() =>
      from(todosApi.fetchTodos()).pipe(
        map((todos) => todoActions.fetchTodosSuccess(todos)),
        catchError((error) => of(todoActions.fetchTodosFailure(error.message)))
      )
    )
  );

export const addTodoEpic: Epic<TodoAction, TodoAction, RootState> = (action$) =>
  action$.pipe(
    ofType("todos/addAsyncTodoRequest"),
    switchMap((action) =>
      from(todosApi.addTask(action.payload)).pipe(
        map((todo) => todoActions.addAsyncTodoSuccess(todo)),
        catchError((error) =>
          of(todoActions.addAsyncTodoFailure(error.message))
        )
      )
    )
  );

export const deleteTodoEpic: Epic<TodoAction, TodoAction, RootState> = (
  action$
) =>
  action$.pipe(
    ofType("todos/deleteAsyncTodoRequest"),
    switchMap((action) =>
      from(todosApi.deleteTask(action.payload)).pipe(
        map(() => todoActions.deleteAsyncTodoSuccess(action.payload)),
        catchError((error) =>
          of(todoActions.deleteAsyncTodoFailure(error.message))
        )
      )
    )
  );

export const updateTodoEpic: Epic<TodoAction, TodoAction, RootState> = (
  action$
) =>
  action$.pipe(
    ofType("todos/updateAsyncTodoRequest"),
    switchMap((action) =>
      from(todosApi.updateTask(action.payload)).pipe(
        map((todo) => todoActions.updateAsyncTodoSuccess(todo)),
        catchError((error) =>
          of(todoActions.updateAsyncTodoFailure(error.message))
        )
      )
    )
  );
