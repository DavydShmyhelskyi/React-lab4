import { useTodos } from "../hooks/useTodos";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { useCallback } from "react";

export default function TodoContainer() {
  const {
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    goToNextPage,
    goToPrevPage,
    totalTodos,
    limitPerPage,
    setLimitPerPage,
    todoIds,
    getTodoById,
  } = useTodos();

  const handleAdd = useCallback((text) => addTodo(text), [addTodo]);
  const handleDelete = useCallback((id) => deleteTodo(id), [deleteTodo]);
  const handleToggle = useCallback((id) => toggleTodo(id), [toggleTodo]);
  const handleSave = useCallback(
    (id, title) => editTodoTitle(id, title),
    [editTodoTitle]
  );

  return (
    <div className="app">
      <h1>Todo List</h1>

      <AddTodoForm onAdd={handleAdd} />

      <TodoList
        isLoading={isLoading}
        error={error}
        todoIds={todoIds}
        getTodoById={getTodoById}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onSave={handleSave}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        totalTodos={totalTodos}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
      />
    </div>
  );
}
