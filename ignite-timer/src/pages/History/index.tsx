import { HistoryContainer, HistoryListWrapper, Status } from "./styles"

export const History = () => {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryListWrapper>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status taskStatus="ongoing">Em andamento</Status>                
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status taskStatus="done">Concluído</Status>                
              </td>
            </tr>
            <tr>
              <td>Descrição da tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status taskStatus="stopped">Interrompido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryListWrapper>
    </HistoryContainer>
  )
};
