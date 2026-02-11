import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import FlipCard from './FlipCard'
import personalData from '../data/personal-messages.json'

export default function CardGallery() {
  const [searchParams] = useSearchParams()
  const debugReveal = searchParams.get('reveal') === 'true'

  const cards = personalData.cards

  const isCardUnlocked = (unlockDate) => {
    if (debugReveal) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const unlock = new Date(unlockDate)
    unlock.setHours(0, 0, 0, 0)
    return today >= unlock
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
    >
      {cards.map((card) => (
        <FlipCard
          key={card.id}
          card={card}
          isUnlocked={isCardUnlocked(card.unlock_date)}
        />
      ))}
    </motion.div>
  )
}
