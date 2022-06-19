import Clipboard from '../../assets/clipboard.svg'
import Plus from '../../assets/plus.svg'

export const Content = () => {
  return (
    <div>
      <form>
        <input type="text" name="todo" />
        <button type="submit">Criar <img src={Plus} /></button>
      </form>
      <div>
        <p>Tarefas criadas <span>0</span></p>
        <p>Concluídas <span>0</span></p>
      </div>

      <div>
        <img src={Clipboard} alt="Imagem de nenhuma tarefa cadastrada" />
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <br/>
          Crie tarefas e organize seus itens a fazer          
        </p>
      </div>
    </div>
  )
}