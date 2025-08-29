import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import MainMenu from './components/MainMenu'
import Game from './components/Game'
import Achievements from './components/Achievements'
import Leaderboard from './components/Leaderboard'
import Settings from './components/Settings'
import Social from './components/Social'
import Tutorial from './components/Tutorial'
import { useGameStore } from './stores/gameStore'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentRoute, setCurrentRoute] = useState('/')
  const { initializeGame } = useGameStore()

  useEffect(() => {
    // Simulate loading time and initialize game
    const timer = setTimeout(() => {
      initializeGame()
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [initializeGame])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <Routes key={currentRoute}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MainMenu onNavigate={setCurrentRoute} />
              </motion.div>
            } 
          />
          <Route 
            path="/game" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Game />
              </motion.div>
            } 
          />
          <Route 
            path="/tutorial" 
            element={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Tutorial />
              </motion.div>
            } 
          />
          <Route 
            path="/achievements" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Achievements />
              </motion.div>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Leaderboard />
              </motion.div>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Settings />
              </motion.div>
            } 
          />
          <Route 
            path="/social" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Social />
              </motion.div>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
