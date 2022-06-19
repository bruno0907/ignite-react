import { useState, useEffect } from "react"
import { Todo } from "../types"

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem('rocket:todos')
    if(!data) return []
    return JSON.parse(data)
  })

  const [todosCompletedTotal, setTodosCompletedTotal] = useState(0)

  function addTodo(todo: Todo) {
    setTodos(prevState => [...prevState, todo])    
  }

  function completeTodo (id: string) {
    setTodos(prevState => prevState.map(todo => (
      todo.id === id ? {
        ...todo,
        isCompleted: !todo.isCompleted,
        updatedAt: new Date().toISOString()
      } : todo
    )))
  }

  function deleteTodo (id: string) {
    setTodos(prevState => prevState.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('rocket:todos', JSON.stringify(todos))
    setTodosCompletedTotal(todos.filter(todos => todos.isCompleted).length)

  }, [todos])

  return {
    todos,    
    todosCompletedTotal,    
    addTodo,
    completeTodo,
    deleteTodo
  }
}