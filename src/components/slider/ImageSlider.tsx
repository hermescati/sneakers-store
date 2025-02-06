'use client'

import { cn } from '@/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ImageSliderProps {
  urls: string[]
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [slideConfig, setSlideConfig] = useState({
    isStart: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isStart: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1
      })
    })
  }, [swiper, urls])

  return (
    <div className="relative flex-1 aspect-square sm:aspect-video lg:aspect-square xl:aspect-video overflow-hidden rounded-2xl">
      <button
        aria-label="previous image"
        onClick={(e) => {
          e.preventDefault()
          swiper?.slidePrev()
        }}
        className={cn(
          "hidden sm:block absolute inset-y-0 left-0 z-10 p-2 transition backdrop-blur-lg bg-white/30 dark:bg-primary-700/30",
          { "cursor-default": slideConfig.isStart }
        )}
      >
        <Icon
          icon="mage:chevron-left"
          className={cn(
            "h-6 w-6 text-primary-700 dark:text-primary-500",
            { "opacity-40": slideConfig.isStart }
          )} />
      </button>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="h-full w-full"
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
        style={{
          "--swiper-pagination-color": "#18181b",
          "--swiper-pagination-bullet-inactive-color": "#18181b",
          "--swiper-pagination-bullet-inactive-opacity": "0.3",
          "--swiper-pagination-bullet-size": "0.5rem"
        } as React.CSSProperties}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="h-full w-full">
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-center object-contain dark:bg-primary-700"
              src={url}
              priority={true}
              alt="Product image"
            />
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
          "hidden sm:block absolute inset-y-0 right-0 z-10 p-2 transition backdrop-blur-lg bg-white/30 dark:bg-primary-700/30",
          { "cursor-default": slideConfig.isEnd }
        )}
      >
        <Icon
          icon="mage:chevron-right"
          className={cn(
            "h-6 w-6 text-primary-700 dark:text-primary-500",
            { "opacity-40": slideConfig.isEnd }
          )} />
      </button>
    </div>
  )
}

export default ImageSlider
