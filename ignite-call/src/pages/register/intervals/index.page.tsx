import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Header } from '../styles'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeekDays } from '../../../utils/get-week-days'
import { convertTimeStringToMinutes } from '../../../utils/convert-timeString-to-minutes'
import { api } from '../../../lib/axios'

import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'

import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  FormErrors,
} from './styles'

import { ArrowRight } from 'phosphor-react'

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
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      })),
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        ),
      {
        message:
          'O horário de término deve ser de pelo menos 1h distante do horário de início.',
      },
    ),
})

type IntervalFormInput = z.input<typeof intervalFormSchema>
type IntervalFormOutput = z.output<typeof intervalFormSchema>

export default function Intervals() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<IntervalFormInput>({
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

  async function handleSetIntervals(data: any) {
    try {
      const { intervals } = data as IntervalFormOutput
      await api.post('users/intervals', {
        intervals,
      })
      await router.push('/register/update-profile')
    } catch (error) {
      console.log(error)
    }
  }

  function handleErrors(e: any) {
    console.log(e)
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
        <IntervalBox
          as="form"
          onSubmit={handleSubmit(handleSetIntervals, handleErrors)}
        >
          <IntervalContainer>
            {fields.map((field, i) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
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
                  </IntervalDay>
                  <IntervalInputs>
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
                  </IntervalInputs>
                </IntervalItem>
              )
            })}
          </IntervalContainer>
          {errors.intervals && (
            <FormErrors size="sm">{errors.intervals.message}</FormErrors>
          )}
          <Button disabled={isSubmitting}>
            Próximo Passo
            <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  )
}
