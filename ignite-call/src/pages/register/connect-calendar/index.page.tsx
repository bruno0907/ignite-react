import { Button, Heading, Text, MultiStep } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'

import { useRouter } from 'next/router'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isAuthenticated = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNextStep() {
    await router.push('/register/intervals')
  }

  return (
    <>
      <Head>
        <title>Conecte-se | Ignite Call</title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>
        <ConnectBox>
          <ConnectItem>
            <Text>Google Agenda</Text>
            {isAuthenticated ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google. Verifique se você habilitou as
              permissões ao Google Calendar
            </AuthError>
          )}
          <Button
            type="submit"
            onClick={handleNextStep}
            disabled={!isAuthenticated}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
