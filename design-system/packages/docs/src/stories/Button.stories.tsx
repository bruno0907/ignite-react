import { StoryObj, Meta } from '@storybook/react'
import { Button, ButtonProps } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'


export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Click Me!'    
  }
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {}

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    variant: 'secondary'    
  }
}

export const Tertiary: StoryObj<ButtonProps> = {
  args: {
    children: 'Cancel',
    variant: 'tertiary'    
  }
}

export const Small: StoryObj<ButtonProps> = {
  args: {
    size: 'sm'    
  }
}

export const Disabled: StoryObj<ButtonProps> = {
  args: {
    disabled: true
  }
}

export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    children: (
      <>
        <ArrowRight weight='bold'/>
        Next step
      </>
    )
  }
}


