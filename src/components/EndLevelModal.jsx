import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Trophy, 
  Share2, 
  ArrowRight, 
  RotateCcw,
  Instagram,
  Twitter,
  Facebook,
  Copy
} from 'lucide-react'
import { useGameStore } from '../stores/gameStore'
import './EndLevelModal.css'

const EndLevelModal = ({ 
  level, 
  score, 
  timeElapsed, 
  combo, 
  onClose, 
  onNextLevel, 
  onReplay 
}) => {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const { totalScore } = useGameStore()

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateTimeBonus = () => {
    return Math.max(0, 300 - timeElapsed) * 10
  }

  const calculateComboBonus = () => {
    return combo * 100
  }

  const finalScore = score + calculateTimeBonus() + calculateComboBonus()

  const handleShare = (platform) => {
    const shareData = {
      title: `Level ${level} Complete!`,
      text: `I just completed level ${level} in Make It 12 with a score of ${finalScore.toLocaleString()}!`,
      url: window.location.href
    }

    if (platform === 'instagram') {
      // For Instagram, we'll create a downloadable image
      createShareImage()
    } else if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`
      window.open(twitterUrl, '_blank')
    } else if (platform === 'facebook') {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
      window.open(facebookUrl, '_blank')
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
      // Show success message
    }
  }

  const createShareImage = () => {
    // Create a canvas element to generate the share image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1080
    canvas.height = 1920

    // Background
    ctx.fillStyle = '#F5F5DC'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Title
    ctx.fillStyle = '#5C4033'
    ctx.font = 'bold 72px Merriweather'
    ctx.textAlign = 'center'
    ctx.fillText('Level Complete!', canvas.width / 2, 200)

    // Level
    ctx.font = 'bold 48px Merriweather'
    ctx.fillText(`Level ${level}`, canvas.width / 2, 300)

    // Score
    ctx.font = 'bold 36px Open Sans'
    ctx.fillText(`Score: ${finalScore.toLocaleString()}`, canvas.width / 2, 450)

    // Stats
    ctx.font = '24px Open Sans'
    ctx.fillText(`Time: ${formatTime(timeElapsed)}`, canvas.width / 2, 550)
    ctx.fillText(`Combo: x${combo}`, canvas.width / 2, 600)

    // Game logo
    ctx.fillStyle = '#8B5E3C'
    ctx.font = 'bold 36px Open Sans'
    ctx.fillText('Make It 12', canvas.width / 2, 700)

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `level-${level}-complete.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content end-level-modal"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Header */}
        <div className="modal-header">
          <motion.div
            className="success-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <Trophy size={64} />
          </motion.div>
          <h1>Level Complete!</h1>
          <p className="level-info">Level {level} conquered!</p>
        </div>

        {/* Score Summary */}
        <div className="score-summary">
          <div className="score-item total-score">
            <span className="score-label">Total Score</span>
            <span className="score-value">{finalScore.toLocaleString()}</span>
          </div>

          <div className="score-breakdown">
            <div className="score-item">
              <Clock size={20} className="score-icon" />
              <span className="score-label">Time Bonus</span>
              <span className="score-value">+{calculateTimeBonus()}</span>
            </div>

            <div className="score-item">
              <Trophy size={20} className="score-icon" />
              <span className="score-label">Combo Bonus</span>
              <span className="score-value">+{calculateComboBonus()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <motion.button
            className="btn btn-primary"
            onClick={onNextLevel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight size={20} />
            Next Level
          </motion.button>

          <motion.button
            className="btn btn-secondary"
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            Replay
          </motion.button>

          <motion.button
            className="btn btn-secondary share-btn"
            onClick={() => setShowShareOptions(!showShareOptions)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={20} />
            Share Achievement
          </motion.button>
        </div>

        {/* Share Options */}
        <AnimatePresence>
          {showShareOptions && (
            <motion.div
              className="share-options"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="share-message">
                <textarea
                  placeholder="Add a custom message..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="share-platforms">
                <button 
                  className="share-platform instagram"
                  onClick={() => handleShare('instagram')}
                >
                  <Instagram size={24} />
                  <span>Instagram</span>
                </button>

                <button 
                  className="share-platform twitter"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter size={24} />
                  <span>Twitter</span>
                </button>

                <button 
                  className="share-platform facebook"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook size={24} />
                  <span>Facebook</span>
                </button>

                <button 
                  className="share-platform copy"
                  onClick={() => handleShare('copy')}
                >
                  <Copy size={24} />
                  <span>Copy Link</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default EndLevelModal
