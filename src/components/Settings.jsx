import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Volume2, 
  Music, 
  Gamepad2, 
  Bot, 
  User, 
  Shield,
  Sun,
  Moon,
  Languages
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import './Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const { settings, updateSettings } = useGameStore()
  const [activeTab, setActiveTab] = useState('audio')

  const tabs = [
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'gameplay', label: 'Gameplay', icon: Gamepad2 },
    { id: 'ai', label: 'AI Assist', icon: Bot },
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ]

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value })
  }

  const renderAudioTab = () => (
    <div className="settings-tab-content">
      <h3>Audio Settings</h3>
      
      <div className="setting-item">
        <div className="setting-label">
          <Volume2 size={20} />
          <span>Sound Effects</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <Music size={20} />
          <span>Background Music</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.musicEnabled}
            onChange={(e) => handleSettingChange('musicEnabled', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Sound Volume</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.soundVolume || 80}
          onChange={(e) => handleSettingChange('soundVolume', parseInt(e.target.value))}
          className="volume-slider"
        />
        <span className="volume-value">{settings.soundVolume || 80}%</span>
      </div>
    </div>
  )

  const renderGameplayTab = () => (
    <div className="settings-tab-content">
      <h3>Gameplay Settings</h3>
      
      <div className="setting-item">
        <div className="setting-label">
          <span>Theme</span>
        </div>
        <div className="theme-options">
          <button
            className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleSettingChange('theme', 'light')}
          >
            <Sun size={20} />
            Light
          </button>
          <button
            className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleSettingChange('theme', 'dark')}
          >
            <Moon size={20} />
            Dark
          </button>
        </div>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Font Size</span>
        </div>
        <div className="font-size-controls">
          <input
            type="range"
            min="12"
            max="24"
            value={settings.fontSize || 16}
            onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
            className="font-slider"
          />
          <div className="font-preview" style={{ fontSize: `${settings.fontSize || 16}px` }}>
            Sample Text
          </div>
        </div>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Animation Speed</span>
        </div>
        <select
          value={settings.animationSpeed || 'normal'}
          onChange={(e) => handleSettingChange('animationSpeed', e.target.value)}
          className="setting-select"
        >
          <option value="slow">Slow</option>
          <option value="normal">Normal</option>
          <option value="fast">Fast</option>
        </select>
      </div>
    </div>
  )

  const renderAITab = () => (
    <div className="settings-tab-content">
      <h3>AI Assistant Settings</h3>
      
      <div className="setting-item">
        <div className="setting-label">
          <Bot size={20} />
          <span>Cursor AI Assist</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.aiAssistEnabled}
            onChange={(e) => handleSettingChange('aiAssistEnabled', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>AI Hint Level</span>
        </div>
        <select
          value={settings.aiHintLevel || 'medium'}
          onChange={(e) => handleSettingChange('aiHintLevel', e.target.value)}
          className="setting-select"
          disabled={!settings.aiAssistEnabled}
        >
          <option value="low">Low (Minimal hints)</option>
          <option value="medium">Medium (Balanced)</option>
          <option value="high">High (Detailed guidance)</option>
        </select>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Auto-solve Threshold</span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          value={settings.autoSolveThreshold || 30}
          onChange={(e) => handleSettingChange('autoSolveThreshold', parseInt(e.target.value))}
          className="range-slider"
          disabled={!settings.aiAssistEnabled}
        />
        <span className="range-value">{settings.autoSolveThreshold || 30} seconds</span>
      </div>
    </div>
  )

  const renderAccountTab = () => (
    <div className="settings-tab-content">
      <h3>Account Settings</h3>
      
      <div className="setting-item">
        <div className="setting-label">
          <Languages size={20} />
          <span>Language</span>
        </div>
        <select
          value={settings.language || 'en'}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className="setting-select"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Username</span>
        </div>
        <input
          type="text"
          value={settings.username || 'Player'}
          onChange={(e) => handleSettingChange('username', e.target.value)}
          className="setting-input"
          placeholder="Enter username"
        />
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Email Notifications</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.emailNotifications || false}
            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  )

  const renderPrivacyTab = () => (
    <div className="settings-tab-content">
      <h3>Privacy Settings</h3>
      
      <div className="setting-item">
        <div className="setting-label">
          <span>Profile Visibility</span>
        </div>
        <select
          value={settings.profileVisibility || 'public'}
          onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
          className="setting-select"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Share Game Progress</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.shareProgress || true}
            onChange={(e) => handleSettingChange('shareProgress', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-label">
          <span>Analytics & Tracking</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.analytics || false}
            onChange={(e) => handleSettingChange('analytics', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="privacy-actions">
        <button className="btn btn-secondary">
          Export My Data
        </button>
        <button className="btn btn-secondary">
          Delete Account
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'audio': return renderAudioTab()
      case 'gameplay': return renderGameplayTab()
      case 'ai': return renderAITab()
      case 'account': return renderAccountTab()
      case 'privacy': return renderPrivacyTab()
      default: return renderAudioTab()
    }
  }

  return (
    <div className="settings-container">
      {/* Header */}
      <motion.div 
        className="settings-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Settings</h1>
      </motion.div>

      {/* Settings Content */}
      <motion.div 
        className="settings-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Tabs */}
        <div className="settings-tabs">
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
    </div>
  )
}

export default Settings
