import React from 'react'
import { motion } from 'framer-motion'
import './GameTile.css'

const GameTile = ({ tile, isSelected, isMatched, onClick, rowIndex, colIndex }) => {
  const handleClick = () => {
    if (!isMatched) {
      onClick()
    }
  }

  const tileVariants = {
    initial: { 
      scale: 0, 
      rotate: 180,
      opacity: 0 
    },
    animate: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        delay: (rowIndex + colIndex) * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 200
      }
    },
    selected: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(139, 94, 60, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    matched: {
      scale: 0,
      rotate: 360,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }

  if (isMatched) {
    return null
  }

  return (
    <motion.div
      className={`game-tile ${isSelected ? 'selected' : ''}`}
      variants={tileVariants}
      initial="initial"
      animate={isSelected ? "selected" : "animate"}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      layout
    >
      <div className="tile-content">
        <span className="tile-value">{tile.value}</span>
      </div>
      
      {/* Selection Glow Effect */}
      {isSelected && (
        <motion.div
          className="selection-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Tile Border Glow */}
      <motion.div
        className="tile-border"
        animate={{
          borderColor: isSelected ? 'var(--deep-brown)' : 'var(--warm-brown)',
          boxShadow: isSelected 
            ? '0 0 15px rgba(92, 64, 51, 0.6), inset 0 0 15px rgba(92, 64, 51, 0.2)' 
            : 'none'
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

export default GameTile
