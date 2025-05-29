import Icon from '../base/Icon'

export interface PerkItem {
  icon: string
  title: string
  description: string
}

const PerkCard = ({ icon, title, description }: PerkItem) => {
  return (
    <div className="flex items-start gap-x-6 lg:flex-col lg:items-center lg:gap-y-3">
      <span className="flex h-10 w-10 items-center justify-center lg:h-8 lg:w-8">
        <Icon icon={icon} className="text-3xl" />
      </span>
      <div className="flex flex-col items-start lg:items-center lg:gap-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="font-medium text-primary-600 xl:text-center xl:text-md">{description}</p>
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
    <section className="border-y border-border py-8">
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-4 xl:gap-20 xl:gap-y-0">
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
