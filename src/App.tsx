import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExteriorScene from './scenes/ExteriorScene'
import SafeSpace from './scenes/SafeSpace'
import MusicRoom from './scenes/MusicRoom'
import Gallery from './scenes/Gallery'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExteriorScene />} />
        <Route path="/safe-space" element={<SafeSpace />} />
        <Route path="/music-room" element={<MusicRoom />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
