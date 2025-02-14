'use client'

import Image from "next/image"
import Rating from "../base/Rating"
import { cn } from "@/utils"

type TestmonialItem = {
    user: string,
    image?: string,
    rating: number,
    review: string
    className?: string
}

// TODO: upload some testimonial images
// TODO: load them from the actual reviews
const TestimonialCard = ({ testimonial }: { testimonial: TestmonialItem }) => {
    return (
        <article className={cn("absolute flex flex-col max-w-64 gap-4 p-5 rounded-2xl bg-background border border-border shadow-lg", testimonial.className)}>
            {testimonial.image && <div className="hidden xl:block relative aspect-video rounded-xl overflow-hidden">
                <Image
                    alt={testimonial.user}
                    src={testimonial.image}
                    fill
                    className="w-full h-full object-contain px-2 dark:bg-primary-800" />
            </div>}
            <div className="place-self-center">
                <Rating rating={testimonial.rating} />
            </div>
            <p className="text-center text-md">{testimonial.review}</p>
            <span className="flex items-center justify-center py-1 border border-border rounded-lg w-full">{testimonial.user}</span>
        </article>
    )
}

export default function Testimonials() {
    const testimonials: TestmonialItem[] = [
        {
            user: 'Alex H.',
            rating: 4.5,
            review: "Was skeptical at first, but my kicks came legit with a cert. Definitely shopping here again!",
            className: "-top-[3%] right-0 rotate-[-4deg] xl:-top-[3%] xl:right-[10%] xl:rotate-[-2deg]"
        },
        {
            user: 'Marcus L.',
            image: '/testimonials/testimonial_1.png',
            rating: 4,
            review: "Great selection, quick delivery, and real authenticity checks. No stress shopping here!",
            className: "top-[57%] right-0 rotate-[5deg] xl:top-[14%] xl:left-[8%] xl:right-auto xl:rotate-[-10deg]"
        },
        {
            user: 'Jasmine T.',
            image: '/testimonials/testimonial_2.png',
            rating: 5,
            review: "Finally copped my grail Jordans—authentic and fast shipping. Highly recommend!",
            className: "top-1/4 left-0 rotate-[-4deg] xl:top-[32%] xl:right-[9%] xl:left-auto xl:rotate-[7deg]"
        },
    ]

    return (
        <section className="flex flex-col justify-between h-full p-12 bg-primary-100/50 rounded-2xl">
            <ul className="relative h-[75%]">
                {testimonials.map((item) => (
                    <TestimonialCard key={item.user} testimonial={item} />
                ))}
            </ul>

            <div>
                <h3 className="font-semibold text-xl text-primary-800">Step Up Your Sneaker Game</h3>
                <p className="mt-2 font-medium text-primary-500 text-md text-pretty">
                    Join our community of sneaker enthusiasts and unlock exclusive perks—get early access to limited drops, special discounts, and personalized recommendations.
                    Experience the best in sneaker culture and never miss a beat!
                </p>
            </div>
        </section>
    )
}
