import { motion } from 'framer-motion'
import FlipCard from './FlipCard'
import personalData from '../data/personal-messages.json'

export default function CardGallery() {
  const cards = personalData.cards

  // All cards are now unlocked — no more daily gating
  const isCardUnlocked = () => true

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
      className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 min-[400px]:gap-4 sm:gap-5"
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
