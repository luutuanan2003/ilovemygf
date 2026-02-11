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

const miniFlower = `  .ooo.
.8888888.
88"T"T888
 "888888"
  "888"
    |`

function FloatingFlower({ delay, duration, left, opacity, scale }) {
  return (
    <motion.pre
      className="absolute text-rose-deep pointer-events-none select-none font-mono"
      style={{
        left: `${left}%`,
        opacity,
        fontSize: `${scale}px`,
        lineHeight: 1.1,
      }}
      initial={{ y: '110vh', rotate: -5 }}
      animate={{ y: '-20vh', rotate: [0, 8, -8, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {miniFlower}
    </motion.pre>
  )
}

export default function ParticleBackground() {
  const hearts = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      left: Math.random() * 100,
      size: 10 + Math.random() * 16,
      opacity: 0.06 + Math.random() * 0.12,
    }))
  }, [])

  const flowers = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      duration: 14 + Math.random() * 10,
      left: Math.random() * 90 + 5,
      opacity: 0.04 + Math.random() * 0.06,
      scale: 3 + Math.random() * 3,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
      {flowers.map((flower) => (
        <FloatingFlower key={`f-${flower.id}`} {...flower} />
      ))}
    </div>
  )
}
