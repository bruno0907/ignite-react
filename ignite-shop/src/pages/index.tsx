import Image from "next/image"
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home"

import camiseta1 from '../assets/shirts/1.png'

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      
      { Array.from({ length: 5 }).map((_, i) => {
        return (
          <Product key={i} className="keen-slider__slide">
            <Image src={camiseta1} width={520} height={480} alt="" />
            <footer>
              <strong>Camiseta 1</strong>
              <span>R$ 49,90</span>
            </footer>
          </Product>
        )
      })}

    </HomeContainer>
  )
}
