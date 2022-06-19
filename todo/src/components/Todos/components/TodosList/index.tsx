import Check from '../../../../assets/check.svg';
import { Trash } from '../../../../assets/Trash';

import { Todo } from '../../../../types';

import styles from './styles.module.css'

type TodosListProps = {
  todos: Todo[];
  onCompleteTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodosList = ({ todos, onCompleteTodo, onDeleteTodo }: TodosListProps) => {
  
  return (
    <ul className={styles.container}>
      {todos.map((todo, i) => {
        return (
          <li key={todo.id} className={styles.todoItem}>
            <button 
              className={todos[i].isCompleted ? styles.completedTodoBtn : styles.completeTodoBtn}
              onClick={() => onCompleteTodo(todo.id)}
            >
              {todos[i].isCompleted && <img src={Check} alt="Tarefa concluída"/>}
            </button>            
            <p className={todos[i].isCompleted ? styles.isCompleted : ''}>
              {todo.todo}
            </p>            
            <button
              type="button"
              name="delete-task"
              className={styles.removeTodoBtn}
              onClick={() => onDeleteTodo(todo.id)}
            >
              <Trash />
            </button>
          </li>
        )
      })}
    </ul>
  )
}