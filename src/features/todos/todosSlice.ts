import { Todo, TodoAction, TodosState } from "./todoTypes.ts";

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null
};

function nextTodoId(todos) {
  const maxId = todos.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}
function todosReducer(
  state: TodosState = initialState,
  action: TodoAction
): TodosState {
  switch (action.type) {
   case "todos/fetchTodosRequest": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "todos/fetchTodosSuccess": {
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null,
      };
    }
    case "todos/fetchTodosFailure": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "todos/todoAdded": {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
          id: nextTodoId(state),
          text: action.payload.text,
          categoryId: action.payload.categoryId,
          deadline: action.payload.deadline,
          isCompleted: false,
          completeDate: null,
        },
      ]
    }
    }
    // case "todos/todoToggled": {
    //   return state.map((todo) => {
    //     if (todo.id !== action.payload) {
    //       return todo;
    //     }
    //     return {
    //       ...todo,
    //       completed: !todo.completed,
    //       completeDate: !todo.completed ? new Date() : null,
    //     };
    //   });
    // }
    // case "todos/todoDeleted": {
    //   return state.filter((todo) => todo.id !== action.payload);
    // }
    default: {
      return state;
    }
  }
}

export default todosReducer;
