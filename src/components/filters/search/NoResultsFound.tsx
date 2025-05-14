import Image from 'next/image'

// TODO: Update this to a better image or just icon
const NoResultsFound = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-2 gap-x-8 pb-8 items-center justify-center">
      <Image src="/no-results-found.png" alt="no results found" width={200} height={200} />

      <div className="flex flex-col">
        <h5 className="mt-2 font-semibold">Oops, no results found!</h5>
        <span className="text-md text-primary-700">
          We couldn&apos;t find what you&apos;re looking for
        </span>
      </div>
    </div>
  )
}

export default NoResultsFound
