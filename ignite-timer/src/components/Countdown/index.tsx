import { CountownContainer, Separator } from "./styles"

type CountdownProps = {
  minutes: string;
  seconds: string;
}

export const Countdown = ({ minutes, seconds }: CountdownProps) => {
  
  return (
    <CountownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountownContainer>
  )
}