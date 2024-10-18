import { Icon } from '@iconify/react'
import Button from '../base/Button'
import Input from '../base/Input'
import Link from '../base/Link'
import MainContainer from '../MainContainer'

type FooterItem = {
  header: string
  links: {
    name?: string
    icon?: string
    href: string
  }[]
}

const Footer = () => {
  const footerLinks: FooterItem[] = [
    {
      header: 'About',
      links: [
        { name: 'Our Mission', href: '/' },
        { name: 'Authenticity', href: '/' },
        { name: 'Journal', href: '/' }
      ]
    },
    {
      header: 'Support',
      links: [
        { name: 'Track Your Order', href: '/' },
        { name: 'Delivery & Returns', href: '/' },
        { name: 'International Payment', href: '/' },
        { name: 'FAQs', href: '/' }
      ]
    }
  ]

  const socialMedia: FooterItem = {
    header: 'Find Us',
    links: [
      { icon: 'simple-icons:instagram', href: '/' },
      { icon: 'simple-icons:x', href: '/' },
      { icon: 'simple-icons:tiktok', href: '/' },
      { icon: 'simple-icons:pinterest', href: '/' },
      { icon: 'simple-icons:youtube', href: '/' }
    ]
  }

  return (
    <footer className="bg-primary-200 flex-grow-0">
      <MainContainer className="py-8 md:py-12">
        <section className="flex flex-col gap-12">
          {/* Links */}
          <ul className="flex flex-wrap gap-y-8 gap-x-20 justify-between">
            {/* Footer Links */}
            {footerLinks.map((item, index) => (
              <li key={index} className="flex flex-col gap-4">
                <h2 className="font-bold text-xl">{item.header}</h2>

                <ul className="flex flex-col gap-2">
                  {item.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="font-medium text-primary-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {/* Social Media */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl">{socialMedia.header}</h2>

              <ul className="flex gap-4 items-center">
                {socialMedia.links.map((link, index) => (
                  <li key={index}>
                    {link.icon && (
                      <Link href={link.href}>
                        <Icon
                          icon={link.icon}
                          className="font-medium text-xl text-primary-600"
                        />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-3 max-w-[500px] mt-8 lg:mt-0">
              <h2 className="font-bold text-xl">Newsletter</h2>

              <p className="font-medium text-primary-600">
                Subscribe to our newsletter to get your weekly dose of new
                releases, promotions and special offers.
              </p>

              <form className="flex gap-3">
                <Input type="email" placeholder="Email address" />
                <Button intent="secondary" label="Sign up" />
              </form>

              <p className="font-medium xl:text-md text-primary-600">
                Opt out at any time by clicking{' '}
                <span className="font-semibold text-primary-700">
                  &quot;Unsubscribe&quot;
                </span>{' '}
                at the bottom of any of our emails. By signing up you agree with
                our{' '}
                <Link
                  href={'/'}
                  underline
                  className="font-semibold text-primary-700 underline underline-offset-4 hover:text-secondary"
                >
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href={'/'}
                  underline
                  className="font-semibold text-primary-700 underline underline-offset-4 hover:text-secondary"
                >
                  Privacy Policy.
                </Link>
              </p>
            </div>
          </ul>

          <span className="w-full h-px rounded-full bg-primary-400"></span>

          {/* Copyrights */}
          <div className="flex flex-wrap gap-4 justify-between font-medium text-md text-primary-700">
            <span className="flex items-center gap-2">
              <p>Privacy Policy</p>
              <span className="w-1 h-1 rounded-full bg-primary-500"></span>
              <p>Terms and Conditions</p>
            </span>

            <p>Copyrights ©2024 Sneakers. All rights reserved.</p>
          </div>
        </section>
      </MainContainer>
    </footer>
  )
}

export default Footer
