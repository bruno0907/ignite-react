import { ComponentProps, ElementType } from "react";
import { styled } from "../styles";

export const Heading = styled('h2', {
  fontFamily: '$default',
  lineHeight: '$shorter',
  margin: 0,
  color: '$gray100',

  variants: {
    size: {
      sm: { fontSize: '$xl'},
      md: { fontSize: '$2xl'},
      lg: { fontSize: '$4xl'},      
      '2xl': { fontSize: '5$xl'},
      '3xl': { fontSize: '6$xl'},
      '4xl': { fontSize: '7$xl'},
      '5xl': { fontSize: '8$xl'},
      '6xl': { fontSize: '9$xl'}      
    }
  },

  defaultVariants: {
    size: 'md'
  }
})

export interface HeadingProps extends ComponentProps<typeof Heading> {
  as?: ElementType;
}