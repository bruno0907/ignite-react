import Head from 'next/head'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'

import {
  AvailabilityBox,
  AvailabilityContainer,
  AvailabilityDay,
  AvailabilityInputs,
  AvailabilityItem,
} from './styles'
import { Container, Header } from '../styles'

export default function Availability() {
  return (
    <>
      <Head>
        <title>Disponibilidade | Ignite Call</title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Quase lá</Heading>
          <Text size="sm">
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>
          <MultiStep currentStep={3} size={4} />
        </Header>
        <AvailabilityBox as="form">
          <AvailabilityContainer>
            {['Segunda-feira', 'Terça-feira', 'Quarta-feira'].map((day) => {
              return <AvailabilityComponent key={day} day={day} />
            })}
          </AvailabilityContainer>
          <Button>
            Próximo Passo
            <ArrowRight />
          </Button>
        </AvailabilityBox>
      </Container>
    </>
  )
}

const AvailabilityComponent = ({ day }: { day: string }) => {
  return (
    <AvailabilityItem>
      <AvailabilityDay>
        <Checkbox />
        <Text size="sm">{day}</Text>
      </AvailabilityDay>
      <AvailabilityInputs>
        <TextInput size="sm" type="time" step={60} />
        <TextInput size="sm" type="time" step={60} />
      </AvailabilityInputs>
    </AvailabilityItem>
  )
}
