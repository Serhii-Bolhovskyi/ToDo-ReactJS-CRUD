export interface TodoCategory {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  text: string;
  category: TodoCategory;
  deadline?: string;
  completed: boolean;
  completeDate?: Date | null;
}

export type TodoAction =
  | {
      type: "todos/todoAdded";
      payload: { text: string; category: TodoCategory; deadline?: string };
    }
  | { type: "todos/todoToggled"; payload: number }
  | { type: "todos/todoDeleted"; payload: number };
