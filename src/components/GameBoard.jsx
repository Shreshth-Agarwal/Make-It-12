import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../stores/gameStore'
import GameTile from './GameTile'
import './GameBoard.css'

const GameBoard = ({ onLevelComplete }) => {
  const {
    board,
    selectedTiles,
    targetSum,
    selectTile,
    moves,
    isGameActive,
    isPaused
  } = useGameStore()

  useEffect(() => {
    // Check if level is complete
    if (board.length > 0) {
      const remainingTiles = board.flat().filter(tile => !tile.isMatched)
      if (remainingTiles.length === 0) {
        onLevelComplete()
      }
    }
  }, [board, onLevelComplete])

  const handleTileClick = (tileId) => {
    if (!isGameActive || isPaused) return
    selectTile(tileId)
  }

  const getSelectedSum = () => {
    return selectedTiles.reduce((sum, tile) => sum + tile.value, 0)
  }

  const isSelectionValid = () => {
    const sum = getSelectedSum()
    return sum === targetSum
  }

  if (!board || board.length === 0) {
    return (
      <div className="game-board-loading">
        <div className="spinner"></div>
        <p>Loading game board...</p>
      </div>
    )
  }

  return (
    <div className="game-board">
      {/* Target Display */}
      <motion.div 
        className="target-display"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="target-label">Target:</div>
        <div className="target-value">{targetSum}</div>
      </motion.div>

      {/* Game Grid */}
      <div className="game-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((tile) => (
              <GameTile
                key={tile.id}
                tile={tile}
                isSelected={selectedTiles.some(t => t.id === tile.id)}
                isMatched={tile.isMatched}
                onClick={() => handleTileClick(tile.id)}
                rowIndex={rowIndex}
                colIndex={tile.col}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Selection Feedback */}
      <AnimatePresence>
        {selectedTiles.length > 0 && (
          <motion.div
            className="selection-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="selected-sum">
              Selected: {getSelectedSum()}
            </div>
            
            {isSelectionValid() && (
              <motion.div
                className="valid-combination"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="valid-text">Perfect! Tap to clear</span>
              </motion.div>
            )}
            
            {getSelectedSum() > targetSum && (
              <div className="invalid-combination">
                <span className="invalid-text">Too high!</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moves Counter */}
      <div className="moves-counter">
        <span className="moves-label">Moves:</span>
        <span className="moves-value">{moves}</span>
      </div>

      {/* Game Instructions */}
      <div className="game-instructions">
        <p>Select tiles that sum to {targetSum}</p>
        <p>Clear all tiles to complete the level</p>
      </div>
    </div>
  )
}

export default GameBoard
