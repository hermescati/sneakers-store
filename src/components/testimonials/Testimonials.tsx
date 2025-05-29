'use client'

import TestimonialCard, { TestmonialItem } from './TestimonialCard'
import TestimonialSlider from './TestimonialSlider'

const Testimonials = () => {
  const testimonials: TestmonialItem[] = [
    {
      user: 'Alex H.',
      rating: 4.5,
      review:
        'Was skeptical at first, but my kicks came legit with a cert. Definitely shopping here again!',
      className:
        'absolute -top-[3%] right-0 rotate-[-4deg] xl:-top-[3%] xl:right-[10%] xl:rotate-[-2deg]'
    },
    {
      user: 'Marcus L.',
      image: '/testimonials/testimonial_1.png',
      rating: 4,
      review:
        'Great selection, quick delivery, and real authenticity checks. No stress shopping here!',
      className:
        'absolute top-[57%] right-0 rotate-[5deg] xl:top-[14%] xl:left-[8%] xl:right-auto xl:rotate-[-10deg]'
    },
    {
      user: 'Jasmine T.',
      image: '/testimonials/testimonial_2.png',
      rating: 5,
      review: 'Finally copped my grail Jordans—authentic and fast shipping. Highly recommend!',
      className:
        'absolute top-1/4 left-0 rotate-[-4deg] xl:top-[32%] xl:right-[9%] xl:left-auto xl:rotate-[7deg]'
    }
  ]

  return (
    <section className="flex flex-col justify-between rounded-2xl bg-primary-100/50 p-8 lg:h-full lg:p-12">
      <ul className="relative hidden h-[75%] lg:block">
        {testimonials.map(item => (
          <TestimonialCard key={item.user} testimonial={item} />
        ))}
      </ul>

      <div>
        <h3 className="text-xl font-semibold text-primary-800">Step Up Your Sneaker Game</h3>
        <p className="mt-2 text-pretty text-md font-medium text-primary-600">
          Join our community of sneaker enthusiasts and unlock exclusive perks—get early access to
          limited drops, special discounts, and personalized recommendations. Experience the best in
          sneaker culture and never miss a beat!
        </p>
      </div>

      <div className="mt-8 lg:hidden">
        <TestimonialSlider items={testimonials} />
      </div>
    </section>
  )
}

export default Testimonials
