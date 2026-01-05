import { useEffect } from 'react'

const VideoModal = ({ isOpen, onClose, videoId, startTime }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const videoUrl = startTime 
    ? `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1`

  return (
    <div className="modal show">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="video-container">
          <iframe 
            width="100%" 
            height="100%" 
            src={videoUrl}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
    </div>
  )
}

export default VideoModal