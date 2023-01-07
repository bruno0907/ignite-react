import { Box, styled, Text } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: 'solid 1px $gray600',
  padding: '$4 $6',
  borderRadius: '$md',
  marginBottom: '$3',
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4',
})
