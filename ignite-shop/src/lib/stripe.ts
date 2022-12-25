import Stripe from 'stripe'

const apiKey = process.env.STRIPE_SECRET_API_KEY!

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'ignite-shop'
  }
})