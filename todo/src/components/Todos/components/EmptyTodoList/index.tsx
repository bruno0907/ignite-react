import Clipboard from '../../../../assets/clipboard.svg'

import styles from './styles.module.css'

export const EmptyTodoList = () => {
  return (
    <div className={styles.container}>
      <img src={Clipboard} alt="Imagem de nenhuma tarefa cadastrada" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <br/>
        Crie tarefas e organize seus itens a fazer          
      </p>
    </div>
  )
}