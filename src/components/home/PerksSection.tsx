import { Icon } from '@iconify/react'

export interface PerkItem {
  icon: string
  title: string
  description: string
}

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

const PerkCard = ({ icon, title, description }: PerkItem) => {
  return (
    <div className="text-center sm:flex sm:items-start sm:text-left xl:text-center">
      <div className="flex flex-col gap-2 items-center justify-center sm:items-start xl:items-center lg:gap-3">
        <div className="flex gap-x-3 items-center xl:flex-col xl:gap-y-3">
          <h2 className="order-2 xl:order-1 font-bold text-xl">{title}</h2>
          <Icon
            icon={icon}
            className="order-1 xl:order-2 text-2xl lg:text-3xl"
          />
        </div>
        <p className="text-primary-600 lg:text-md">{description}</p>
      </div>
    </div>
  )
}

const PerksSection = () => {
  return (
    <section className="border-y border-primary-300 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-y-0 xl:gap-20">
        {perks.map(({ icon, title, description }) => (
          <PerkCard
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </div>
    </section>
  )
}

export default PerksSection
