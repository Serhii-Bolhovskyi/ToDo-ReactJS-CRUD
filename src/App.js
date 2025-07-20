import { useEffect, useState } from "react";

const tasksForToDo = [
  {
    id: 123,
    text: "Clean room",
    cat: "Household",
    isDone: false,
  },
  {
    id: 124,
    text: "Go to grocery",
    cat: "General",
    isDone: false,
  },
  {
    id: 125,
    text: "finish project",
    cat: "Study",
    isDone: false,
  },
];

const categories = [
  {
    id: 1,
    name: "General",
  },
  {
    id: 2,
    name: "Study",
  },
  {
    id: 3,
    name: "Personal",
  },
  {
    id: 4,
    name: "Household",
  },
  {
    id: 5,
    name: "Work",
  },
];

function App() {
  const [taskText, setTaskText] = useState("");
  const [selectedCat, setSelectedCat] = useState("General");
  const [deadline, setDeadline] = useState(null);
  const [taskArr, setTaskArr] = useState(tasksForToDo);

  // const [taskArr, setTaskArr] = useState(() => {
  //   try {
  //     const storedValue = localStorage.getItem("taskArr");
  //     return JSON.parse(storedValue);
  //   } catch (e) {
  //     if (!(e instanceof Error)) {
  //       e = new Error(e);
  //     }
  //     console.error(e.message);
  //   }
  // });

  function handleAddTask(task) {
    setTaskArr((taskArr) => [...taskArr, task]);
  }

  function toggleIsDone(id) {
    setTaskArr((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isDone: !task.isDone,
              completeDate: !task.isDone ? new Date() : null,
            }
          : task
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

  // useEffect(
  //   function () {
  //     localStorage.setItem("taskArr", JSON.stringify(taskArr));
  //   },
  //   [taskArr]
  // );

  return (
    <div className="App">
      <FormTask
        taskText={taskText}
        selectedCat={selectedCat}
        deadline={deadline}
        onSetDeadline={setDeadline}
        OnSetTaskText={setTaskText}
        onAddTask={handleAddTask}
        onSetSelectedCat={setSelectedCat}
      />
      <TaskList
        taskArr={taskArr}
        selectedCat={selectedCat}
        onToggleIsDone={toggleIsDone}
        onDeleteTask={handleDeleteTask}
        onEditText={handleEditText}
      />
    </div>
  );
}

function FormTask({
  taskText,
  deadline,
  completeDate,
  OnSetTaskText,
  onSetDeadline,
  onAddTask,
  selectedCat,
  onSetSelectedCat,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      cat: selectedCat,
      deadline,
      completeDate,
      isDone: false,
    };

    onAddTask(newTask);
    onSetSelectedCat("General");
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
      <CategoryList
        selectedCat={selectedCat}
        onSetSelectedCat={onSetSelectedCat}
      />
      <input
        type="date"
        value={deadline || ""}
        onChange={(e) => onSetDeadline(e.target.value)}
      />
      <button className="submit-btn">Submit</button>
    </form>
  );
}

function CategoryList({ selectedCat, onSetSelectedCat }) {
  return (
    <select
      value={selectedCat}
      onChange={(e) => onSetSelectedCat(e.target.value)}
    >
      {categories.map((cat) => (
        <option key={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
}

function TaskList({ taskArr, onToggleIsDone, onDeleteTask, onEditText }) {
  return (
    <ul>
      {taskArr
        ?.sort((a, b) => a.isDone - b.isDone)
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
  // const [isEditing, setIsEditing] = useState(false);
  // const [editText, setEditText] = useState(task.text);

  // function handleSaveEdit() {
  //   if (!editText) onDeleteTask(task.id);
  //   onEditText(task.id, editText);
  //   setIsEditing(false);
  // }

  return (
    <li className={task.isDone ? "completed" : ""}>
      {/* <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => onToggleIsDone(task.id)}
      /> */}

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
          checked={task.isDone}
          onChange={() => onToggleIsDone(task.id)}
        />
        <div className="info">
          <p className="taskTitle">{task.text}</p>
          <span>📁 Category: {task.cat}</span>
          {task.isDone ? (
            <span>🕝 Complete at {task.completeDate.toLocaleString()}</span>
          ) : (
            task.deadline && <span>{task.deadline}</span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;
