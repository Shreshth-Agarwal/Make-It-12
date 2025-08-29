import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  MousePointer, 
  Sparkles,
  Bot,
  SkipForward
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import './Tutorial.css'

const Tutorial = () => {
  const navigate = useNavigate()
  const { settings, updateSettings } = useGameStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)

  const tutorialSteps = [
    {
      id: 1,
      title: 'Welcome to Make It 12!',
      description: 'Learn how to play this exciting puzzle game where you combine tiles to reach the target sum.',
      icon: Target,
      image: '🎯',
      highlight: 'Welcome to the game!'
    },
    {
      id: 2,
      title: 'Select Tiles',
      description: 'Tap on tiles to select them. You can select multiple tiles at once. Selected tiles will glow with a special border.',
      icon: MousePointer,
      image: '👆',
      highlight: 'Tap tiles to select them'
    },
    {
      id: 3,
      title: 'Make 12',
      description: 'Your goal is to select tiles that add up to exactly 12. For example, you could select tiles with values 3, 4, and 5 (3+4+5=12).',
      icon: Target,
      image: '🔢',
      highlight: 'Combine tiles to reach 12'
    },
    {
      id: 4,
      title: 'Clear the Board',
      description: 'When you make a valid combination, the tiles will disappear. Keep going until you clear all tiles from the board!',
      icon: Sparkles,
      image: '✨',
      highlight: 'Clear all tiles to win'
    },
    {
      id: 5,
      title: 'Build Combos',
      description: 'Making multiple combinations quickly builds your combo multiplier, giving you higher scores!',
      icon: Sparkles,
      image: '🚀',
      highlight: 'Build combos for higher scores'
    },
    {
      id: 6,
      title: 'Level Up',
      description: 'Complete levels to unlock achievements and advance to more challenging puzzles. Good luck!',
      icon: Target,
      image: '🏆',
      highlight: 'Complete levels to advance'
    }
  ]

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Tutorial complete
      navigate('/game')
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTutorial = () => {
    setShowSkipConfirm(true)
  }

  const confirmSkip = () => {
    setShowSkipConfirm(false)
    navigate('/game')
  }

  const currentStepData = tutorialSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === tutorialSteps.length - 1

  return (
    <div className="tutorial-container">
      {/* Header */}
      <motion.div 
        className="tutorial-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>How to Play</h1>
        <button className="skip-btn" onClick={skipTutorial}>
          <SkipForward size={20} />
          Skip
        </button>
      </motion.div>

      {/* Tutorial Content */}
      <motion.div 
        className="tutorial-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Progress Bar */}
        <div className="tutorial-progress">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="progress-text">
            Step {currentStep + 1} of {tutorialSteps.length}
          </span>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          className="step-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="step-header">
            <div className="step-icon">
              <currentStepData.icon size={48} />
            </div>
            <h2>{currentStepData.title}</h2>
            <p className="step-description">{currentStepData.description}</p>
          </div>

          <div className="step-visual">
            <div className="visual-image">
              {currentStepData.image}
            </div>
            <div className="visual-highlight">
              {currentStepData.highlight}
            </div>
          </div>

          {/* Interactive Demo for certain steps */}
          {currentStep === 1 && (
            <div className="interactive-demo">
              <div className="demo-grid">
                {[3, 4, 5, 6, 8, 9].map((value, index) => (
                  <motion.div
                    key={index}
                    className="demo-tile"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {value}
                  </motion.div>
                ))}
              </div>
              <p className="demo-text">Try tapping on these demo tiles!</p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="interactive-demo">
              <div className="demo-combination">
                <div className="demo-tile selected">3</div>
                <span className="plus">+</span>
                <div className="demo-tile selected">4</div>
                <span className="plus">+</span>
                <div className="demo-tile selected">5</div>
                <span className="equals">=</span>
                <div className="demo-result">12</div>
              </div>
              <p className="demo-text">Perfect combination!</p>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="tutorial-navigation">
          <button
            className="nav-btn prev-btn"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          <div className="step-indicators">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                className={`step-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>

          <button
            className="nav-btn next-btn"
            onClick={nextStep}
          >
            {isLastStep ? 'Start Playing!' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Cursor AI Toggle */}
        <div className="ai-toggle-section">
          <div className="ai-toggle-header">
            <Bot size={20} />
            <span>Cursor AI Assistant</span>
          </div>
          <label className="ai-toggle-label">
            <input
              type="checkbox"
              checked={settings.aiAssistEnabled}
              onChange={(e) => updateSettings({ aiAssistEnabled: e.target.checked })}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">
              {settings.aiAssistEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
          <p className="ai-description">
            Get helpful hints and tips while playing the game
          </p>
        </div>
      </motion.div>

      {/* Skip Confirmation Modal */}
      <AnimatePresence>
        {showSkipConfirm && (
          <div className="modal-overlay" onClick={() => setShowSkipConfirm(false)}>
            <motion.div
              className="modal-content skip-confirm-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Skip Tutorial?</h3>
              <p>Are you sure you want to skip the tutorial? You can always access it later from the main menu.</p>
              
              <div className="skip-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowSkipConfirm(false)}
                >
                  Continue Learning
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={confirmSkip}
                >
                  Skip Tutorial
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tutorial
