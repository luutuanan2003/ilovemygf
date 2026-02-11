import { useMemo } from 'react'

export default function useCardUnlock(unlockDate, debugReveal = false) {
  const isUnlocked = useMemo(() => {
    if (debugReveal) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const unlock = new Date(unlockDate)
    unlock.setHours(0, 0, 0, 0)
    return today >= unlock
  }, [unlockDate, debugReveal])

  return isUnlocked
}
