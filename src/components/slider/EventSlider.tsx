'use client'

import { Event } from "@/types/payload"
import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import { useEffect, useState } from "react"
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from "next/image"
import Button from "../base/Button"

const EventSlider = ({ events }: { events: Event[] }) => {
    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const [slideConfig, setSlideConfig] = useState({
        isStart: true,
        isEnd: activeIndex === (events.length ?? 0) - 1
    })

    useEffect(() => {
        swiper?.on('slideChange', ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isStart: activeIndex === 0,
                isEnd: activeIndex === (events.length ?? 0) - 1
            })
        })
    }, [swiper, events])

    const getCoverImage = (event: Event) => {
        if (typeof event.image === 'string') return event.image

        return event.image.url || ""
    }

    return (
        <div className="relative flex-1 overflow-visible">
            <button
                aria-label="previous image"
                onClick={(e) => {
                    e.preventDefault()
                    swiper?.slidePrev()
                }}
                className={cn(
                    'absolute left-4 top-[25%] z-10 p-2 border border-primary-400 bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out',
                    { '-left-12 opacity-0': slideConfig.isStart }
                )}
            >
                <Icon icon="mage:chevron-left" className="h-6 w-6 text-primary-800" />
            </button>
            <Swiper
                spaceBetween={24}
                slidesPerView={1}
                className="h-full w-full"
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={[Pagination, Keyboard, Navigation, Autoplay]}
                keyboard={{ enabled: true }}
                navigation={true}
                grabCursor={true}
                autoplay={{
                    delay: 3000,
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
                        '--swiper-pagination-top': '57%',
                        '--swiper-pagination-bottom': '57%',
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                }
            >
                {events.map((event, i) => (
                    <SwiperSlide key={i} className="bg-background">
                        <div className="relative flex items-center justify-center aspect-[16/10] rounded-2xl overflow-hidden">
                            <Image
                                fill
                                loading="eager"
                                className="object-center object-contain bg-primary-200"
                                src={getCoverImage(event)}
                                priority={true}
                                alt="Product image"
                            />
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-1 my-4">
                                <span className="font-bold text-xl">{event.title}</span>
                                <span className="text-primary-600 leading-tight line-clamp-2">{event.description}</span>
                            </div>
                            <Button
                                variant="solid"
                                label={event.type === 'discount' ? event.discount?.code : event.ctaLabel}
                                iconPrepend={event.type === 'discount' ? 'lets-icons:copy-alt' : ''}
                                className="w-fit shadow-none"
                                href="/"
                            />
                        </div>
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
                    'absolute right-4 top-[25%] z-10 p-2 border border-primary-400 bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out',
                    { '-right-10 opacity-0': slideConfig.isEnd }
                )}
            >
                <Icon icon="mage:chevron-right" className="h-6 w-6 text-primary-700" />
            </button>
        </div>
    )
}

export default EventSlider