import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // нові стани
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  // фетч + пагінація
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

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const updated = { completed: !todo.completed };

      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 1,
        }),
      });

      const data = await response.json();
      setTodos((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editTodoTitle = async (id, newTitle) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });

      const data = await response.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? data : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredTodos = todos.filter((t) =>
    t.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToNextPage = () => {
    if (currentPage * limitPerPage < totalTodos)
      setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    todos: filteredTodos,
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
  };
}
