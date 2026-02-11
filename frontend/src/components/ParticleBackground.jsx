import { useMemo } from 'react'
import { motion } from 'framer-motion'

function Heart({ delay, duration, left, size, opacity }) {
  return (
    <motion.div
      className="absolute text-rose-soft pointer-events-none select-none"
      style={{ left: `${left}%`, fontSize: `${size}px`, opacity }}
      initial={{ y: '100vh', rotate: 0 }}
      animate={{ y: '-10vh', rotate: [0, 15, -15, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      &#x2665;
    </motion.div>
  )
}

export default function ParticleBackground() {
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      left: Math.random() * 100,
      size: 10 + Math.random() * 16,
      opacity: 0.06 + Math.random() * 0.12,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
    </div>
  )
}
