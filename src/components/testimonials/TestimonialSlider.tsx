'use client'

import { useEffect, useState } from 'react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'usehooks-ts'
import TestimonialCard, { TestmonialItem } from './TestimonialCard'

interface TestimonialSliderProps {
    items: TestmonialItem[]
}

const TestimonialSlider = ({ items }: TestimonialSliderProps) => {
    const isMobile = useMediaQuery('(max-width: 639px)')

    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const [paginationStyles, setPaginationStyles] = useState<Record<string, string | undefined>>({
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '0.5rem',
    })

    const [, setSlideConfig] = useState({
        isStart: true,
        isEnd: activeIndex === (items.length ?? 0) - 1
    })

    useEffect(() => {
        setPaginationStyles((prev) => ({
            ...prev,
            '--swiper-pagination-color': 'rgba(var(--primary-800))',
            '--swiper-pagination-bullet-inactive-color': 'rgba(var(--primary-300))',
        }))
    }, [isMobile])

    useEffect(() => {
        swiper?.on('slideChange', ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isStart: activeIndex === 0,
                isEnd: activeIndex === (items.length ?? 0) - 1
            })
        })
    }, [swiper, items])

    return (
        <div className="overflow-hidden sm:w-full">
            <Swiper
                spaceBetween={8}
                slidesPerView={isMobile ? 1 : 2}
                className=""
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={[Pagination, Keyboard, Navigation]}
                keyboard={{
                    enabled: true
                }}
                navigation={true}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    renderBullet: (_, className) => {
                        return `<span class="rounded-full transition-all ease-in-out duration-300 ${className}"></span>`
                    }
                }}
                style={paginationStyles}
            >
                {items.map(({ user, rating, review }, i) => (
                    <SwiperSlide key={i} className="px-4 pb-12 !flex items-center justify-center">
                        <TestimonialCard testimonial={{ user, rating, review }} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TestimonialSlider