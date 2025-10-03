import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

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

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      todo: text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  return { todos, isLoading, error, deleteTodo, toggleTodo, addTodo };
}
