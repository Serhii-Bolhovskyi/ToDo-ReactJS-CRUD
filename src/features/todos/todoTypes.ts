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
  | { type: "todos/addAsyncTodoFailure"; payload: string }
  // Екшени для асинхронного оновлення
  | {
      type: "todos/updateAsyncTodoRequest";
      payload: { id: number; isCompleted: boolean };
    }
  | { type: "todos/updateAsyncTodoSuccess"; payload: Todo }
  | { type: "todos/updateAsyncTodoFailure"; payload: string }
  // екшени для асинхронного видалення
  | { type: "todos/deleteAsyncTodoRequest"; payload: number }
  | { type: "todos/deleteAsyncTodoSuccess"; payload: number }
  | { type: "todos/deleteAsyncTodoFailure"; payload: string };

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
  updateAsyncTodoRequest: (todo: { id: number; isCompleted: boolean }) =>
    ({
      type: "todos/updateAsyncTodoRequest",
      payload: todo,
    } as const),
  updateAsyncTodoSuccess: (todo: Todo) =>
    ({
      type: "todos/updateAsyncTodoSuccess",
      payload: todo,
    } as const),
  updateAsyncTodoFailure: (error: string) =>
    ({
      type: "todos/updateAsyncTodoFailure",
      payload: error,
    } as const),
  deleteAsyncTodoRequest: (id: number) =>
    ({
      type: "todos/deleteAsyncTodoRequest",
      payload: id,
    } as const),
  deleteAsyncTodoSuccess: (id: number) =>
    ({
      type: "todos/deleteAsyncTodoSuccess",
      payload: id,
    } as const),
  deleteAsyncTodoFailure: (error: string) =>
    ({
      type: "todos/deleteAsyncTodoFailure",
      payload: error,
    } as const),
};
