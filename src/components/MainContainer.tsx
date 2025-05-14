import { cn } from '@/utils'
import { ComponentPropsWithRef } from 'react'

const MainContainer = ({ className, children, ...props }: ComponentPropsWithRef<'div'>) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-screen-2xl px-6 lg:px-8 3xl:px-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default MainContainer
