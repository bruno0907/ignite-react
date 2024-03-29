import { GetStaticProps } from "next"
import Image from "next/image"
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"

import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home"
import Link from "next/link"

interface HomeProps {
  products: {
    id: string; 
    isActive: true,  
    price: string;
    description: string;
    imageUrl: string;
    name: string;  
    createdAt: Date;
    updatedAt: Date;  
  }[]
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
      { products.map(product => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt={product.description} />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        }
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
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