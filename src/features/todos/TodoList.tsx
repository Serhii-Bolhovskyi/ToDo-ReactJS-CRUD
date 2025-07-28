import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../root.ts";
import TodoListItem from "./TodoListItem.tsx";

const selectTodoIds = (state: RootState): number[] =>
  state.todos.todos
    .slice()
    .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
    .map((todo) => todo.id);

function TodoList() {
  // const todos = useSelector((state) => state.todos);
  const todoIds = useSelector(selectTodoIds, shallowEqual);

  return (
    <ul>
      {todoIds.map((todoId) => (
        <TodoListItem key={todoId} id={todoId} />
      ))}
    </ul>
  );
}

export default TodoList;
