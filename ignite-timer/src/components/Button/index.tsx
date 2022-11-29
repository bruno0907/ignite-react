import { ButtonContainer, ButtonVariant } from './styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'green-500' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Click me!</ButtonContainer>
}
