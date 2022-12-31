import { styled } from './styles'

const Button = styled('button', {
  fontFamily: '$default',
  backgroundColor: '$ignite500',
  padding: '$4',
  borderRadius: '$md',
})

export default function App() {
  return <Button>Hello</Button>
}
