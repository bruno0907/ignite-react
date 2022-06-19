import { useTodos } from '../../../../hooks/useTodos';
import styles from './styles.module.css'

type TodoDetailsProps = {
  todosTotal: number;
  todosCompletedTotal: number
}

export const TodoDetails = ({ todosTotal, todosCompletedTotal }: TodoDetailsProps) => { 

  return (
    <div className={styles.container}>
      <p>Tarefas criadas <span>{todosTotal}</span></p>
      <p className={styles.completedTasks}>Concluídas 
        <span>{
        todosTotal 
          ? `${todosCompletedTotal} de ${todosTotal}`
          : todosCompletedTotal
        }</span>
      </p>
    </div>
  )
}