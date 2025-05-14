import { Order, Product, User } from '../../types/payload'

import * as React from 'react'

interface ReceiptEmailProps {
  orderId: Order['id']
  email: User['email']
  date: Date
  products: Product[]
}

export const ReceiptEmail = ({ email, date, orderId, products }: ReceiptEmailProps) => {
  const total = products.reduce((acc, curr) => acc + curr.retail_price, 0) + 1

  // Create a template from react email
  return (
    <>
      <p>{total}</p>
      <p>{email}</p>
      <p>{date.toISOString()}</p>
      <p>{orderId}</p>
    </>
  )
}

// export const ReceiptEmailHtml = (props: ReceiptEmailProps) =>
//   render(<ReceiptEmail {...props} />, {
//     pretty: true,
//   });
