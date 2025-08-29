import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Search,
  Bell,
  Calendar,
  Send,
  Image as ImageIcon,
  Smile
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import './Social.css'

const Social = () => {
  const navigate = useNavigate()
  const { totalScore, currentLevel } = useGameStore()
  const [activeTab, setActiveTab] = useState('feed')
  const [showGuildChat, setShowGuildChat] = useState(false)

  const tabs = [
    { id: 'feed', label: 'Activity Feed', icon: MessageCircle },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'guilds', label: 'Guilds', icon: Users }
  ]

  // Mock data
  const activityFeed = [
    {
      id: 1,
      user: 'Player1',
      avatar: '👤',
      action: 'completed level 15',
      score: 12500,
      timestamp: '2 minutes ago',
      likes: 5,
      comments: 2
    },
    {
      id: 2,
      user: 'Player2',
      avatar: '👤',
      action: 'unlocked Combo Master achievement',
      timestamp: '5 minutes ago',
      likes: 12,
      comments: 3
    },
    {
      id: 3,
      user: 'Player3',
      avatar: '👤',
      action: 'reached level 25',
      timestamp: '10 minutes ago',
      likes: 8,
      comments: 1
    }
  ]

  const friends = [
    { id: 1, name: 'Friend1', avatar: '👤', status: 'online', level: 18, score: 98000 },
    { id: 2, name: 'Friend2', avatar: '👤', status: 'offline', level: 22, score: 115000 },
    { id: 3, name: 'Friend3', avatar: '👤', status: 'playing', level: 15, score: 75000 }
  ]

  const guildInfo = {
    name: 'Puzzle Masters',
    members: 25,
    level: 8,
    events: [
      { id: 1, title: 'Weekly Challenge', date: 'Tomorrow', time: '2:00 PM' },
      { id: 2, title: 'Guild Tournament', date: 'Next Week', time: '3:00 PM' }
    ]
  }

  const renderFeedTab = () => (
    <div className="social-tab-content">
      <div className="feed-header">
        <h3>Recent Activity</h3>
        <button className="refresh-btn">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            🔄
          </motion.div>
        </button>
      </div>

      <div className="activity-feed">
        {activityFeed.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="activity-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="activity-avatar">
              {activity.avatar}
            </div>
            
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-action">{activity.action}</span>
                {activity.score && (
                  <span className="activity-score">+{activity.score.toLocaleString()}</span>
                )}
              </div>
              
              <div className="activity-footer">
                <span className="activity-time">{activity.timestamp}</span>
                
                <div className="activity-actions">
                  <button className="action-btn like-btn">
                    <Heart size={16} />
                    <span>{activity.likes}</span>
                  </button>
                  
                  <button className="action-btn comment-btn">
                    <MessageCircle size={16} />
                    <span>{activity.comments}</span>
                  </button>
                  
                  <button className="action-btn share-btn">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="create-post">
        <div className="post-input">
          <textarea placeholder="Share your achievement..." />
          <div className="post-actions">
            <button className="post-action-btn">
              <ImageIcon size={20} />
            </button>
            <button className="post-action-btn">
              <Smile size={20} />
            </button>
            <button className="btn btn-primary post-btn">
              <Send size={16} />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFriendsTab = () => (
    <div className="social-tab-content">
      <div className="friends-header">
        <h3>Friends</h3>
        <button className="add-friend-btn">
          <Plus size={20} />
          Add Friend
        </button>
      </div>

      <div className="friends-list">
        {friends.map((friend, index) => (
          <motion.div
            key={friend.id}
            className="friend-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="friend-avatar">
              {friend.avatar}
              <div className={`status-indicator ${friend.status}`}></div>
            </div>
            
            <div className="friend-info">
              <div className="friend-name">{friend.name}</div>
              <div className="friend-stats">
                <span>Level {friend.level}</span>
                <span>Score: {friend.score.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="friend-actions">
              <button className="friend-action-btn">
                <MessageCircle size={20} />
              </button>
              <button className="friend-action-btn">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="friend-suggestions">
        <h4>Suggested Friends</h4>
        <div className="suggestions-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="suggestion-item">
              <div className="suggestion-avatar">👤</div>
              <div className="suggestion-info">
                <span className="suggestion-name">Player{i + 10}</span>
                <span className="suggestion-level">Level {15 + i}</span>
              </div>
              <button className="btn btn-secondary add-btn">Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderGuildsTab = () => (
    <div className="social-tab-content">
      <div className="guild-header">
        <h3>Guild: {guildInfo.name}</h3>
        <button className="guild-chat-btn" onClick={() => setShowGuildChat(true)}>
          <MessageCircle size={20} />
          Chat
        </button>
      </div>

      <div className="guild-stats">
        <div className="stat-card">
          <div className="stat-value">{guildInfo.members}</div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{guildInfo.level}</div>
          <div className="stat-label">Level</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">#{guildInfo.rank || 5}</div>
          <div className="stat-label">Rank</div>
        </div>
      </div>

      <div className="guild-events">
        <h4>Upcoming Events</h4>
        <div className="events-list">
          {guildInfo.events.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="event-icon">
                <Calendar size={20} />
              </div>
              <div className="event-info">
                <div className="event-title">{event.title}</div>
                <div className="event-time">{event.date} at {event.time}</div>
              </div>
              <button className="btn btn-secondary event-btn">Join</button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="guild-members">
        <h4>Top Members</h4>
        <div className="members-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="member-item">
              <div className="member-rank">#{i}</div>
              <div className="member-avatar">👤</div>
              <div className="member-info">
                <span className="member-name">Member{i}</span>
                <span className="member-contribution">+{1000 - i * 100} XP</span>
              </div>
              <div className="member-role">
                {i === 1 ? 'Leader' : i <= 3 ? 'Officer' : 'Member'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed': return renderFeedTab()
      case 'friends': return renderFriendsTab()
      case 'guilds': return renderGuildsTab()
      default: return renderFeedTab()
    }
  }

  return (
    <div className="social-container">
      {/* Header */}
      <motion.div 
        className="social-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Social Hub</h1>
        <button className="notifications-btn">
          <Bell size={24} />
        </button>
      </motion.div>

      {/* Social Content */}
      <motion.div 
        className="social-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Tabs */}
        <div className="social-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          className="tab-content-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </motion.div>

      {/* Guild Chat Modal */}
      <AnimatePresence>
        {showGuildChat && (
          <div className="modal-overlay" onClick={() => setShowGuildChat(false)}>
            <motion.div
              className="modal-content guild-chat-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setShowGuildChat(false)}
              >
                ×
              </button>

              <div className="chat-header">
                <h3>Guild Chat - {guildInfo.name}</h3>
                <span className="online-count">{guildInfo.members} members online</span>
              </div>

              <div className="chat-messages">
                <div className="message">
                  <span className="message-user">Guild Leader:</span>
                  <span className="message-text">Welcome everyone! Don't forget about tomorrow's challenge!</span>
                </div>
                <div className="message">
                  <span className="message-user">Member1:</span>
                  <span className="message-text">I'm ready! 🎯</span>
                </div>
                <div className="message">
                  <span className="message-user">Member2:</span>
                  <span className="message-text">Count me in too!</span>
                </div>
              </div>

              <div className="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button className="btn btn-primary send-btn">
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Social
