import Rating from "@/components/base/Rating"
import { cn } from "@/utils"
import Image from "next/image"

export type TestmonialItem = {
    user: string,
    image?: string,
    rating: number,
    review: string
    className?: string
}

// TODO: load them from the actual reviews
const TestimonialCard = ({ testimonial }: { testimonial: TestmonialItem }) => {
    return (
        <article className={cn("flex flex-col w-full lg:max-w-64 gap-4 p-5 rounded-2xl bg-background border border-border shadow-lg", testimonial.className)}>
            {!!testimonial.image && <div className="hidden xl:block relative aspect-video rounded-xl overflow-hidden">
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

export default TestimonialCard
