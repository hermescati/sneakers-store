import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import { useCartStore } from '@/stores/cartStore'
import { DiscountCodeSchema, TDiscountCodeSchema } from '@/lib/validators'
import { validateDiscountCode } from '@/services/coupons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// FIXME: Refactor discount code logic to take into account the metadata field
const DiscountCode = () => {
  const { discount: appliedDiscount, setDiscount } = useCartStore()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<TDiscountCodeSchema>({
    resolver: zodResolver(DiscountCodeSchema)
  })

  const onSubmit = async ({ code }: TDiscountCodeSchema) => {
    const {
      code: statusCode,
      message: statusMessage,
      discountCode
    } = await validateDiscountCode(code)

    if (!discountCode || statusCode === 400) {
      setError('code', {
        type: 'manual',
        message: 'This code is not valid. Please try another!'
      })
      return
    }

    if (statusMessage === 'COUPON_NOT_VALID') {
      setError('code', {
        type: 'manual',
        message: 'This coupon has expired. Please try another!'
      })
    }

    setDiscount(discountCode)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="font-semibold text-primary-700">Discount Code</h4>

      <div className="flex gap-2">
        <Input
          {...register('code')}
          placeholder="Add discount code"
          defaultValue={!!appliedDiscount ? appliedDiscount.code : ''}
          disabled={!!appliedDiscount}
          invalid={!!errors.code}
          error={errors.code?.message}
        />
        <Button
          variant="ghost"
          label={`${!!appliedDiscount ? 'Applied' : 'Apply'}`}
          disabled={!!appliedDiscount}
          iconPrepend={!!appliedDiscount ? 'solar:check-circle-linear' : ''}
          className="h-fit w-fit border-2 border-primary-400"
        />
      </div>

      <p className="font-medium text-md text-primary-600">
        <span className="font-bold text-primary-700">Note:</span>{" "}
        Only one discount code can be applied per order
      </p>
    </form>
  )
}

export default DiscountCode
