'use client'

import Icon from '@/components/base/Icon'
import Rating from '@/components/base/Rating'
import { Review } from '@/types/payload'
import { cn } from '@/utils'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import moment from 'moment'
import { Avatar } from '../../base/Avatar'

interface ReviewItemProps {
  review: Review
  className?: string
}

const ReviewItem = ({ review, className }: ReviewItemProps) => {
  const firstName = typeof review.user !== 'string' ? review.user.firstName : ''
  const lastName = typeof review.user !== 'string' ? review.user.lastName : ''

  const reviewComment = review.comment ? convertLexicalToHTML({ data: review.comment }) : ''

  return (
    <div className={cn('flex flex-col gap-2 px-2 py-6 first:pt-0 last:pb-0', className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Avatar firstName={firstName} lastName={lastName} />
            <div className="leading-snug">
              <p className="font-semibold">
                {firstName} {lastName}
              </p>
              <p className="text-md font-medium text-primary-500">
                {moment(review.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-0.5 font-bold md:gap-2">
          {review.rating.toFixed(1)}
          <Rating rating={review.rating} className="hidden text-xl md:block" />
          <Icon
            icon="mingcute:star-fill"
            className="text-xl text-warning-300 dark:text-warning-600 md:hidden"
          />
        </span>
      </div>

      <article
        dangerouslySetInnerHTML={{ __html: reviewComment }}
        className={cn(
          'prose-foreground prose max-w-none',
          'prose-headings:my-2 prose-headings:text-[1.1rem] prose-headings:font-semibold prose-headings:text-foreground',
          'prose-p:my-2 prose-p:text-pretty prose-p:text-justify prose-p:leading-relaxed prose-p:text-foreground prose-p:last:mb-0 prose-strong:text-foreground dark:prose-p:text-primary-800',
          '[--tw-prose-bullets:rgb(var(--primary-700))] prose-ol:my-2 prose-ul:my-2 prose-ul:pl-4 prose-li:my-1 prose-li:pl-1 prose-li:leading-normal prose-li:text-foreground dark:[--tw-prose-bullets:rgb(var(--primary-800))]'
        )}
      />
    </div>
  )
}

export default ReviewItem
