import { styled } from "../styles"

const Button = styled('button', {
  padding: '8px 16px',
  backgroundColor: '$green500',
  borderRadius: 4,
  border: 0,
  cursor: 'pointer'
})

export default function Home() {
  return (
    <>
      <h1>Welcome Next App</h1>
      <Button>Press me!</Button>
    </>
  )
}
