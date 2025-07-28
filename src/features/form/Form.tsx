import React from "react";
import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store.ts";

import CategoryList from "../categories/CategoryList.tsx";

function Form() {
  const [text, setText] = useState<string>("");
  const [selectedCatId, setSelectedCatId] = useState<number>(1);
  const [deadline, setDeadline] = useState<string | null>(null);
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.categories);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim() || !selectedCatId) return;

    const selectedCategory = categories.find(
      (cat) => Number(cat.id) === selectedCatId
    );

    dispatch({
      type: "todos/todoAdded",
      payload: { text: text, categoryId: selectedCategory, deadline },
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
