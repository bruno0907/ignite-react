import { Box, styled } from '@ignite-ui/react'

export const AvailabilityBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const AvailabilityContainer = styled('div', {
  border: 'solid 1px $gray600',
  borderRadius: '$md',
  marginBottom: '$4',
})

export const AvailabilityItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: 'solid 1px $gray600',
  },
})

export const AvailabilityDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const AvailabilityInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(70%) saturate(0%)',
  },

  input: {
    color: '$gray200',
  },
})
