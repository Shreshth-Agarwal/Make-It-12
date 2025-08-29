import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Award, 
  Star,
  Share2,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import './Leaderboard.css'

const Leaderboard = () => {
  const navigate = useNavigate()
  const { totalScore } = useGameStore()
  const [sortBy, setSortBy] = useState('score')
  const [sortOrder, setSortOrder] = useState('desc')

  // Mock leaderboard data - in a real app this would come from an API
  const leaderboardData = [
    { id: 1, name: 'Player 1', score: 125000, rank: 1, badge: 'gold' },
    { id: 2, name: 'Player 2', score: 118000, rank: 2, badge: 'silver' },
    { id: 3, name: 'Player 3', score: 112000, rank: 3, badge: 'bronze' },
    { id: 4, name: 'Player 4', score: 105000, rank: 4, badge: 'star' },
    { id: 5, name: 'Player 5', score: 98000, rank: 5, badge: 'star' },
    { id: 6, name: 'Player 6', score: 92000, rank: 6, badge: 'star' },
    { id: 7, name: 'Player 7', score: 88000, rank: 7, badge: 'star' },
    { id: 8, name: 'Player 8', score: 85000, rank: 8, badge: 'star' },
    { id: 9, name: 'Player 9', score: 82000, rank: 9, badge: 'star' },
    { id: 10, name: 'Player 10', score: 80000, rank: 10, badge: 'star' },
    // Current player (you)
    { id: 'current', name: 'You', score: totalScore, rank: 15, badge: 'star', isCurrentPlayer: true }
  ]

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold': return <Trophy size={24} className="badge-icon gold" />
      case 'silver': return <Medal size={24} className="badge-icon silver" />
      case 'bronze': return <Award size={24} className="badge-icon bronze" />
      default: return <Star size={24} className="badge-icon star" />
    }
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const sortedData = [...leaderboardData].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]
    
    if (sortBy === 'name') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const getSortIcon = (field) => {
    if (sortBy !== field) return null
    
    return sortOrder === 'asc' 
      ? <TrendingUp size={16} className="sort-icon" />
      : <TrendingDown size={16} className="sort-icon" />
  }

  const handleShare = () => {
    const shareText = `Check out my rank on the Make It 12 leaderboard! 🏆`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: 'Leaderboard Rank',
        text: shareText,
        url: shareUrl
      })
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    }
  }

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <motion.div 
        className="leaderboard-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Leaderboard</h1>
        <button className="share-btn" onClick={handleShare}>
          <Share2 size={24} />
        </button>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div 
        className="leaderboard-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="table-header">
          <div className="header-cell rank" onClick={() => handleSort('rank')}>
            Rank
            {getSortIcon('rank')}
          </div>
          <div className="header-cell player" onClick={() => handleSort('name')}>
            Player
            {getSortIcon('name')}
          </div>
          <div className="header-cell score" onClick={() => handleSort('score')}>
            Score
            {getSortIcon('score')}
          </div>
          <div className="header-cell badge">
            Badge
          </div>
        </div>

        <div className="table-body">
          {sortedData.map((player, index) => (
            <motion.div
              key={player.id}
              className={`table-row ${player.isCurrentPlayer ? 'current-player' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="cell rank">
                <span className="rank-number">{player.rank}</span>
              </div>
              
              <div className="cell player">
                <span className="player-name">{player.name}</span>
                {player.isCurrentPlayer && (
                  <span className="current-indicator">(You)</span>
                )}
              </div>
              
              <div className="cell score">
                <span className="score-value">{player.score.toLocaleString()}</span>
              </div>
              
              <div className="cell badge">
                {getBadgeIcon(player.badge)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Current Player Stats */}
      <motion.div 
        className="current-player-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="stats-card">
          <h3>Your Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Current Rank</span>
              <span className="stat-value">#{leaderboardData.find(p => p.isCurrentPlayer)?.rank || 'N/A'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Score</span>
              <span className="stat-value">{totalScore.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Next Goal</span>
              <span className="stat-value">
                {(() => {
                  const currentPlayer = leaderboardData.find(p => p.isCurrentPlayer)
                  const nextPlayer = leaderboardData.find(p => p.rank === (currentPlayer?.rank || 0) - 1)
                  return nextPlayer ? `${nextPlayer.score.toLocaleString()}` : 'Top 10!'
                })()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Section */}
      <motion.div 
        className="share-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h3>Share Your Achievement</h3>
        <p>Let your friends know about your progress!</p>
        <button className="btn btn-primary" onClick={handleShare}>
          <Share2 size={20} />
          Share My Rank
        </button>
      </motion.div>
    </div>
  )
}

export default Leaderboard
