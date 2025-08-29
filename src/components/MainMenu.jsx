import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Trophy, 
  BarChart3, 
  Settings, 
  Share2, 
  Volume2, 
  VolumeX,
  Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import './MainMenu.css'

const MainMenu = ({ onNavigate }) => {
  const navigate = useNavigate()
  const { settings, updateSettings } = useGameStore()
  const [showTutorial, setShowTutorial] = useState(false)

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path)
    }
    navigate(path)
  }

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled })
  }

  const menuItems = [
    { 
      id: 'start', 
      label: 'Start Game', 
      icon: Play, 
      action: () => handleNavigation('/game'),
      primary: true 
    },
    { 
      id: 'achievements', 
      label: 'Achievements', 
      icon: Trophy, 
      action: () => handleNavigation('/achievements') 
    },
    { 
      id: 'leaderboard', 
      label: 'Leaderboard', 
      icon: BarChart3, 
      action: () => handleNavigation('/leaderboard') 
    }
  ]

  const cornerButtons = [
    { 
      id: 'settings', 
      icon: Settings, 
      action: () => handleNavigation('/settings'),
      position: 'bottom-left' 
    },
    { 
      id: 'social', 
      icon: Share2, 
      action: () => handleNavigation('/social'),
      position: 'bottom-right' 
    }
  ]

  return (
    <div className="main-menu">
      <div className="menu-container">
        {/* Sound Toggle - Top Right */}
        <motion.button
          className="sound-toggle"
          onClick={toggleSound}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {settings.soundEnabled ? (
            <Volume2 size={24} className="icon" />
          ) : (
            <VolumeX size={24} className="icon" />
          )}
        </motion.button>

        {/* Main Menu Card */}
        <motion.div
          className="menu-card"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Game Title */}
          <motion.div
            className="menu-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1>Make It 12</h1>
            <p>Combine tiles to reach the target!</p>
          </motion.div>

          {/* Main Menu Buttons */}
          <div className="menu-buttons">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`btn ${item.primary ? 'btn-primary' : 'btn-secondary'}`}
                onClick={item.action}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={20} className="btn-icon" />
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Tutorial Button */}
          <motion.div
            className="tutorial-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button 
              className="tutorial-btn"
              onClick={() => setShowTutorial(true)}
            >
              <Sparkles size={16} />
              How to Play
            </button>
          </motion.div>
        </motion.div>

        {/* Corner Buttons */}
        {cornerButtons.map((button, index) => (
          <motion.button
            key={button.id}
            className={`corner-button ${button.position}`}
            onClick={button.action}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button.icon size={24} className="icon" />
          </motion.button>
        ))}
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="modal-overlay" onClick={() => setShowTutorial(false)}>
          <motion.div
            className="modal-content tutorial-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close"
              onClick={() => setShowTutorial(false)}
            >
              ×
            </button>
            
            <h2>How to Play</h2>
            <div className="tutorial-steps">
              <div className="tutorial-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Select Tiles</h3>
                  <p>Tap on tiles to select them. You can select multiple tiles.</p>
                </div>
              </div>
              
              <div className="tutorial-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Make 12</h3>
                  <p>Combine selected tiles to reach a sum of exactly 12.</p>
                </div>
              </div>
              
              <div className="tutorial-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Clear the Board</h3>
                  <p>Remove all tiles to complete the level and advance!</p>
                </div>
              </div>
            </div>

            <div className="tutorial-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setShowTutorial(false)
                  handleNavigation('/game')
                }}
              >
                Start Playing!
              </button>
              
              <div className="ai-toggle-section">
                <label className="ai-toggle-label">
                  <input 
                    type="checkbox" 
                    checked={settings.aiAssistEnabled}
                    onChange={(e) => updateSettings({ aiAssistEnabled: e.target.checked })}
                  />
                  <span className="toggle-slider"></span>
                  Cursor AI Assist
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default MainMenu
