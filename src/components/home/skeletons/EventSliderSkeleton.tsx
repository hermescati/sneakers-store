const EventSliderSkeleton = () => {
  return (
    <div className="relative flex flex-1 animate-pulse flex-col">
      <div className="relative flex aspect-video items-center justify-center lg:aspect-[6/2]">
        <div className="h-full w-full rounded-2xl bg-skeleton"></div>
      </div>

      <div className="flex flex-col justify-center gap-4 bg-background py-4 lg:absolute lg:bottom-[8%] lg:left-[4%] lg:w-[30%] lg:gap-6 lg:rounded-2xl lg:p-6 lg:shadow-lg">
        <div className="flex flex-col gap-2">
          <span className="h-5 w-2/5 rounded-md bg-skeleton" />
          <span className="h-3 rounded bg-skeleton" />
          <span className="h-3 w-2/4 rounded bg-skeleton" />
        </div>
        <span className="h-12 w-1/4 rounded-xl bg-skeleton" />
      </div>
    </div>
  )
}

export default EventSliderSkeleton
