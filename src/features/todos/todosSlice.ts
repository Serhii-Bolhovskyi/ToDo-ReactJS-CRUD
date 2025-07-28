import { Todo, TodoAction } from "./todoTypes.ts";

const initialState: Todo[] = [];

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}
function todosReducer(
  state: Todo[] = initialState,
  action: TodoAction
): Todo[] {
  switch (action.type) {
    case "todos/loadSucceeded":
      return action.payload;
    case "todos/todoAdded": {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload.text,
          categoryId: action.payload.categoryId,
          deadline: action.payload.deadline,
          completed: false,
          completeDate: null,
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

export default todosReducer;
