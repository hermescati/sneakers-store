import { Icon } from '@iconify/react'

export interface PerkItem {
  icon: string
  title: string
  description: string
}

const PerkCard = ({ icon, title, description }: PerkItem) => {
  return (
    <div className="flex lg:flex-col gap-x-6 lg:gap-y-3 items-start lg:items-center">
      <Icon icon={icon} className="text-4xl lg:text-3xl" />
      <div className="flex flex-col items-start lg:items-center lg:gap-y-1">
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="font-medium text-primary-600 xl:text-md xl:text-center">
          {description}
        </p>
      </div>
    </div>
  )
}

const PerksSection = () => {
  const perks: PerkItem[] = [
    {
      icon: 'solar:shield-check-outline',
      title: 'Authenticity Guarantee',
      description: 'Every sneaker is verified by our expert team for 100% authenticity.'
    },
    {
      icon: 'prime:warehouse',
      title: 'In-house Inventory',
      description: 'Seamless service with fast, direct inventory handling.'
    },
    {
      icon: 'hugeicons:delivery-truck-01',
      title: 'Worldwide Shipping',
      description: 'Reliable global shipping with trusted partners like UPS and DHL.'
    },
    {
      icon: 'fad:undo',
      title: 'Returns Accepted',
      description: 'Easy returns process to ensure customer satisfaction.'
    }
  ]

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
