import { useTodos } from "../hooks/useTodos";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { useCallback } from "react";
import { Container, Typography, Paper } from "@mui/material";

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
    
    <Container sx={{ mt: 4, maxWidth: 700 }}>
      <Paper sx={{ p: 3 }} elevation={2}>
        <Typography variant="h5" gutterBottom>
          Todo List
        </Typography>
         <Typography variant="body2" sx={{ mt: 0.5 }}>
          A simple React project to demonstrate hands-on frontend skills: routing, global state management, API data fetching, and basic performance optimizations.
        </Typography>
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
      </Paper>
    </Container>
  );
}
