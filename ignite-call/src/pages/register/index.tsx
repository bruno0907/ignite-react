import { Button, Heading, Text, MultiStep, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Form, FormError, Header } from './styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
  const { query } = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchemaProps>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleSubmitRegister(values: RegisterFormSchemaProps) {
    console.log({ values })
  }

  async function handleRegisterErrors(error: any) {
    console.log({ error })
  }

  useEffect(() => {
    if (query?.username) {
      setValue('username', String(query.username))
    }
  }, [query?.username, setValue])
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar suas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form
        as="form"
        onSubmit={handleSubmit(handleSubmitRegister, handleRegisterErrors)}
      >
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
          {errors.username && (
            <FormError size="sm">{errors.username?.message}</FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
