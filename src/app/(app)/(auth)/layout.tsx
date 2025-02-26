import Testimonials from '@/components/auth/Testimonials'
import MainContainer from '@/components/MainContainer'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Auth - Senakers.',
    description: 'Authentication pages for YourSiteName. Sign up or login to access exclusive features.',
    openGraph: {
        title: 'Auth - YourSiteName',
        description:
            'Authentication pages for YourSiteName. Sign up or login to access exclusive features.',
        url: 'https://www.yoursite.com/auth',
        siteName: 'YourSiteName',
        images: [
            {
                url: 'https://www.yoursite.com/images/og-image.jpg',
                width: 800,
                height: 600,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Auth - YourSiteName',
        description:
            'Authentication pages for YourSiteName. Sign up or login to access exclusive features.',
        images: ['https://www.yoursite.com/images/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
}

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <MainContainer className="grid lg:grid-cols-2 gap-x-10 h-[92dvh] lg:h-auto items-center justify-center py-6">
            <div className="flex items-center justify-center">
                {children}
            </div>
            <div className="hidden lg:block h-[750px]">
                <Testimonials />
            </div>
        </MainContainer>
    )
}
