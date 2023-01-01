import { StoryObj, Meta } from '@storybook/react'
import { Heading, HeadingProps } from '@ignite-ui/react'

export default {
  title: 'Typograph/Heading',
  component: Heading,
  args: {
    children: 'Heading Title.'
  },
  argTypes: {
    size: {
      options: [
        'sm',
        'md',
        'lg',        
        '2xl',
        '4xl',
        '5xl',
        '6xl',        
      ],
      control: {
        type: 'inline-radio'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Por padrão todo componente Heading sempre será um `h2`, porém podemos alterar isso com a propriedade `as`'
      }
    }
  }
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 Heading.',
    as: 'h1'
  }  
}
