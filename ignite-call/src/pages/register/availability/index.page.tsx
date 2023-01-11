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
import { useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeekDays } from '../../../utils/get-week-days'

const availabilityFormSchema = z.object({})

type AvailabilityFormProps = z.infer<typeof availabilityFormSchema>

export default function Availability() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      availability: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '17:00' },
        { weekDay: 1, enabled: true, startTime: '07:00', endTime: '16:00' },
        { weekDay: 2, enabled: false, startTime: '09:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '07:00', endTime: '16:00' },
        { weekDay: 4, enabled: false, startTime: '10:00', endTime: '19:00' },
        { weekDay: 5, enabled: true, startTime: '09:00', endTime: '15:00' },
        { weekDay: 6, enabled: false, startTime: '00:00', endTime: '00:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'availability',
  })

  const weekDay = getWeekDays()

  function handleSetAvailability(data: AvailabilityFormProps) {
    console.log({ data })
  }

  function handleSetAvailabilityErrors(error: AvailabilityFormProps) {
    console.log({ error })
  }

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
        <AvailabilityBox
          as="form"
          onSubmit={handleSubmit(
            handleSetAvailability,
            handleSetAvailabilityErrors,
          )}
        >
          <AvailabilityContainer>
            {fields.map((availability) => {
              return (
                <AvailabilityItem key={availability.id}>
                  <AvailabilityDay>
                    <Checkbox checked={availability.enabled} />
                    <Text size="sm">{weekDay[availability.weekDay]}</Text>
                  </AvailabilityDay>
                  <AvailabilityInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(
                        `availability.${availability.weekDay}.startTime`,
                      )}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(
                        `availability.${availability.weekDay}.endTime`,
                      )}
                    />
                  </AvailabilityInputs>
                </AvailabilityItem>
              )
            })}
          </AvailabilityContainer>
          <Button disabled={isSubmitting}>
            Próximo Passo
            <ArrowRight />
          </Button>
        </AvailabilityBox>
      </Container>
    </>
  )
}
