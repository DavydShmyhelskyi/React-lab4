import React from "react";

const TodoItem = React.memo(function TodoItem({ todo, onDelete, onToggle, children }) {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
      </div>

      {children ? (
        children
      ) : (
        <span className={todo.completed ? "completed" : ""}>
          {todo.todo}
        </span>
      )}

      <button onClick={onDelete}>Delete</button>
    </li>
  );
});

export default TodoItem;
