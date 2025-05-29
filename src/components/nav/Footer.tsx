import routes from '@/lib/routes'
import { NavStructure, FooterItem } from '@/types'
import MainContainer from '../MainContainer'
import Logo from './base/Logo'
import Copyrights from './footer/Copyrights'
import FooterLink from './footer/FooterLink'
import NewsletterForm from './footer/NewsletterForm'

interface FooterProps {
  navItems: NavStructure
}

const Footer = ({ navItems }: FooterProps) => {
  const { brands, featured, others } = navItems

  const footerLinks: Record<string, FooterItem> = {
    featured: {
      header: 'Featured',
      links: featured.map(item => ({
        name: item.name,
        href: item.href!
      }))
    },
    categories: {
      header: 'Categories',
      links: [
        { name: 'Mens', href: routes.products.mens },
        ...others.map(item => ({
          name: item.name,
          href: item.href!
        }))
      ]
    },
    brands: {
      header: 'Brands',
      links: brands
        .flatMap(b => (!b.href && Array.isArray(b.items) ? b.items : b.href ? [b] : []))
        .slice(0, 8)
        .map(b => ({
          name: b.name,
          href: b.href!
        }))
    },
    support: {
      header: 'Support',
      links: [
        { name: 'Contact Us', href: '/' },
        { name: 'Track Your Order', href: '/' },
        { name: 'Delivery & Returns', href: '/' }
      ]
    },
    social: {
      header: 'Find Us',
      links: [
        { icon: 'simple-icons:instagram', href: '/' },
        { icon: 'simple-icons:x', href: '/' },
        { icon: 'simple-icons:tiktok', href: '/' },
        { icon: 'simple-icons:youtube', href: '/' }
      ]
    }
  }

  return (
    <footer className="flex flex-grow-0 flex-col bg-primary-300/75 font-medium text-foreground dark:bg-primary-100">
      <MainContainer className="flex flex-col gap-8 pb-6 pt-8 lg:pt-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8 md:max-w-xl">
            <div className="space-y-2">
              <Logo className="text-2xl" />
              <p className="text-md leading-relaxed text-primary-700 dark:text-primary-700">
                Your go-to destination for the latest and greatest in sneaker culture. Whether
                you&apos;re into limited drops or timeless classics, we help you stay one step
                ahead.
              </p>
            </div>
            <NewsletterForm />
          </div>
          <div className="mt-2 flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col gap-8">
                <FooterLink item={footerLinks.featured} />
                <FooterLink item={footerLinks.categories} />
              </div>
              <FooterLink item={footerLinks.brands} />
              <div className="col-span-2 grid grid-cols-2 gap-8 sm:col-span-1 sm:grid-cols-1 md:col-span-2 md:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
                <FooterLink item={footerLinks.support} />
                <FooterLink item={footerLinks.social} isSocial />
              </div>
            </div>
            <div className="hidden xl:block">
              <Copyrights />
            </div>
          </div>
        </div>
      </MainContainer>
      <div className="xl:hidden">
        <Copyrights />
      </div>
    </footer>
  )
}

export default Footer
