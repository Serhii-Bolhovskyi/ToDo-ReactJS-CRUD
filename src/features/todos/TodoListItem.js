import { useSelector, useDispatch } from "react-redux";

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId);
};

function TodoListItem({ id }) {
  const todo = useSelector((state) => selectTodoById(state, id));
  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch({ type: "todos/todoToggled", payload: todo.id });
  };

  const handleDeletedTodo = () => {
    dispatch({ type: "todos/todoDeleted", payload: todo.id });
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
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
          checked={todo.completed}
          onChange={() => handleCompletedChanged()}
        />
        <div className="info">
          <p className="taskTitle">{todo.text}</p>
          <span>📁 Category: {todo.category?.name}</span>
          {todo.completed ? (
            <span>🕝 Complete at {todo.completeDate.toLocaleString()}</span>
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
}

export default TodoListItem;
