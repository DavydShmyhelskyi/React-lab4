import { useState, useCallback } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const {
    todos,
    isLoading,
    error,
    deleteTodo,
    toggleTodo,
    addTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    goToNextPage,
    goToPrevPage,
    totalTodos,
    limitPerPage,
    setLimitPerPage,
  } = useTodos();

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Мемоізовані колбеки
  const startEdit = useCallback((todo) => {
    setEditingId(todo.id);
    setNewTitle(todo.todo);
  }, []);

  const saveEdit = useCallback(
    (id) => {
      if (!newTitle.trim()) return;
      editTodoTitle(id, newTitle);
      setEditingId(null);
    },
    [newTitle, editTodoTitle]
  );

  const handleAdd = useCallback(
    (text) => {
      addTodo(text);
    },
    [addTodo]
  );

  const handleDelete = useCallback(
    (id) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleToggle = useCallback(
    (id) => {
      toggleTodo(id);
    },
    [toggleTodo]
  );

  // Рендер
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="app">
      <h1>Todo List</h1>


      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        style={{ marginBottom: "15px", width: "100%", padding: "8px" }}
      />


      <AddTodoForm onAdd={handleAdd} />


      <ul>
        {todos.length === 0 && <p>No todos found.</p>}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
            onToggle={() => handleToggle(todo.id)}
          >
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                  autoFocus
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  className={todo.completed ? "completed" : ""}
                  style={{ flex: 1 }}
                >
                  {todo.todo}
                </span>
                <button onClick={() => startEdit(todo)}>Edit</button>
              </>
            )}
          </TodoItem>
        ))}
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
}
