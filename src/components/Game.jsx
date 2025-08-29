import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Clock, 
  Target, 
  Pause, 
  Play, 
  RotateCcw,
  Home,
  Share2,
  Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import GameBoard from './GameBoard'
import EndLevelModal from './EndLevelModal'
import './Game.css'

const Game = () => {
  const navigate = useNavigate()
  const {
    currentLevel,
    score,
    health,
    timeElapsed,
    combo,
    maxCombo,
    moves,
    isGameActive,
    isPaused,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    addNotification
  } = useGameStore()

  const [showEndLevel, setShowEndLevel] = useState(false)
  const [showPauseMenu, setShowPauseMenu] = useState(false)

  useEffect(() => {
    if (!isGameActive) {
      startGame()
    }
  }, [isGameActive, startGame])

  const handlePause = () => {
    if (isPaused) {
      resumeGame()
      setShowPauseMenu(false)
    } else {
      pauseGame()
      setShowPauseMenu(true)
    }
  }

  const handleHome = () => {
    resetGame()
    navigate('/')
  }

  const handleRestart = () => {
    resetGame()
    startGame()
    setShowPauseMenu(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleLevelComplete = () => {
    setShowEndLevel(true)
    addNotification({
      type: 'success',
      title: 'Level Complete!',
      message: `Congratulations! You completed level ${currentLevel}`
    })
  }

  return (
    <div className="game-container">
      {/* HUD - Top Bar */}
      <motion.div 
        className="hud-top"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Health */}
        <div className="hud-item health">
          <Heart size={24} className="hud-icon" />
          <span className="hud-value">{health}</span>
        </div>

        {/* Level */}
        <div className="hud-item level">
          <Target size={24} className="hud-icon" />
          <span className="hud-value">Level {currentLevel}</span>
        </div>

        {/* Timer */}
        <div className="hud-item timer">
          <Clock size={24} className="hud-icon" />
          <span className="hud-value">{formatTime(timeElapsed)}</span>
        </div>
      </motion.div>

      {/* Game Board */}
      <motion.div
        className="game-board-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GameBoard onLevelComplete={handleLevelComplete} />
      </motion.div>

      {/* HUD - Bottom Bar */}
      <motion.div 
        className="hud-bottom"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Combo Indicator */}
        <div className="hud-item combo">
          {combo > 0 && (
            <motion.div
              className="combo-display"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles size={20} className="combo-icon" />
              <span className="combo-text">Combo x{combo}</span>
            </motion.div>
          )}
        </div>

        {/* Score */}
        <div className="hud-item score">
          <span className="score-label">Score:</span>
          <span className="score-value">{score.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Game Controls */}
      <motion.div 
        className="game-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button className="control-btn" onClick={handlePause}>
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
        
        <button className="control-btn" onClick={handleRestart}>
          <RotateCcw size={20} />
        </button>
        
        <button className="control-btn" onClick={handleHome}>
          <Home size={20} />
        </button>
      </motion.div>

      {/* Pause Menu */}
      <AnimatePresence>
        {showPauseMenu && (
          <div className="modal-overlay" onClick={() => setShowPauseMenu(false)}>
            <motion.div
              className="modal-content pause-menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Game Paused</h2>
              <div className="pause-stats">
                <div className="stat-item">
                  <span className="stat-label">Level:</span>
                  <span className="stat-value">{currentLevel}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Score:</span>
                  <span className="stat-value">{score.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Time:</span>
                  <span className="stat-value">{formatTime(timeElapsed)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Moves:</span>
                  <span className="stat-value">{moves}</span>
                </div>
              </div>
              
              <div className="pause-actions">
                <button className="btn btn-primary" onClick={handleRestart}>
                  Resume
                </button>
                <button className="btn btn-secondary" onClick={handleHome}>
                  Main Menu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* End Level Modal */}
      <AnimatePresence>
        {showEndLevel && (
          <EndLevelModal 
            level={currentLevel}
            score={score}
            timeElapsed={timeElapsed}
            combo={maxCombo}
            onClose={() => setShowEndLevel(false)}
            onNextLevel={() => {
              setShowEndLevel(false)
              startGame()
            }}
            onReplay={() => {
              setShowEndLevel(false)
              resetGame()
              startGame()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Game
