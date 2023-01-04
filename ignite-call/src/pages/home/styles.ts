import { Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  display: 'flex',
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    color: '$white',

    '@media(max-width: 600px)': { fontSize: '$6xl' },
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginTop: '$2',
    fontWeight: '$regular',

    '@media(max-width: 600px)': { fontSize: 'lg' },
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
