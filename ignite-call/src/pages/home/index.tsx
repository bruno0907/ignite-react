import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import appPreviewImg from '../../assets/appPreviewImg.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={appPreviewImg}
          width={696}
          quality={100}
          priority
          alt="Imagem do calendário de apresentação da aplicação"
        />
      </Preview>
    </Container>
  )
}
