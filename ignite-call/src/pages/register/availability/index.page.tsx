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
  FormErrors,
} from './styles'
import { Container, Header } from '../styles'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeekDays } from '../../../utils/get-week-days'

const intervalFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    }),
})

type IntervalFormProps = z.infer<typeof intervalFormSchema>

export default function Availability() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(intervalFormSchema),
    defaultValues: {
      intervals: [
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
    name: 'intervals',
  })

  const weekDay = getWeekDays()

  const intervals = watch('intervals')

  function handleSetAvailability(data: IntervalFormProps) {
    console.log({ data })
  }

  function handleErrors() {
    console.log({ errors })
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
          onSubmit={handleSubmit(handleSetAvailability, handleErrors)}
        >
          <AvailabilityContainer>
            {fields.map((field, i) => {
              return (
                <AvailabilityItem key={field.id}>
                  <AvailabilityDay>
                    <Controller
                      name={`intervals.${field.weekDay}.enabled`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )}
                    />
                    <Text size="sm">{weekDay[field.weekDay]}</Text>
                  </AvailabilityDay>
                  <AvailabilityInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervals[i].enabled === false}
                      {...register(`intervals.${i}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervals[i].enabled === false}
                      {...register(`intervals.${i}.endTime`)}
                    />
                  </AvailabilityInputs>
                </AvailabilityItem>
              )
            })}
          </AvailabilityContainer>
          {errors.intervals && (
            <FormErrors size="sm">{errors.intervals.message}</FormErrors>
          )}
          <Button disabled={isSubmitting}>
            Próximo Passo
            <ArrowRight />
          </Button>
        </AvailabilityBox>
      </Container>
    </>
  )
}
