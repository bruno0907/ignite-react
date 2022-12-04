import { differenceInSeconds } from "date-fns";
import { useEffect } from "react";
import { useCycles } from "../../hooks/useCycles";

import { CountownContainer, Separator } from "./styles"

export const Countdown = () => {
  const { 
    activeCycle, 
    activeCycleId, 
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    totalSeconds,
    setAmountSecondsPassed 
  } = useCycles()  
    
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesToShow = String(minutesAmount).padStart(2, '0')
  const secondsToShow = String(secondsAmount).padStart(2, '0')


  useEffect(() => {
    let interval: number

    if (activeCycle) {
      const countdown = () => {
        const secondsCountdownDifference = differenceInSeconds(
          new Date(), 
          new Date(activeCycle.startedAt)
        )

        if (secondsCountdownDifference >= totalSeconds) {
          markCurrentCycleAsFinished()          
          setAmountSecondsPassed(totalSeconds)          
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsCountdownDifference)
        }
      }
      
      interval = setInterval(countdown, 1000)
    }

    return () => {
      clearInterval(interval)
    }
    
  }, [activeCycle, totalSeconds,activeCycleId])

  useEffect(() => {
    activeCycle 
    ? document.title = `${minutesToShow}:${secondsToShow}`
    : document.title = 'Ignite Timer'    

  }, [minutesToShow, secondsToShow, activeCycle])

  return (
    <CountownContainer>
      <span>{minutesToShow[0]}</span>
      <span>{minutesToShow[1]}</span>
      <Separator>:</Separator>
      <span>{secondsToShow[0]}</span>
      <span>{secondsToShow[1]}</span>
    </CountownContainer>
  )
}