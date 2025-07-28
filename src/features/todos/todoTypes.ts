export interface TodoCategory {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  text: string;
  categoryId: number;
  deadline?: string;
  completeDate?: Date | null;
  isCompleted: boolean;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null
}

export type fetchTodo =
  | { type: "todos/loadStarted" }
  | { type: "todos/loadSucceeded"; payload: Todo[] }
  | { type: "todos/loadFailed"; payload: string };

export type TodoAction =
  | {
      type: "todos/todoAdded";
      payload: { text: string; categoryId: number; deadline?: string };
    }
  | { type: "todos/todoToggled"; payload: number }
  | { type: "todos/todoDeleted"; payload: number }
  | {type :"todos/fetchTodosRequest"}
  | { type: "todos/fetchTodosSuccess"; payload: Todo[] }
  | { type: "todos/fetchTodosFailure"; payload: string };


export const todoActions = {
  fetchTodosRequest: () => ({ type: "todos/fetchTodosRequest" } as const),
  fetchTodosSuccess: (todos: Todo[]) => ({ 
    type: "todos/fetchTodosSuccess", 
    payload: todos 
  } as const),
  fetchTodosFailure: (error: string) => ({ 
    type: "todos/fetchTodosFailure", 
    payload: error 
  } as const),
}