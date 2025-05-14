'use client'

import { useMediaQuery } from 'usehooks-ts'
import { Toaster as ToasterSonner } from 'sonner'

const Toaster = () => {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const position = isMobile ? 'top-center' : 'bottom-right'

  return <ToasterSonner position={position} />
}

export default Toaster
