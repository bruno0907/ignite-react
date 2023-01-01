import { ComponentProps, ElementType } from "react";
import { styled } from "../styles";

export const Box = styled('div', {
  padding: '$4',
  borderRadius: '$md',
  backgroundColor: '$gray800',
  border: 'solid 1px $gray600',
  width: '100%'  
})

export interface BoxProps extends ComponentProps<typeof Box> {
  as?: ElementType;
}

Box.displayName = 'Box'