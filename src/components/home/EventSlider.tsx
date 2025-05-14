'use client'

import routes from '@/lib/routes'
import { Event } from '@/types/payload'
import { cn } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'usehooks-ts'
import Button from '../base/button/Button'
import Icon from '../base/Icon'
import toast from '../base/toast/Toast'
import EventSliderSkeleton from './skeletons/EventSliderSkeleton'

const EventItem = ({ event }: { event: Event }) => {
  const router = useRouter()

  const getCoverImage = () => {
    return typeof event.image === 'string' ? event.image : event.image.url
  }

  const handleOnClick = () => {
    if (event.type === 'drop' && !!event.product) {
      const productId = typeof event.product === 'string' ? event.product : event.product.id
      router.push(routes.products.product(productId))
      return
    }
    if (event.type === 'spotlight' && event.appliedTo && event.appliedTo?.length > 0) {
      const relation = event.appliedTo[0].relationTo
      const relationId =
        typeof event.appliedTo[0].value !== 'string'
          ? event.appliedTo[0].value.id
          : event.appliedTo[0].value
      router.push(`${routes.products.home}?${relation}=${relationId}`)
      return
    }

    // TODO: Apply coupon to cart for discounts
    toast.success('Code copied to clipboard.')
  }

  return (
    <div className="px-4">
      <div className="relative flex items-center justify-center aspect-video lg:aspect-[6/2]">
        <Image
          fill
          loading="lazy"
          className="rounded-xl sm:rounded-2xl object-center object-contain bg-primary-200"
          src={getCoverImage() || ''}
          alt="event cover image"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 lg:gap-6 lg:absolute lg:left-[4%] lg:bottom-[8%] py-4 lg:p-6 lg:w-[30%] bg-background lg:shadow-xl lg:rounded-2xl">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-xl">{event.title}</span>
          <span className="text-md text-primary-700 dark:text-primary-800 line-clamp-2">
            {event.description}
          </span>
        </div>
        <Button
          variant="solid"
          label={event.type === 'discount' ? event.discount?.code : event.ctaLabel}
          iconPrepend={event.type === 'discount' ? 'lets-icons:copy-alt' : ''}
          className="w-fit"
          onClick={handleOnClick}
        />
      </div>
    </div>
  )
}

// FIXME: Optimize colors based on theme
const EventSlider = ({ events }: { events: Event[] }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)')

  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [paginationStyles, setPaginationStyles] = useState<Record<string, string | undefined>>({
    '--swiper-pagination-color': '#212427',
    '--swiper-pagination-bullet-inactive-color': '#FFFFFF40',
    '--swiper-pagination-bullet-inactive-opacity': '1',
    '--swiper-pagination-bullet-size': '0.5rem'
  })

  const isStart = activeIndex === 0
  const isEnd = activeIndex === events.length - 1

  useEffect(() => {
    if (!swiper) return

    const handleSlideChange = () => {
      setActiveIndex(swiper.activeIndex)
    }
    swiper.on('slideChange', handleSlideChange)

    return () => {
      swiper.off('slideChange', handleSlideChange)
    }
  }, [swiper])

  useEffect(() => {
    setPaginationStyles(prev => ({
      ...prev,
      '--swiper-pagination-top': isMobile ? '1%' : undefined,
      '--swiper-pagination-bottom': isMobile ? '99%' : undefined
    }))
  }, [isMobile])

  const handleSlidePrev = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      swiper?.slidePrev()
    },
    [swiper]
  )

  const handleSlideNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      swiper?.slideNext()
    },
    [swiper]
  )

  if (!events.length) return <EventSliderSkeleton />

  return (
    <div className="-mx-4 relative flex flex-1 overflow-hidden">
      <button
        aria-label="previous image"
        onClick={handleSlidePrev}
        className={cn(
          'lg:hidden absolute left-8 top-[27%] sm:top-[30%] md:top-[35%] z-10 p-2 border border-primary-400 bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out',
          { '-left-12 opacity-0 pointer-events-none': isStart }
        )}
      >
        <Icon icon="mage:chevron-left" className="h-6 w-6 text-primary-800" />
      </button>

      <Swiper
        spaceBetween={4}
        slidesPerView={1}
        className="h-full w-full"
        onSwiper={setSwiper}
        modules={[Pagination, Keyboard, Navigation, Autoplay]}
        keyboard={{ enabled: true }}
        navigation
        grabCursor
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) => `<span class="rounded-full ${className}"></span>`
        }}
        style={paginationStyles}
      >
        {events.map((event, i) => (
          <SwiperSlide key={i} className="relative bg-background">
            <EventItem event={event} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        aria-label="next image"
        onClick={handleSlideNext}
        className={cn(
          'lg:hidden absolute right-8 top-[27%] sm:top-[30%] md:top-[35%] z-10 p-2 border border-primary-400 bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out',
          { '-right-10 opacity-0 pointer-events-none': isEnd }
        )}
      >
        <Icon icon="mage:chevron-right" className="h-6 w-6 text-primary-700" />
      </button>
    </div>
  )
}

export default EventSlider
