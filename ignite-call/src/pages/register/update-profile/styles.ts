import { Box, styled, Text, TextArea } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  [`>${TextArea}`]: {
    width: '100%',
    height: 120,
    resize: 'vertical',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
