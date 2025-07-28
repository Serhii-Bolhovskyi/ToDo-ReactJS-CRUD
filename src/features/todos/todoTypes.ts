export interface TodoCategory {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  text: string;
  categoryId: number;
  deadline?: string;
  completed: boolean;
  completeDate?: Date | null;
}

export type LoadTodoAction =
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
  | LoadTodoAction;
