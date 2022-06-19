import { Dispatch, FormEvent, useEffect, useRef, useState } from 'react';
import Plus from '../../../../assets/plus.svg'
import { Todo } from '../../../../types';

import styles from './styles.module.css'

type TodoFormProps = {
  onAddTodo: Dispatch<React.SetStateAction<Todo>>;
}

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const todoInputRef = useRef<HTMLInputElement>(null)  
  
  const [error, setError] = useState(false)

  function clearError() {
    error && setError(false)
  }

  function handleAddNewTodo(e: FormEvent) {
    e.preventDefault()

    if(!todoInputRef.current.value) {
      setError(true)
      return
    }

    const newTodo: Todo = {
      id: `todo#${new Date().toISOString()}`,
      todo: todoInputRef.current.value,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    onAddTodo(newTodo)
    todoInputRef.current.value = ''

    return
  }  

  return (
    <form className={styles.container} onSubmit={handleAddNewTodo}>
      <div>
        <input 
          type="text" 
          name="todo" 
          placeholder="Adicione uma nova tarefa"
          ref={todoInputRef}
          onChange={clearError}
          />
        {error && <span>Você deve informar uma tarefa!</span>}                
      </div>
      <button type="submit">Criar <img src={Plus} /></button>
    </form>
  )
}