import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Cards from './pages/Cards'
import ParticleBackground from './components/ParticleBackground'
import MusicToggle from './components/MusicToggle'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
      <MusicToggle />
    </div>
  )
}

export default App
