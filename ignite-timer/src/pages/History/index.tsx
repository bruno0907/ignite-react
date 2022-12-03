import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import { useCycles } from "../../hooks/useCycles";
import { HistoryContainer, HistoryListWrapper, Status } from "./styles"

export const History = () => {
  const { cycles } = useCycles()
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
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{formatDistanceToNow(cycle.startedAt, {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    {cycle.finishedAt && <Status taskStatus="done">Concluído</Status>}
                    {cycle.interruptedAt && <Status taskStatus="stopped">Interrompido</Status>}
                    {(!cycle.interruptedAt && !cycle.finishedAt) && <Status taskStatus="ongoing">Em Andamento</Status>}
                  </td>
                </tr>

              )
            })}            
          </tbody>
        </table>
      </HistoryListWrapper>
    </HistoryContainer>
  )
};
