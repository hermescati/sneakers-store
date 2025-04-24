import routes from '@/lib/routes'
import { NavItemGroups, FooterItem as TFooterItem } from '@/types'
import MainContainer from '../MainContainer'
import Logo from './base/Logo'
import Copyrights from './footer/Copyrights'
import FooterItem from './footer/FooterItem'
import NewsletterForm from './footer/NewsletterForm'

const Footer = ({ navItems }: { navItems: NavItemGroups }) => {
  const { featured, brands, others } = navItems

  const footerLinks: Record<string, TFooterItem> = {
    featured: {
      header: 'Featured',
      links: featured.map((item) => ({
        name: item.name,
        href: item.href!
      }))
    },
    categories: {
      header: 'Categories',
      links: [
        { name: 'Mens', href: routes.products.mens },
        ...others.map((item) => ({
          name: item.name,
          href: item.href!
        }))
      ]
    },
    brands: {
      header: 'Brands',
      links: brands
        .flatMap((b) =>
          !b.href && Array.isArray(b.items) ? b.items : b.href ? [b] : []
        )
        .slice(0, 8)
        .map((b) => ({
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
    <footer className="flex flex-col flex-grow-0 bg-primary-300/75 dark:bg-primary-100 text-foreground font-medium">
      <MainContainer className="flex flex-col gap-8 pt-8 lg:pt-12 pb-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8 md:max-w-xl">
            <div className="space-y-2">
              <Logo className="text-2xl" />
              <p className="text-md text-primary-700 dark:text-primary-700 leading-relaxed">
                Your go-to destination for the latest and greatest in sneaker
                culture. Whether you&apos;re into limited drops or timeless
                classics, we help you stay one step ahead.
              </p>
            </div>
            <NewsletterForm />
          </div>

          <div className="flex flex-col gap-8 mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="flex flex-col gap-8">
                <FooterItem item={footerLinks.featured} />
                <FooterItem item={footerLinks.categories} />
              </div>

              <FooterItem item={footerLinks.brands} />

              <div className="grid col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
                <FooterItem item={footerLinks.support} />
                <FooterItem item={footerLinks.social} isSocial />
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
