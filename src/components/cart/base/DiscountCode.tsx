import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import { useCart } from '@/hooks/use-cart'
import { DiscountCodeSchema, TDiscountCodeSchema } from '@/lib/validators'
import { validateDiscountCode } from '@/services/checkout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const DiscountCode = () => {
  const { discount: appliedDiscount, setDiscount } = useCart()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<TDiscountCodeSchema>({
    resolver: zodResolver(DiscountCodeSchema)
  })

  const onSubmit = async ({ code }: TDiscountCodeSchema) => {
    const response = await validateDiscountCode(code)

    if (response.coupon === null || response.code === 400) {
      setError('code', {
        type: 'manual',
        message: 'This code is not valid. Please try another!'
      })
      return
    }

    if (response.message === 'COUPON_NOT_VALID') {
      setError('code', {
        type: 'manual',
        message: 'This coupon has expired. Please try another!'
      })
    }

    setDiscount(response.coupon!)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold">Discount Code</h3>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          {...register('code')}
          placeholder="Add discount code"
          defaultValue={!!appliedDiscount ? appliedDiscount.name! : ''}
          disabled={!!appliedDiscount}
          invalid={!!errors.code}
          error={errors.code?.message}
          className="w-[55%]"
        />
        <Button
          variant="outline"
          label={`${!!appliedDiscount ? 'Applied' : 'Apply'}`}
          disabled={!!appliedDiscount}
          iconPrepend={!!appliedDiscount ? 'solar:check-circle-linear' : ''}
          className="w-full border-primary-400 sm:w-[45%]"
        />
      </div>

      <div className="flex items-baseline gap-1 text-md text-primary-700">
        <span className="font-bold">Note:</span>
        <span>Only one discount code can be applied per order</span>
      </div>
    </form>
  )
}

export default DiscountCode
