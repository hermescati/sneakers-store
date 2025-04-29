import Icon from '@/components/base/Icon'
import { Brand } from '@/types/payload'

interface BrandLogoProps {
  brand: Brand['name']
  className?: string
}

const BrandLogo = ({ brand, className }: BrandLogoProps) => {
  if (brand === 'Yeezy') {
    return (
      <Icon
        src="/assets/yeezy-logo.svg"
        alt="Yeezy logo"
        className={className}
      />
    )
  }

  const getBrandIcon = () => {
    if (brand === 'New Balance') return 'simple-icons:newbalance'
    return `simple-icons:${brand.toLowerCase()}`
  }

  return <Icon icon={getBrandIcon()} className={className} />
}

export default BrandLogo
