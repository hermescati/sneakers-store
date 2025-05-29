import Rating from '@/components/base/Rating'
import { cn } from '@/utils'
import Image from 'next/image'

export type TestmonialItem = {
  user: string
  image?: string
  rating: number
  review: string
  className?: string
}

const TestimonialCard = ({ testimonial }: { testimonial: TestmonialItem }) => {
  return (
    <article
      className={cn(
        'flex w-full flex-col gap-4 rounded-2xl border border-border bg-background p-5 shadow-lg lg:max-w-64',
        testimonial.className
      )}
    >
      {!!testimonial.image && (
        <div className="relative hidden aspect-video overflow-hidden rounded-xl xl:block">
          <Image
            alt={testimonial.user}
            src={testimonial.image}
            fill
            className="h-full w-full object-contain px-2 dark:bg-primary-800"
          />
        </div>
      )}
      <div className="place-self-center">
        <Rating rating={testimonial.rating} />
      </div>
      <p className="text-center text-md">{testimonial.review}</p>
      <span className="flex w-full items-center justify-center rounded-lg border border-border py-1">
        {testimonial.user}
      </span>
    </article>
  )
}

export default TestimonialCard
