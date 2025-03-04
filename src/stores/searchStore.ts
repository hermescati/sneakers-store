import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SearchState = {
  isExpanded: boolean
  expandSearch: () => void
  closeSearch: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      isExpanded: false,
      expandSearch: () => set({ isExpanded: true }),
      closeSearch: () => set({ isExpanded: false })
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)