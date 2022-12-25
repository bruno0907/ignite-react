import { GetStaticProps } from "next"
import Image from "next/image"
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"

import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home"

interface HomeProps {
  products: ProductProps[]
}

interface ProductProps {
  id: string; 
  isActive: true,  
  price: string;
  description: string;
  imageUrl: string;
  name: string;  
  createdAt: Date;
  updatedAt: Date;  
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  })  

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      
      { products.map(product =>         
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt={product.description} />
          <footer>
            <strong>{product.name}</strong>
            <span>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',              
            }).format(Number(product.price))}</span>
          </footer>
        </Product>
        
      )}

    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })  

  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100,
      createdAt: product.created,
      updatedAt: product.updated
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 24 // 1 day
  }
}