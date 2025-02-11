const EventSliderSkeleton = () => {
    return (
        <div className="relative flex flex-col flex-1 animate-pulse">
            <div className="relative flex items-center justify-center aspect-video lg:aspect-[6/2]">
                <div className="w-full h-full bg-skeleton rounded-2xl"></div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:gap-6 lg:absolute lg:left-[4%] lg:bottom-[8%] py-4 lg:p-6 lg:w-[30%] lg:shadow-lg lg:rounded-2xl bg-background">
                <div className="flex flex-col gap-2">
                    <span className="h-5 bg-skeleton rounded-md w-2/5" />
                    <span className="h-3 bg-skeleton rounded" />
                    <span className="h-3 bg-skeleton rounded w-2/4" />
                </div>
                <span className="h-12 bg-skeleton rounded-xl w-1/4" />
            </div>
        </div>
    )
}

export default EventSliderSkeleton