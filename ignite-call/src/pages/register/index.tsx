import Head from 'next/head'
import { Button, Heading, Text, MultiStep, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Form, FormError, Header } from './styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O usuário deve ser de no mínimo 3 caracteres')
    .max(45, 'O usuário não deve ultrapassar 45 caracteres')
    .regex(/^([a-z\\-]+)$/i, {
      message: 'São permitidos no nome de usuário apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  fullname: z
    .string()
    .min(5, 'O seu nome deve ser de no mínimo 5 caracteres')
    .max(85, 'O seu nome não deve ultrapassar 85 caracteres'),
})

type RegisterFormSchemaProps = z.infer<typeof registerFormSchema>

export default function Register() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchemaProps>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleSubmitRegister(data: RegisterFormSchemaProps) {
    try {
      await api.post('/users', {
        username: data.username,
        fullname: data.fullname,
      })
      await router.push('/register/connect-calendar')
    } catch (e) {
      if (e instanceof AxiosError && e?.response?.data.message) {
        setError('username', { message: 'O nome de usuário já está em uso!' })
      }
      console.log({ e })
    }
  }

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <>
      <Head>
        <title>Registre-se | Ignite Call</title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar suas informações depois.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleSubmitRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuario"
              {...register('username')}
            />
            {errors.username && (
              <FormError size="sm">{errors.username?.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('fullname')} />
            {errors.fullname && (
              <FormError size="sm">{errors.fullname?.message}</FormError>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
