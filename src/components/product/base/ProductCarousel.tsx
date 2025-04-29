'use client'

import Icon from '@/components/base/Icon'
import { Media } from '@/types/payload'
import { cn } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ProductCarouselProps {
  images: Media[]
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!swiper) return
    const handleSlideChange = () => setActiveIndex(swiper.realIndex)
    swiper.on('slideChange', handleSlideChange)
    return () => swiper.off('slideChange', handleSlideChange)
  }, [swiper])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex-1 aspect-[3/2] md:aspect-video lg:aspect-[3/2] xl:aspect-video rounded-2xl bg-primary-100 dark:bg-primary-800 overflow-hidden">
        <button
          aria-label="previous image"
          className="md:hidden absolute inset-y-0 left-0 z-10 px-4 text-2xl text-primary-600 transition-transform hover:-translate-x-1 duration-300"
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
        >
          <Icon icon="mage:chevron-left" />
        </button>
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
          {images.map((media) => (
            <SwiperSlide key={media.id} className="relative !flex items-center justify-center p-6">
              <Image
                src={media.url!}
                alt="product image"
                width={media.width!}
                height={media.height!}
                priority
                loading="eager"
                draggable={false}
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
          className="md:hidden absolute inset-y-0 right-0 z-10 px-4 text-2xl text-primary-600 transition-transform hover:translate-x-1 duration-300"
        >
          <Icon icon="mage:chevron-right" />
        </button>
      </div>

      <div className="hidden md:grid grid-cols-3 sm:grid-cols-5 gap-3">
        {images.map((media, index) => (
          <button
            key={media.id}
            onClick={() => swiper?.slideToLoop(index)}
            className={cn(
              'flex items-center justify-center p-2 xl:p-4 aspect-square md:aspect-[3/2] border-2 rounded-xl bg-primary-100 dark:bg-primary-800 overflow-hidden transition',
              activeIndex === index ? 'border-secondary ' : 'border-transparent opacity-70'
            )}
          >
            <Image
              src={media.sizes?.thumbnail?.url || ''}
              alt={`thumbnail ${index + 1}`}
              width={media.sizes?.thumbnail?.width || 400}
              height={media.sizes?.thumbnail?.height || 300}
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
