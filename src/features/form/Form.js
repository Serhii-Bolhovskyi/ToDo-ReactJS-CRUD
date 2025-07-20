import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryList from "../categories/CategoryList";

function Form() {
  const [text, setText] = useState("");
  const [selectedCatId, setSelectedCatId] = useState("1");
  const [deadline, setDeadline] = useState(null);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !selectedCatId) return;

    const selectedCategory = categories.find(
      (cat) => String(cat.id) === selectedCatId
    );

    dispatch({
      type: "todos/todoAdded",
      payload: { text: text, category: selectedCategory, deadline: deadline },
    });
    setText("");
    setSelectedCatId("1");
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
