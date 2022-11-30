import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${props => props.theme['gray-100']};
  }
`

export const HistoryListWrapper = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    line-height: 1.6;      

    th {
      background-color: ${props => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${props => props.theme['gray-100']};

      &:first-child {        
        padding-left: 1.5rem;
      }
      &:last-child {        
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};
      padding: 1rem;

      &:first-child {        
        padding-left: 1.5rem;
        width: 50%;
      }
      &:last-child {        
        padding-right: 1.5rem;
      }
    }

  }
`

const STATUS_COLORS = {
  ongoing: 'yellow-500',
  done: 'green-500',
  stopped: 'red-500'
} as const

interface StatusProps {
  taskStatus: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: ${props => props.theme[STATUS_COLORS[props.taskStatus]]};
  }
`