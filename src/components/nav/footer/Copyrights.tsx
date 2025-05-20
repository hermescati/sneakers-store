import Link from '@/components/base/Link'
import MainContainer from '@/components/MainContainer'

const Copyrights = () => {
  const currentYear = new Date().getFullYear()
  const policyLinks = [
    { name: 'Privacy Policy', href: '/' },
    { name: 'Terms and Conditions', href: '/' }
  ]

  return (
    <MainContainer className="flex flex-col gap-2 xl:px-0">
      <span className="w-full h-px rounded-full bg-primary-400 dark:bg-border" />
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 pb-6 gap-x-4 gap-y-2 text-md text-primary-700">
        <span className="flex items-center gap-x-2">
          {policyLinks.map(({ name, href }, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {i !== 0 && <span className="inline-block w-1 h-1 rounded-full bg-primary-600" />}
              <Link href={href} underline>
                {name}
              </Link>
            </span>
          ))}
        </span>
        <p>Copyrights ©{currentYear} Sneakers. All rights reserved.</p>
      </div>
    </MainContainer>
  )
}

export default Copyrights
