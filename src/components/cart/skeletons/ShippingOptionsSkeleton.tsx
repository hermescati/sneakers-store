interface ShippingOptionsSkeletonProps {
  length: number
}

const ShippingOptionsSkeleton = ({ length }: ShippingOptionsSkeletonProps) => {
  const options = Array.from({ length })

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-primary-700">Delivery</h4>

      <ul className="grid animate-pulse items-center gap-2 sm:grid-cols-2">
        {options.map((_, index) => (
          <li
            key={index}
            className="flex w-full cursor-pointer items-start justify-between rounded-xl border-2 border-primary-300 px-3 py-3 transition-all duration-300 ease-in-out sm:flex-col sm:gap-y-2"
          >
            <div className="flex w-full flex-col gap-1">
              <span className="h-5 w-2/3 rounded-md bg-skeleton" />
              <span className="h-4 w-1/2 rounded-md bg-skeleton" />
            </div>
            <span className="h-5 w-1/5 rounded-md bg-skeleton" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShippingOptionsSkeleton
