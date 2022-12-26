import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { priceId } = request.body  

  if(request.method !== 'POST') {
    return response.status(405).json({
      error: 'Method not allowed.'
    })
  }

  if(!priceId) {
    return response.status(400).json({
      error: 'Price not found.'
    })
  }

  const checkoutLineItems: Stripe.Checkout.SessionCreateParams.LineItem = {
    price: priceId,
    quantity: 1
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/cancel`,
    line_items: [
      checkoutLineItems
    ]
  })

  return response.status(201).json({
    checkoutSessionUrl: checkoutSession.url
  })
}