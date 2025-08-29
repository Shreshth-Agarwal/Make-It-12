import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set, get) => ({
      // Game State
      currentLevel: 1,
      maxLevel: 50,
      isGameActive: false,
      isPaused: false,
      
      // Player Stats
      score: 0,
      totalScore: 0,
      health: 3,
      maxHealth: 3,
      moves: 0,
      timeElapsed: 0,
      combo: 0,
      maxCombo: 0,
      
      // Game Board
      board: [],
      boardSize: 4,
      selectedTiles: [],
      targetSum: 12,
      
      // Achievements
      achievements: {
        firstWin: { unlocked: false, progress: 0, maxProgress: 1 },
        comboMaster: { unlocked: false, progress: 0, maxProgress: 10 },
        speedDemon: { unlocked: false, progress: 0, maxProgress: 5 },
        levelMaster: { unlocked: false, progress: 0, maxProgress: 25 },
        perfectPlayer: { unlocked: false, progress: 0, maxProgress: 10 }
      },
      
      // Settings
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        aiAssistEnabled: false,
        language: 'en',
        fontSize: 'medium'
      },
      
      // Social Features
      friends: [],
      guild: null,
      leaderboard: [],
      notifications: [],
      
      // Actions
      initializeGame: () => {
        set({
          currentLevel: 1,
          score: 0,
          totalScore: 0,
          health: 3,
          moves: 0,
          timeElapsed: 0,
          combo: 0,
          maxCombo: 0,
          isGameActive: false,
          isPaused: false
        })
        get().generateBoard()
      },
      
      generateBoard: () => {
        const { currentLevel, boardSize } = get()
        const board = []
        
        // Generate board based on level
        for (let i = 0; i < boardSize; i++) {
          board[i] = []
          for (let j = 0; j < boardSize; j++) {
            // Generate numbers that can potentially sum to 12
            const possibleNumbers = [1, 2, 3, 4, 6, 8, 9, 12]
            const randomIndex = Math.floor(Math.random() * possibleNumbers.length)
            board[i][j] = {
              value: possibleNumbers[randomIndex],
              id: `${i}-${j}`,
              row: i,
              col: j,
              isSelected: false,
              isMatched: false
            }
          }
        }
        
        set({ board, selectedTiles: [] })
      },
      
      startGame: () => {
        set({ 
          isGameActive: true, 
          isPaused: false,
          timeElapsed: 0,
          moves: 0,
          combo: 0
        })
        get().startTimer()
      },
      
      pauseGame: () => {
        set({ isPaused: true })
        get().stopTimer()
      },
      
      resumeGame: () => {
        set({ isPaused: false })
        get().startTimer()
      },
      
      endGame: () => {
        set({ isGameActive: false })
        get().stopTimer()
        get().calculateFinalScore()
      },
      
      startTimer: () => {
        const timer = setInterval(() => {
          const { isGameActive, isPaused, timeElapsed } = get()
          if (isGameActive && !isPaused) {
            set({ timeElapsed: timeElapsed + 1 })
          }
        }, 1000)
        set({ timer })
      },
      
      stopTimer: () => {
        const { timer } = get()
        if (timer) {
          clearInterval(timer)
          set({ timer: null })
        }
      },
      
      selectTile: (tileId) => {
        const { board, selectedTiles, targetSum } = get()
        const tile = board.flat().find(t => t.id === tileId)
        
        if (!tile || tile.isMatched) return
        
        const newSelectedTiles = [...selectedTiles]
        const tileIndex = newSelectedTiles.findIndex(t => t.id === tileId)
        
        if (tileIndex === -1) {
          newSelectedTiles.push(tile)
        } else {
          newSelectedTiles.splice(tileIndex, 1)
        }
        
        set({ selectedTiles: newSelectedTiles })
        
        // Check if we have a valid combination
        if (newSelectedTiles.length > 0) {
          const sum = newSelectedTiles.reduce((acc, t) => acc + t.value, 0)
          if (sum === targetSum) {
            get().completeCombination(newSelectedTiles)
          }
        }
      },
      
      completeCombination: (tiles) => {
        const { board, score, combo, maxCombo } = get()
        
        // Mark tiles as matched
        const newBoard = board.map(row => 
          row.map(tile => 
            tiles.some(t => t.id === tile.id) 
              ? { ...tile, isMatched: true }
              : tile
          )
        )
        
        // Calculate score
        const baseScore = tiles.length * 100
        const comboMultiplier = Math.pow(2, combo)
        const newScore = score + (baseScore * comboMultiplier)
        const newCombo = combo + 1
        const newMaxCombo = Math.max(maxCombo, newCombo)
        
        set({
          board: newBoard,
          score: newScore,
          combo: newCombo,
          maxCombo: newMaxCombo,
          selectedTiles: []
        })
        
        // Check for level completion
        get().checkLevelCompletion()
        
        // Update achievements
        get().updateAchievements()
      },
      
      checkLevelCompletion: () => {
        const { board } = get()
        const remainingTiles = board.flat().filter(tile => !tile.isMatched)
        
        if (remainingTiles.length === 0) {
          get().completeLevel()
        }
      },
      
      completeLevel: () => {
        const { currentLevel, score, timeElapsed, moves, combo } = get()
        
        // Calculate time bonus
        const timeBonus = Math.max(0, 300 - timeElapsed) * 10
        const finalScore = score + timeBonus
        
        set({
          totalScore: get().totalScore + finalScore,
          currentLevel: currentLevel + 1,
          isGameActive: false
        })
        
        get().stopTimer()
        get().generateBoard()
        
        // Check for achievements
        if (currentLevel === 1) {
          get().unlockAchievement('firstWin')
        }
        
        if (combo >= 10) {
          get().unlockAchievement('comboMaster')
        }
        
        if (timeElapsed <= 60) {
          get().unlockAchievement('speedDemon')
        }
      },
      
      calculateFinalScore: () => {
        const { score, timeElapsed, moves, combo } = get()
        const timeBonus = Math.max(0, 300 - timeElapsed) * 10
        const moveBonus = Math.max(0, 50 - moves) * 20
        const comboBonus = combo * 100
        
        const finalScore = score + timeBonus + moveBonus + comboBonus
        set({ totalScore: get().totalScore + finalScore })
      },
      
      unlockAchievement: (achievementId) => {
        const { achievements } = get()
        if (achievements[achievementId] && !achievements[achievementId].unlocked) {
          set({
            achievements: {
              ...achievements,
              [achievementId]: {
                ...achievements[achievementId],
                unlocked: true,
                progress: achievements[achievementId].maxProgress
              }
            }
          })
        }
      },
      
      updateAchievements: () => {
        const { currentLevel, maxCombo, achievements } = get()
        
        // Update level master achievement
        if (currentLevel >= 25 && !achievements.levelMaster.unlocked) {
          get().unlockAchievement('levelMaster')
        }
        
        // Update perfect player achievement
        if (maxCombo >= 10 && !achievements.perfectPlayer.unlocked) {
          get().unlockAchievement('perfectPlayer')
        }
      },
      
      updateSettings: (newSettings) => {
        set({
          settings: { ...get().settings, ...newSettings }
        })
      },
      
      resetGame: () => {
        set({
          currentLevel: 1,
          score: 0,
          totalScore: 0,
          health: 3,
          moves: 0,
          timeElapsed: 0,
          combo: 0,
          maxCombo: 0,
          isGameActive: false,
          isPaused: false,
          selectedTiles: []
        })
        get().generateBoard()
      },
      
      addNotification: (notification) => {
        const { notifications } = get()
        const newNotification = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...notification
        }
        set({ notifications: [newNotification, ...notifications].slice(0, 10) })
      },
      
      clearNotifications: () => {
        set({ notifications: [] })
      }
    }),
    {
      name: 'make-it-12-game-storage',
      partialize: (state) => ({
        currentLevel: state.currentLevel,
        totalScore: state.totalScore,
        achievements: state.achievements,
        settings: state.settings,
        leaderboard: state.leaderboard
      })
    }
  )
)

export { useGameStore }

