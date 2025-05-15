import Icon from '@/components/base/Icon'
import { Brand } from '@/types/payload'
import YeezyLogo from '../../../../public/assets/yeezy-logo.svg'

interface BrandLogoProps {
  brand: Brand['name']
  className?: string
}

const BrandLogo = ({ brand, className }: BrandLogoProps) => {
  if (brand === 'Yeezy') {
    return (
      <Icon className={className}>
        <YeezyLogo />
      </Icon>
    )
  }

  const getBrandIcon = () => {
    if (brand === 'New Balance') return 'simple-icons:newbalance'
    return `simple-icons:${brand.toLowerCase()}`
  }

  return <Icon icon={getBrandIcon()} className={className} />
}

export default BrandLogo
