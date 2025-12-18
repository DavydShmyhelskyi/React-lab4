import create from 'zustand'

export const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  total: 0,

  // fetch with pagination
  fetchTodos: async ({ limit = 10, skip = 0 } = {}) => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
      const data = await res.json()
      set({ todos: data.todos || [], total: data.total || 0, isLoading: false })
    } catch (err) {
      set({ error: err.message || String(err), isLoading: false })
    }
  },

  addTodo: async (text) => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: text, completed: false, userId: 1 }),
      })
      const data = await res.json()
      set((state) => ({ todos: [data, ...state.todos], isLoading: false, total: state.total + 1 }))
    } catch (err) {
      set({ error: err.message || String(err), isLoading: false })
    }
  },

  deleteTodo: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, { method: 'DELETE' })
      set((state) => ({ todos: state.todos.filter((t) => t.id !== id), isLoading: false, total: Math.max(0, state.total - 1) }))
    } catch (err) {
      set({ error: err.message || String(err), isLoading: false })
    }
  },

  toggleTodo: async (id) => {
    // optimistic update
    set((state) => {
      const i = state.todos.findIndex((t) => t.id === id)
      if (i === -1) return {}
      const updated = { ...state.todos[i], completed: !state.todos[i].completed }
      const copy = [...state.todos]
      copy[i] = updated
      return { todos: copy }
    })

    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })
    } catch (err) {
      // revert on failure by refetching current page (caller will control)
      set({ error: err.message || String(err) })
    }
  },

  editTodoTitle: async (id, newTitle) => {
    set((state) => {
      const i = state.todos.findIndex((t) => t.id === id)
      if (i === -1) return {}
      const updated = { ...state.todos[i], todo: newTitle }
      const copy = [...state.todos]
      copy[i] = updated
      return { todos: copy }
    })

    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: newTitle }),
      })
    } catch (err) {
      set({ error: err.message || String(err) })
    }
  },

  getTodoById: (id) => {
    const s = get()
    return s.todos.find((t) => t.id === id)
  },
}))
