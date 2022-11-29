import styled from 'styled-components'

export type ButtonVariant = 'green-500' | 'gray-500' | 'red-500' | 'yellow-500'

interface ButtonContainerProps {
  variant?: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
