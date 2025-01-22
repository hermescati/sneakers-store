const EventSliderSkeleton = () => {
    return (
        <div className="relative flex flex-col flex-1 animate-pulse">
            <div className="relative flex items-center justify-center aspect-video lg:aspect-[6/2]">
                <div className="w-full h-full rounded-2xl bg-primary-200"></div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:gap-6 lg:absolute lg:left-[4%] lg:bottom-[8%] py-4 lg:p-6 lg:w-[30%] lg:shadow-lg lg:rounded-2xl bg-background">
                <div className="flex flex-col gap-2">
                    <div className="h-5 bg-zinc-200/75 rounded w-2/5" />
                    <div className="h-3 bg-zinc-200/75 rounded" />
                    <div className="h-3 bg-zinc-200/75 rounded w-2/4" />
                </div>
                <div className="h-12 bg-zinc-200/75 rounded-lg w-1/4" />
            </div>
        </div>
    )
}

export default EventSliderSkeleton