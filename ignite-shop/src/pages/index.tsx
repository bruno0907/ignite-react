import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import camiseta1 from '../assets/shirts/1.png'

export default function Home() {
  return (
    <HomeContainer>
      
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 49,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 49,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 49,90</span>
        </footer>
      </Product>

    </HomeContainer>
  )
}
