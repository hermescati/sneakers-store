import { Collaboration } from '@/types/payload'
import CollabItem from './CollabItem'

const CollabReel = ({ collaborations }: { collaborations: Collaboration[] }) => {
  if (!collaborations || !collaborations.length) return

  return (
    <ul className="flex flex-col gap-12">
      {collaborations.map((collab, index) => (
        <li key={collab.id}>
          <CollabItem collaboration={collab} layout={index % 2 === 0 ? 'normal' : 'alternate'} />
        </li>
      ))}
    </ul>
  )
}

export default CollabReel
