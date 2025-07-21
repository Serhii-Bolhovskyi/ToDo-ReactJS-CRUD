import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store.ts";
import TodoListItem from "./TodoListItem.tsx";

const selectTodoIds = (state: RootState): number[] =>
  state.todos
    .slice()
    .sort((a, b) => Number(a.completed) - Number(b.completed))
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
