import Icon from '@/components/base/Icon'
import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'
import ProductOrder from '@/components/order/ProductOrder'
import PaymentStatus from '@/components/status/PaymentStatus'
import routes from '@/lib/routes'
import { getUser } from '@/services/auth'
import { getOrder } from '@/services/orders'
import { formatPrice } from '@/utils'
import { format } from 'date-fns'
import { notFound, redirect } from 'next/navigation'

const ThankYou = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const orderId = (await params).orderId as string

  const { user } = await getUser()
  const order = await getOrder(orderId, 3)

  if (!order) return notFound()

  const orderUserId = typeof order.user === 'string' ? order.user : order.user.id

  if (orderUserId !== user?.id) {
    return redirect(`${routes.auth.login}?origin=thank-you?orderId=${order.id}`)
  }

  return (
    <MainContainer className="flex flex-col gap-8 pb-12 pt-6 lg:gap-12">
      {/* Back to Shopping */}
      <Link
        href={routes.products.home}
        className="flex w-fit items-center gap-2 py-2 font-semibold text-primary-700 hover:text-secondary"
      >
        <Icon icon="solar:arrow-left-linear" className="text-xl" />
        Continue Shopping
      </Link>

      <div className="lg:flex lg:justify-between lg:gap-x-16 xl:gap-x-32">
        <div className="flex flex-col gap-8 lg:h-fit lg:w-[45%] lg:gap-10 xl:w-1/2">
          <PaymentStatus order={order} />

          {/* Order Details */}
          <div className="grid grid-cols-4 gap-y-12 border-y border-primary-300 py-6 md:divide-x md:divide-primary-300 lg:divide-x-0 xl:divide-x">
            <div className="col-span-4 text-md md:col-span-2 lg:col-span-4 xl:col-span-2">
              <p className="font-medium text-primary-500">Order Number</p>
              <p className="font-semibold text-foreground">{order.id}</p>
            </div>
            <div className="col-span-2 text-md md:col-span-1 md:flex lg:col-span-2 xl:col-span-1">
              <div className="mx-auto lg:mx-0 xl:mx-auto">
                <p className="font-medium text-primary-500">Date</p>
                <p className="font-semibold text-foreground">
                  {format(new Date(order.createdAt), 'dd MMMM yyyy')}
                </p>
              </div>
            </div>
            <div className="col-span-2 text-md md:col-span-1 md:flex lg:col-span-2 xl:col-span-1">
              <div className="mx-auto lg:mx-0 xl:mx-auto">
                <p className="font-medium text-primary-500">Method</p>
                <p className="font-semibold text-foreground">Cart</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:h-fit lg:w-[50%] lg:rounded-2xl lg:border lg:border-primary-300 lg:p-6 xl:w-1/2">
          <h1 className="hidden text-2xl font-bold lg:block">Order Summary</h1>

          {/* Products */}
          <ul className="-mt-px divide-y divide-primary-300/50 border-y border-primary-300">
            {order.products.map(({ product, size, price }, index) => {
              if (typeof product !== 'string') {
                return (
                  <li key={index}>
                    <ProductOrder product={product} size={size} price={price} />
                  </li>
                )
              }
              return null
            })}
          </ul>

          {/* Subtotal */}
          <div className="flex flex-col gap-2 text-md text-primary-600 lg:text-base">
            <div className="flex items-center justify-between gap-8">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">{formatPrice(order.details?.subtotal || 0)}</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="font-medium">Delivery</span>
              <span className="font-medium">{formatPrice(order.details?.delivery || 0)}</span>
            </div>
            {order.details?.discount && (
              <div className="flex items-center justify-between gap-8">
                <span className="font-medium">Discount</span>
                <span className="font-medium">{formatPrice(order.details?.discount || 0)}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-8">
              <span className="font-medium">Tax</span>
              <span className="font-medium">{formatPrice(order.details?.tax || 0)}</span>
            </div>
          </div>

          <span className="h-px w-full rounded-full bg-primary-300" />

          {/* Total */}
          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total</span>
            <span>{formatPrice(order.details?.total || 0)}</span>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default ThankYou
