import React from "react";
import { RootState } from "../../root.ts";
import { Todo } from "./todoTypes.ts";
import { useSelector, useDispatch } from "react-redux";

type TodoListItemProps = {
  id: number;
};

const selectTodoById = (state: RootState, todoId: number): Todo | undefined => {
  return state.todos.todos.find((todo) => todo.id === todoId);
};

const TodoListItem: React.FC<TodoListItemProps> = ({ id }) => {
  const todo = useSelector((state: RootState) => selectTodoById(state, id));
  const categoryName = useSelector((state: RootState) => {
    const category = state.categories.find(
      (cat) => cat.id === todo?.categoryId
    );
    return category?.name || "Unknown";
  });
  const dispatch = useDispatch();

  if (!todo) return null;

  const handleCompletedChanged = () => {
    dispatch({ type: "todos/todoToggled", payload: todo.id });
  };

  const handleDeletedTodo = () => {
    dispatch({ type: "todos/todoDeleted", payload: todo.id });
  };

  return (
    <li className={todo.isCompleted ? "completed" : ""}>
      {/* {isEditing ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleSaveEdit}
                autoFocus
              />
            </>
          ) : (
            <span onDoubleClick={() => setIsEditing(true)}>{task.text}</span>
          )} */}
      <div className="taskInfo">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleCompletedChanged()}
        />
        <div className="info">
          <p className="taskTitle">{todo.text}</p>
          <span>📁 Category: {categoryName}</span>
          {todo.isCompleted ? (
            <span>
              🕝 Complete at{" "}
              {todo.completeDate
                ? new Date(todo.completeDate).toLocaleString()
                : ""}
            </span>
          ) : (
            todo.deadline && <span>🕝 Due: {todo.deadline}</span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn" onClick={handleDeletedTodo}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
