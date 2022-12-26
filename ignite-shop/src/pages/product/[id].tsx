import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductPageProps {
  product: {
    id: string; 
    isActive: true,  
    price: string;
    defaultPriceId: string;
    description: string;
    imageUrl: string;
    name: string;  
    createdAt: Date;
    updatedAt: Date;  
  } 
}



export default function Product({ product }: ProductPageProps) { 
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const router = useRouter()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {      
        priceId: product.defaultPriceId      
      })

      const { checkoutSessionUrl } = response.data

      router.push(checkoutSessionUrl)
      
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Erro ao realizar a compra')

    }
  }

  if(router.isFallback) {
    return (
      <p>Carregando...</p>
    )
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt={product.description} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button
          onClick={handleBuyProduct}
          disabled={isCreatingCheckoutSession}
        >
          {isCreatingCheckoutSession ? 'Comprando...' : 'Comprar agora'}          
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id
  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    description: response.description,
    imageUrl: response.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount! / 100),
    defaultPriceId: price.id,
    createdAt: response.created,
    updatedAt: response.updated
  }

  return {
    props: { 
      product 
    },
    revalidate: 60 * 60 * 24 // 1 day
  }
}