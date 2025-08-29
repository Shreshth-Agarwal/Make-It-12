import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Target } from 'lucide-react'
import './SplashScreen.css'

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <motion.div
        className="splash-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Game Logo */}
        <motion.div
          className="game-logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="logo-icon">
            <Target size={80} />
            <Heart size={40} className="heart-icon" />
          </div>
          <h1 className="game-title">Make It 12</h1>
          <p className="game-subtitle">Combine tiles to reach the target!</p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </motion.div>

        {/* Team Info */}
        <motion.div
          className="team-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="team-text">Team No 1</p>
          <p className="version-text">v1.0.0</p>
        </motion.div>
      </motion.div>

      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="pattern-circle pattern-1"></div>
        <div className="pattern-circle pattern-2"></div>
        <div className="pattern-circle pattern-3"></div>
        <div className="pattern-circle pattern-4"></div>
      </div>
    </div>
  )
}

export default SplashScreen

