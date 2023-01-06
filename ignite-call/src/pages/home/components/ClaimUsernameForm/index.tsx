import { useRouter } from 'next/router'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O usuário deve ser de no mínimo 3 caracteres')
    .max(45, 'O usuário não deve ultrapassar 45 caracteres')
    .regex(/^([a-z\\-]+)$/i, {
      message: 'São permitidos no nome de usuário apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameProps = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameProps>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsernameSubmit(data: ClaimUsernameProps) {
    const { username } = data
    return new Promise((resolve, reject) => {
      resolve(
        setTimeout(
          () =>
            router.push({
              pathname: '/register',
              query: {
                username,
              },
            }),
          1250,
        ),
      )
    })
  }

  function handleClaimUsernameSubmitErrors(error: any) {
    console.log({ error })
  }

  return (
    <>
      <Form
        as="form"
        onSubmit={handleSubmit(
          handleClaimUsernameSubmit,
          handleClaimUsernameSubmitErrors,
        )}
      >
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button type="submit" size="sm">
          Reservar usuário
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome de usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
