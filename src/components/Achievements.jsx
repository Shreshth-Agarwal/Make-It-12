import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Crown,
  Share2,
  ArrowLeft,
  Filter
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import './Achievements.css'

const Achievements = () => {
  const navigate = useNavigate()
  const { achievements, totalScore } = useGameStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const achievementCategories = {
    all: { label: 'All Achievements', icon: Trophy },
    progress: { label: 'Progress', icon: Target },
    combo: { label: 'Combo Master', icon: Zap },
    speed: { label: 'Speed Demon', icon: Star },
    mastery: { label: 'Mastery', icon: Crown }
  }

  const achievementData = [
    {
      id: 'firstWin',
      title: 'First Victory',
      description: 'Complete your first level',
      category: 'progress',
      icon: Trophy,
      unlocked: achievements.firstWin.unlocked,
      progress: achievements.firstWin.progress,
      maxProgress: achievements.firstWin.maxProgress
    },
    {
      id: 'comboMaster',
      title: 'Combo Master',
      description: 'Achieve a 10x combo',
      category: 'combo',
      icon: Zap,
      unlocked: achievements.comboMaster.unlocked,
      progress: achievements.comboMaster.progress,
      maxProgress: achievements.comboMaster.maxProgress
    },
    {
      id: 'speedDemon',
      title: 'Speed Demon',
      description: 'Complete 5 levels in under 1 minute each',
      category: 'speed',
      icon: Star,
      unlocked: achievements.speedDemon.unlocked,
      progress: achievements.speedDemon.progress,
      maxProgress: achievements.speedDemon.maxProgress
    },
    {
      id: 'levelMaster',
      title: 'Level Master',
      description: 'Reach level 25',
      category: 'mastery',
      icon: Crown,
      unlocked: achievements.levelMaster.unlocked,
      progress: achievements.levelMaster.progress,
      maxProgress: achievements.levelMaster.maxProgress
    },
    {
      id: 'perfectPlayer',
      title: 'Perfect Player',
      description: 'Achieve 10 perfect combinations',
      category: 'mastery',
      icon: Target,
      unlocked: achievements.perfectPlayer.unlocked,
      progress: achievements.perfectPlayer.progress,
      maxProgress: achievements.perfectPlayer.maxProgress
    }
  ]

  const filteredAchievements = selectedCategory === 'all' 
    ? achievementData 
    : achievementData.filter(achievement => achievement.category === selectedCategory)

  const unlockedCount = achievementData.filter(a => a.unlocked).length
  const totalCount = achievementData.length

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement)
  }

  const handleShare = (achievement) => {
    const shareText = `I just unlocked "${achievement.title}" in Make It 12! 🎉`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Achievement Unlocked!',
        text: shareText,
        url: shareUrl
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    }
  }

  return (
    <div className="achievements-container">
      {/* Header */}
      <motion.div 
        className="achievements-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Achievements</h1>
        <div className="achievement-stats">
          <span className="stats-text">{unlockedCount}/{totalCount}</span>
          <Trophy size={24} className="stats-icon" />
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div 
        className="category-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="filter-header">
          <Filter size={20} />
          <span>Filter by Category</span>
        </div>
        <div className="filter-buttons">
          {Object.entries(achievementCategories).map(([key, category]) => (
            <button
              key={key}
              className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
            >
              <category.icon size={16} />
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <motion.div 
        className="achievements-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => handleAchievementClick(achievement)}
          >
            <div className="achievement-icon">
              <achievement.icon 
                size={32} 
                className={achievement.unlocked ? 'icon-unlocked' : 'icon-locked'} 
              />
              {achievement.unlocked && (
                <motion.div
                  className="unlock-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  ✓
                </motion.div>
              )}
            </div>

            <div className="achievement-content">
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
              
              <div className="achievement-progress">
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  />
                </div>
                <span className="progress-text">
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
            </div>

            {achievement.unlocked && (
              <motion.button
                className="share-achievement-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  handleShare(achievement)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={16} />
              </motion.button>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="modal-overlay" onClick={() => setSelectedAchievement(null)}>
            <motion.div
              className="modal-content achievement-detail-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedAchievement(null)}
              >
                ×
              </button>

              <div className="achievement-detail">
                <div className="detail-icon">
                  <selectedAchievement.icon size={64} className="icon-unlocked" />
                </div>
                
                <h2>{selectedAchievement.title}</h2>
                <p className="detail-description">{selectedAchievement.description}</p>
                
                <div className="detail-progress">
                  <div className="progress-info">
                    <span>Progress: {selectedAchievement.progress}/{selectedAchievement.maxProgress}</span>
                    <span className="progress-percentage">
                      {Math.round((selectedAchievement.progress / selectedAchievement.maxProgress) * 100)}%
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {selectedAchievement.unlocked && (
                  <div className="detail-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleShare(selectedAchievement)}
                    >
                      <Share2 size={20} />
                      Share Achievement
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Achievements
