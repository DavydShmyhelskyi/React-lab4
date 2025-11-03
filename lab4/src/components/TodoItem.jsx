import React, { useState, memo, useCallback } from "react";

const TodoItem = memo(({ todo, onToggle, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.todo);

  const handleSave = useCallback(() => {
    if (!title.trim()) return;
    onSave(todo.id, title);
    setIsEditing(false);
  }, [title, onSave, todo.id]);

  console.log("render", todo.id); // debug: має показуватись лише один ID при toggle

  return (
    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              flex: 1,
            }}
          >
            {todo.todo}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

export default TodoItem;
