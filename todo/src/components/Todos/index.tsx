import { useEffect, useState } from 'react'
import { useTodos } from '../../hooks/useTodos'
import { Todo } from '../../types'
import { EmptyTodoList } from './components/EmptyTodoList'

import { TodoForm } from './components/TodoForm'
import { TodoDetails } from './components/TodoDetails'
import { TodosList } from './components/TodosList'

import styles from './styles.module.css'

export const Todos = () => {
  const { todos, addTodo, completeTodo, deleteTodo, todosCompletedTotal } = useTodos()

  return (
    <div className={styles.container}>
      <TodoForm onAddTodo={addTodo}/>
      
      <TodoDetails
        todosTotal={todos.length} 
        todosCompletedTotal={todosCompletedTotal} 
      />
      {!todos.length ? <EmptyTodoList /> : (
        <TodosList 
          todos={todos}
          onCompleteTodo={completeTodo} 
          onDeleteTodo={deleteTodo} 
        />
      )}
    </div>
  )
}