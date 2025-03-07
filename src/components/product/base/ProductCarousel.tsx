'use client'

import { Product } from '@/types/payload'
import { cn } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ProductCarouselProps {
  images: Product['images']
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const imageUrls = images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]

  const thumbnailUrls = images
    .map(({ image }) => (typeof image === 'string' ? image : image.sizes?.thumbnail?.url))
    .filter(Boolean) as string[]

  useEffect(() => {
    if (!swiper) return
    const handleSlideChange = () => setActiveIndex(swiper.realIndex)
    swiper.on('slideChange', handleSlideChange)
    return () => swiper.off('slideChange', handleSlideChange)
  }, [swiper])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex-1 aspect-square sm:aspect-video lg:aspect-[4/3] xl:aspect-video rounded-2xl bg-primary-100 dark:bg-primary-800 overflow-hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          className="h-full w-full"
          onSwiper={setSwiper}
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          grabCursor
          loop
        >
          {imageUrls.map((url, i) => (
            <SwiperSlide key={i}>
              <Image
                src={url}
                alt="product image"
                fill
                priority
                loading="eager"
                className="object-contain"
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {thumbnailUrls.map((url, i) => (
          <button
            key={i}
            onClick={() => swiper?.slideToLoop(i)}
            className={cn(
              'flex items-center justify-center p-2 aspect-square md:aspect-[4/3] border-2 rounded-xl bg-primary-100 dark:bg-primary-800 overflow-hidden transition',
              activeIndex === i ? 'border-secondary ' : 'border-transparent opacity-70'
            )}
          >
            <div className='relative w-full h-full'>
              <Image
                src={url}
                alt={`thumbnail ${i + 1}`}
                fill
                className="object-contain"
                draggable={false}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
