import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { prisma } from '../../../lib/prisma'
import { ScheduleForm } from './components/ScheduleForm'

interface ScheduleProps {
  user: {
    fullname: string
    bio: string
    avatar_url: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.fullname} | Ignite Call`} />
      <Container>
        <UserHeader>
          <Avatar
            src={user.avatar_url}
            alt={`Foto de perfil do calendário de agendamentos do ${user.fullname}`}
          />
          <Heading>{user.fullname}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>
        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        fullname: user.fullname,
        bio: user.bio,
        avatar_url: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1day
  }
}
