interface ShippingOptionsSkeletonProps {
  length: number
}

const ShippingOptionsSkeleton = ({ length }: ShippingOptionsSkeletonProps) => {
  const options = Array.from({ length })

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-primary-700">Delivery</h4>

      <ul className="animate-pulse grid sm:grid-cols-2 items-center gap-2">
        {options.map((_, index) => (
          <li
            key={index}
            className="w-full flex sm:flex-col sm:gap-y-2 items-start justify-between py-3 px-3 rounded-xl border-2 border-primary-300 cursor-pointer transition-all ease-in-out duration-300"
          >
            <div className="flex flex-col gap-1 w-full">
              <span className="h-5 bg-skeleton rounded-md w-2/3" />
              <span className="h-4 bg-skeleton rounded-md w-1/2" />
            </div>
            <span className="h-5 bg-skeleton rounded-md w-1/5" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShippingOptionsSkeleton
