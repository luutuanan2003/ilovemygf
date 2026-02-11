import { useState, useEffect, useCallback } from 'react'

const TARGET_DATE = new Date('2026-02-14T00:00:00')

function calculateTimeLeft() {
  const now = Date.now()
  const diff = TARGET_DATE.getTime() - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  }
}

export default function useCountdown(debugReveal = false) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (debugReveal) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }
    // Check localStorage for persisted reveal
    const revealed = localStorage.getItem('valentine-revealed')
    if (revealed === 'true') {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }
    return calculateTimeLeft()
  })

  useEffect(() => {
    if (debugReveal || timeLeft.isExpired) {
      if (timeLeft.isExpired) {
        localStorage.setItem('valentine-revealed', 'true')
      }
      return
    }

    const interval = setInterval(() => {
      const updated = calculateTimeLeft()
      setTimeLeft(updated)
      if (updated.isExpired) {
        localStorage.setItem('valentine-revealed', 'true')
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [debugReveal, timeLeft.isExpired])

  return timeLeft
}
