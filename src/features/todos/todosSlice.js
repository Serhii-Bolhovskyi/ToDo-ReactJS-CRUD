const initialState = [
  {
    id: 1,
    text: "Clean room",
    category: {
      id: 1,
      name: "General",
    },
    isDone: false,
  },
  // {
  //   id: 2,
  //   text: "Go to grocery",
  //   catId: 1,
  //   isDone: false,
  // },
  // {
  //   id: 3,
  //   text: "finish project",
  //   catId: 2,
  //   isDone: false,
  // },
];

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/todoAdded": {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload.text,
          category: action.payload.category,
          deadline: action.payload.deadline,
          completed: false,
        },
      ];
    }
    case "todos/todoToggled": {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
          completeDate: !todo.completed ? new Date() : null,
        };
      });
    }
    case "todos/todoDeleted": {
      return state.filter((todo) => todo.id !== action.payload);
    }
    default: {
      return state;
    }
  }
}
