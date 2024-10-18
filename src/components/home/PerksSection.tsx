import { Icon } from '@iconify/react'
import PerksSkeleton from './skeletons/PerksSkeleton'

export interface PerkItem {
  icon: string
  title: string
  description: string
}

const PerkCard = ({ icon, title, description }: PerkItem) => {
  return (
    <div className="flex flex-col gap-2 xl:gap-3 items-start xl:items-center">
      <div className="flex xl:flex-col items-center gap-x-3 xl:gap-y-3">
        <Icon icon={icon} className="text-3xl" />
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
      <p className="text-primary-600 xl:text-md xl:text-center">
        {description}
      </p>
    </div>
  )
}

const PerksSection = () => {
  const perks: PerkItem[] = [
    {
      icon: 'solar:shield-check-outline',
      title: 'Authenticity Guarantee',
      description:
        "Every sneaker we sell undergoes meticulous inspection by our expert team, comprised of the industry's most seasoned and highly trained authenticators."
    },
    {
      icon: 'prime:warehouse',
      title: 'In-house Inventory',
      description:
        'We maintain a comprehensive inventory right on-site, eliminating the need for third-party sellers. Your orders are processed and verified typically within 1-3 business days.'
    },
    {
      icon: 'hugeicons:delivery-truck-01',
      title: 'Worldwide Shipping',
      description:
        'With reliable worldwide shipping options through UPS and DHL, we make it possible for sneaker enthusiasts across the globe to enjoy our premium selection.'
    },
    {
      icon: 'fad:undo',
      title: 'Returns Accepted',
      description:
        "Our straightforward returns policy ensures a hassle-free experience. Reach out to our support team, and we'll guide you through the process, prioritizing your peace of mind."
    }
  ]

  if (!perks.length) return <PerksSkeleton />

  return (
    <section className="border-y border-primary-300 py-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 xl:gap-y-0 xl:gap-20">
        {perks.map(({ icon, title, description }) => (
          <li key={title}>
            <PerkCard icon={icon} title={title} description={description} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PerksSection
