import TodoItem from "./TodoItem";
import React, { memo } from "react";

const TodoList = memo(function TodoList({
  isLoading,
  error,
  todoIds,
  getTodoById,
  onDelete,
  onToggle,
  onSave,
  searchTerm,
  setSearchTerm,
  currentPage,
  goToNextPage,
  goToPrevPage,
  totalTodos,
  limitPerPage,
  setLimitPerPage,
}) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        style={{ marginBottom: "15px", width: "100%", padding: "8px" }}
      />

      <ul>
        {todoIds.length === 0 && <p>No todos found.</p>}
        {todoIds.map((id) => {
          const todo = getTodoById(id);
          if (!todo) return null;
          return (
            <TodoItem
              key={id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onSave={onSave}
            />
          );
        })}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} | Total: {totalTodos}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage * limitPerPage >= totalTodos}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <label>
          Items per page:{" "}
          <select
            value={limitPerPage}
            onChange={(e) => setLimitPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>
    </div>
  );
});

export default TodoList;
