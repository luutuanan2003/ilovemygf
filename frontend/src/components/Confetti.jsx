import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const valentineColors = ['#BE123C', '#FDA4AF', '#D4A574', '#FF69B4', '#FFE4E6', '#B8860B']

export function fireConfetti() {
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 80,
    zIndex: 9999,
    colors: valentineColors,
  }

  // Burst from left
  confetti({
    ...defaults,
    particleCount: 80,
    origin: { x: 0.2, y: 0.6 },
  })

  // Burst from right
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 80,
      origin: { x: 0.8, y: 0.6 },
    })
  }, 150)

  // Center burst
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 120,
      origin: { x: 0.5, y: 0.4 },
      spread: 120,
    })
  }, 300)
}

export function fireFinaleConfetti() {
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: valentineColors,
      zIndex: 9999,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: valentineColors,
      zIndex: 9999,
    })
    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }
  frame()
}

export default function ConfettiBurst() {
  useEffect(() => {
    fireConfetti()
  }, [])
  return null
}
