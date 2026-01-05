import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import VideoModal from './components/VideoModal'
import Chatbot from './components/Chatbot/Chatbot'
import './index.css'

function App() {
  const [activeModal, setActiveModal] = useState(null)

  const videoModals = [
    { id: 1, videoId: "-buVQigLGCo", start: 98 },
    { id: 2, videoId: "lyYiYlb2n_Q" },
    { id: 3, videoId: "-buVQigLGCo", start: 241 },
    { id: 4, videoId: "2F92xFSqIXM" },
    { id: 5, videoId: "jfyld2fvy88" }
  ]

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenModal={setActiveModal} />
        <Contact />
      </main>
      <Footer />
      
      {videoModals.map((modal) => (
        <VideoModal
          key={modal.id}
          isOpen={activeModal === modal.id}
          onClose={() => setActiveModal(null)}
          videoId={modal.videoId}
          startTime={modal.start}
        />
      ))}
      
      <Chatbot />
    </div>
  )
}

export default App