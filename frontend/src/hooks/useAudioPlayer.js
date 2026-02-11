import { useRef, useState, useEffect, useCallback } from 'react'

export default function useAudioPlayer(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const triedAutoplay = useRef(false)

  const startPlayback = useCallback(() => {
    if (!audioRef.current || isPlaying) return
    audioRef.current.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {})
  }, [isPlaying])

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Try autoplay immediately
    audioRef.current.play().then(() => {
      setIsPlaying(true)
      triedAutoplay.current = true
    }).catch(() => {
      // Browser blocked autoplay — play on first user interaction
      const playOnInteraction = () => {
        if (audioRef.current && !triedAutoplay.current) {
          triedAutoplay.current = true
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
        }
        document.removeEventListener('click', playOnInteraction)
        document.removeEventListener('touchstart', playOnInteraction)
      }
      document.addEventListener('click', playOnInteraction, { once: true })
      document.addEventListener('touchstart', playOnInteraction, { once: true })
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src])

  const toggle = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  return { isPlaying, toggle }
}
