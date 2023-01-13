import { GetServerSideProps } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'

import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormProps = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const session = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormProps>({
    resolver: zodResolver(updateProfileSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormProps) {
    try {
      await api.post('/users/profile', {
        bio: data.bio,
      })

      await router.push(`/schedule/${session.data?.user.username}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Header>
        <Heading>Atualize seu perfil!</Heading>
        <Text>Por último uma breve descrição e uma foto pro seu perfil.</Text>
        <MultiStep currentStep={4} size={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto do perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt="Foto de perfil do usuário sendo cadastrado"
          />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>
        <Button disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
