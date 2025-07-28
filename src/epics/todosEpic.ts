import { Epic, ofType } from "redux-observable";
import { from, of, Observable } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Todo, TodoAction } from "../features/todos/todoTypes";
import { RootState } from "../root";

const GRAPHQL_URL = "https://159dd64d4f32.ngrok-free.app/graphql";
const GET_TODOS_QUERY = `
query {
  tasks {
    id
    title
    categoryId
    deadline
    completeDate
    isCompleted
  }
  categories {
    id
    name
  }
}`;

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "GraphQL-Require-Preflight": "1",
    },
    body: JSON.stringify({ query: GET_TODOS_QUERY }),
  });

  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data.tasks.map((task: any) => ({
    id: task.id,
    text: task.title,
    categoryId: task.categoryId,
    deadline: task.deadline,
    completeDate: task.completeDate,
    completed: task.isCompleted,
  }));
};

fetchTodos()
  .then((todos) => {
    console.log("Тудушки з сервера:", todos);
  })
  .catch((err) => {
    console.error("Помилка завантаження:", err);
  });

export const loadTodosEpic: Epic<TodoAction, TodoAction, RootState> = (
  action$
) =>
  action$.pipe(
    ofType("todos/loadStarted"),
    mergeMap(() =>
      from(fetchTodos()).pipe(
        map(
          (todos): TodoAction => ({
            type: "todos/loadSucceeded",
            payload: todos,
          })
        ),
        catchError(
          (error): Observable<TodoAction> =>
            of({
              type: "todos/loadFailed",
              payload: error.message || "Error loading todos",
            } as const)
        )
      )
    )
  );
