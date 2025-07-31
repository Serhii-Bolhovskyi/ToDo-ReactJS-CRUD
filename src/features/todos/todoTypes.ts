export interface TodoCategory {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  title: string;
  categoryId: number;
  deadline?: string;
  completeDate?: Date | null;
  isCompleted: boolean;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export type TodoAction =
  // | {
  //     type: "todos/todoAdded";
  //     payload: { title: string; categoryId: number; deadline?: string };
  //   }
  | { type: "todos/todoToggled"; payload: number }
  | { type: "todos/todoDeleted"; payload: number }
  // eкшени для завантаження
  | { type: "todos/fetchTodosRequest" }
  | { type: "todos/fetchTodosSuccess"; payload: Todo[] }
  | { type: "todos/fetchTodosFailure"; payload: string }
  // екшени для асинхронного додавання
  | {
      type: "todos/addAsyncTodoRequest";
      payload: { title: string; categoryId: number; deadline?: string };
    }
  | { type: "todos/addAsyncTodoSuccess"; payload: Todo }
  | { type: "todos/addAsyncTodoFailure"; payload: string };

export const todoActions = {
  fetchTodosRequest: () => ({ type: "todos/fetchTodosRequest" } as const),
  fetchTodosSuccess: (todos: Todo[]) =>
    ({
      type: "todos/fetchTodosSuccess",
      payload: todos,
    } as const),
  fetchTodosFailure: (error: string) =>
    ({
      type: "todos/fetchTodosFailure",
      payload: error,
    } as const),
  addAsyncTodoRequest: (payload: {
    title: string;
    categoryId: number;
    deadline?: string;
  }) =>
    ({
      type: "todos/addAsyncTodoRequest",
      payload,
    } as const),
  addAsyncTodoSuccess: (todo: Todo) =>
    ({
      type: "todos/addAsyncTodoSuccess",
      payload: todo,
    } as const),
  addAsyncTodoFailure: (error: string) =>
    ({
      type: "todos/addAsyncTodoFailure",
      payload: error,
    } as const),
};
