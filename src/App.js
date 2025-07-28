import React from "react";
import Form from "./features/form/Form.tsx";
import TodoList from "./features/todos/TodoList.tsx";

function App() {
  return (
    <div className="App">
      <Form />
      <TodoList />
    </div>
  );
}
export default App;
