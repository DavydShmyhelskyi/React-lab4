import { useEffect, useState, useMemo, useCallback } from "react";
import { useTodoStore } from "../stores/useTodoStore";

export function useTodos() {
  const todos = useTodoStore((s) => s.todos);
  const isLoading = useTodoStore((s) => s.isLoading);
  const error = useTodoStore((s) => s.error);
  const total = useTodoStore((s) => s.total);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const editTodoTitle = useTodoStore((s) => s.editTodoTitle);
  const getTodoByIdFromStore = useTodoStore((s) => s.getTodoById);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);

  // fetch when page/limit changes
  useEffect(() => {
    fetchTodos({ limit: limitPerPage, skip: (currentPage - 1) * limitPerPage });
  }, [currentPage, limitPerPage, fetchTodos]);

  const filteredIds = useMemo(() => {
    return todos
      .filter((t) => t.todo.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((t) => t.id);
  }, [todos, searchTerm]);

  const getTodoById = useCallback((id) => getTodoByIdFromStore(id), [getTodoByIdFromStore]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((p) => (p * limitPerPage < total ? p + 1 : p));
  }, [limitPerPage, total]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  return {
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
    totalTodos: total,
    limitPerPage,
    setLimitPerPage,
    todoIds: filteredIds,
    getTodoById,
  };
}
