import React, { useEffect } from "react";
import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../root.ts";
import { AppDispatch } from "../../store.ts";

import CategoryList from "../categories/CategoryList.tsx";
import { todoActions } from "../todos/todoTypes.ts";

function Form() {
  const [text, setText] = useState<string>("");
  const [selectedCatId, setSelectedCatId] = useState<number>(1);
  const [deadline, setDeadline] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(todoActions.fetchTodosRequest());
  }, [dispatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim() || !selectedCatId) return;

    const selectedCategory = categories.find(
      (cat) => Number(cat.id) === selectedCatId
    );

    dispatch({
      type: "todos/addAsyncTodoRequest",
      payload: { title: text, categoryId: selectedCatId, deadline },
    });
    setText("");
    setSelectedCatId(1);
    setDeadline(null);
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write your task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <CategoryList
        selectedCatId={selectedCatId}
        onSetSelectedCatId={setSelectedCatId}
      />
      <input
        type="date"
        value={deadline || ""}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="submit-btn">Submit</button>
    </form>
  );
}

export default Form;
