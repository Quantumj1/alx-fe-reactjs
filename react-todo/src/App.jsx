import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

const initialTodos = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Walk the dog', completed: true },
  { id: 3, text: 'Read a book', completed: false },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)

  function addTodo(text) {
    const next = { id: Date.now(), text, completed: false }
    setTodos((s) => [next, ...s])
  }

  function toggleTodo(id) {
    setTodos((s) => s.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos((s) => s.filter(t => t.id !== id))
  }

  return (
    <div style={{ maxWidth: 700, margin: '24px auto', padding: 16 }}>
      <h1>Todo App</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App
