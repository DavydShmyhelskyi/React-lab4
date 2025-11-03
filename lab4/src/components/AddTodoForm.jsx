import React, { useState } from "react";

const AddTodoForm = React.memo(function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
});

export default AddTodoForm;
