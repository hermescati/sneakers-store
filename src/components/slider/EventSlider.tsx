'use client'

import { Event } from "@/types/payload"
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from 'sonner'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from "usehooks-ts"
import Button from "../base/Button"

const EventItem = ({ event }: { event: Event }) => {
    const router = useRouter()

    // TODO: Optimize the return image sizes according to device size
    const getCoverImage = () => {
        return typeof event.image === 'string' ? event.image : event.image.url
    }

    const handleOnClick = () => {
        if (event.type === 'drop' && !!event.product) {
            const productId = typeof event.product === 'string' ? event.product : event.product.id
            router.push(`/sneakers/${productId}`)
            return
        }
        if (event.type === 'spotlight' && event.appliedTo && event.appliedTo?.length > 0) {
            const relation = event.appliedTo[0].relationTo
            const relationId = typeof event.appliedTo[0].value !== 'string' ? event.appliedTo[0].value.id : event.appliedTo[0].value
            router.push(`/sneakers?${relation}=${relationId}`)
            return
        }

        // TODO: Apply coupon to cart for discounts
        toast.success('Code copied to clipboard.')
    }

    return (
        <>
            <div className="relative flex items-center justify-center aspect-square sm:aspect-video lg:aspect-[6/2]">
                <Image
                    fill
                    loading="eager"
                    className="rounded-2xl object-center object-contain bg-primary-200"
                    src={getCoverImage() || ""}
                    priority={true}
                    alt="event cover image"
                />
            </div>
            <div className="flex flex-col justify-center gap-4 lg:gap-6 lg:absolute lg:left-6 xl:left-8 lg:inset-y-[20%] xl:inset-y-[30%] p-4 lg:p-6 lg:w-[25%] lg:bg-background lg:shadow-lg lg:rounded-2xl">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-xl lg:text-2xl">{event.title}</span>
                    <span className="text-md text-primary-600 leading-tight line-clamp-2">{event.description}, {event.description}, {event.description}</span>
                </div>
                <Button
                    variant="solid"
                    label={event.type === 'discount' ? event.discount?.code : event.ctaLabel}
                    iconPrepend={event.type === 'discount' ? 'lets-icons:copy-alt' : ''}
                    className="w-fit"
                    onClick={handleOnClick}
                />
            </div>
        </>
    )
}

const EventSlider = ({ events }: { events: Event[] }) => {
    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const [slideConfig, setSlideConfig] = useState({
        isStart: true,
        isEnd: activeIndex === (events.length ?? 0) - 1
    })

    const isMobile = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        swiper?.on('slideChange', ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isStart: activeIndex === 0,
                isEnd: activeIndex === (events.length ?? 0) - 1
            })
        })
    }, [swiper, events])

    return (
        <div className="relative flex flex-1 overflow-hidden">
            <button
                aria-label="previous image"
                onClick={(e) => {
                    e.preventDefault()
                    swiper?.slidePrev()
                }}
                className={cn(
                    'lg:hidden absolute left-4 place-self-center z-10 p-2 border border-primary-400 bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out',
                    { '-left-12 opacity-0': slideConfig.isStart }
                )}
            >
                <Icon icon="mage:chevron-left" className="h-6 w-6 text-primary-800" />
            </button>
            <Swiper
                spaceBetween={32}
                slidesPerView={1}
                className="h-full w-full"
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={[Pagination, Keyboard, Navigation, Autoplay]}
                keyboard={{ enabled: true }}
                navigation={true}
                grabCursor={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (_, className) => {
                        return `<span class="rounded-full transition-all ease-in-out duration-300 ${className}"></span>`
                    }
                }}
                style={
                    {
                        '--swiper-pagination-color': '#212427',
                        '--swiper-pagination-bullet-inactive-color': '#FFFFFF40',
                        '--swiper-pagination-bullet-inactive-opacity': '1',
                        '--swiper-pagination-bullet-size': '0.5rem',
                        ...(isMobile
                            ? {
                                '--swiper-pagination-top': '1%',
                                '--swiper-pagination-bottom': '99%',
                            }
                            : {})
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                }
            >
                {events.map((event, i) => (
                    <SwiperSlide key={i} className="relative bg-background">
                        <EventItem event={event} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                aria-label="next image"
                onClick={(e) => {
                    e.preventDefault()
                    swiper?.slideNext()
                }}
                className={cn(
                    'lg:hidden absolute right-4 place-self-center z-10 p-2 border border-primary-400 bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out',
                    { '-right-10 opacity-0': slideConfig.isEnd }
                )}
            >
                <Icon icon="mage:chevron-right" className="h-6 w-6 text-primary-700" />
            </button>
        </div>
    )
}

export default EventSlider