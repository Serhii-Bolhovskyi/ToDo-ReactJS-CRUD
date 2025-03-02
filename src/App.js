import { useState } from "react";

const tasksForToDo = [
  {
    id: 123,
    text: "Clean room",
    isDone: false,
  },
  {
    id: 124,
    text: "Go to grocery",
    isDone: false,
  },
];

function App() {
  const [taskArr, setTaskArr] = useState(tasksForToDo);
  const [taskText, setTaskText] = useState("");

  function handleAddTask(task) {
    setTaskArr((taskArr) => [...taskArr, task]);
  }

  function toggleIsDone(id) {
    setTaskArr((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTaskArr((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleEditText(id, newText) {
    setTaskArr((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  return (
    <div className="App">
      <FormTask
        taskText={taskText}
        OnSetTaskText={setTaskText}
        onAddTask={handleAddTask}
      />
      <TaskList
        taskArr={taskArr}
        onToggleIsDone={toggleIsDone}
        onDeleteTask={handleDeleteTask}
        onEditText={handleEditText}
      />
    </div>
  );
}

function FormTask({ taskText, OnSetTaskText, onAddTask }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      isDone: false,
    };

    onAddTask(newTask);
    OnSetTaskText("");
  }
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write your task"
        value={taskText}
        onChange={(e) => OnSetTaskText(e.target.value)}
      />
      <button className="submit-btn">Submit</button>
    </form>
  );
}

function TaskList({ taskArr, onToggleIsDone, onDeleteTask, onEditText }) {
  return (
    <ul>
      {taskArr
        .sort((a, b) => a.isDone - b.isDone)
        .map((task) => (
          <Task
            task={task}
            key={task.id}
            onToggleIsDone={onToggleIsDone}
            onDeleteTask={onDeleteTask}
            onEditText={onEditText}
          />
        ))}
    </ul>
  );
}

function Task({ task, onToggleIsDone, onDeleteTask, onEditText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleSaveEdit() {
    if (!editText) onDeleteTask(task.id);
    onEditText(task.id, editText);
    setIsEditing(false);
  }

  return (
    <li className={task.isDone ? "completed" : ""}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => onToggleIsDone(task.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSaveEdit}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{task.text}</span>
      )}

      <div className="todo-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;
