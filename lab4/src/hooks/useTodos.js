import { useEffect, useState, useMemo, useCallback } from "react";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  // --- fetch ---
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://dummyjson.com/todos?limit=${limitPerPage}&skip=${
        (currentPage - 1) * limitPerPage
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
        setTotalTodos(data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [currentPage, limitPerPage]);

  // --- CRUD with stable refs ---
  const addTodo = useCallback(async (text) => {
    try {
      const res = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: text, completed: false, userId: 1 }),
      });
      const data = await res.json();
      setTodos((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const toggleTodo = useCallback(async (id) => {
    setTodos((prev) => {
      const i = prev.findIndex((t) => t.id === id);
      if (i === -1) return prev;
      const updated = { ...prev[i], completed: !prev[i].completed };
      const copy = [...prev];
      copy[i] = updated;
      return copy;
    });

    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const editTodoTitle = useCallback(async (id, newTitle) => {
    setTodos((prev) => {
      const i = prev.findIndex((t) => t.id === id);
      if (i === -1) return prev;
      const updated = { ...prev[i], todo: newTitle };
      const copy = [...prev];
      copy[i] = updated;
      return copy;
    });

    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // --- pagination + search ---
  const filteredIds = useMemo(() => {
    return todos
      .filter((t) =>
        t.todo.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((t) => t.id);
  }, [todos, searchTerm]);

  const getTodoById = useCallback(
    (id) => todos.find((t) => t.id === id),
    [todos]
  );

  const goToNextPage = useCallback(() => {
    setCurrentPage((p) => (p * limitPerPage < totalTodos ? p + 1 : p));
  }, [limitPerPage, totalTodos]);

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
    totalTodos,
    limitPerPage,
    setLimitPerPage,
    todoIds: filteredIds,
    getTodoById,
  };
}
