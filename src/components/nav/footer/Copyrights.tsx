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
      <span className="h-px w-full rounded-full bg-primary-400 dark:bg-border" />
      <div className="flex flex-col items-center justify-between gap-x-4 gap-y-2 pb-6 pt-4 text-md text-primary-700 sm:flex-row">
        <span className="flex items-center gap-x-2">
          {policyLinks.map(({ name, href }, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {i !== 0 && <span className="inline-block h-1 w-1 rounded-full bg-primary-600" />}
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
