# Make It 12 - Puzzle Game 🎯

A captivating puzzle game where players combine tiles to reach the target sum of 12. Built with React, featuring beautiful animations, social features, and comprehensive achievements system.

## 🎮 Game Overview

**Make It 12** is an engaging puzzle game that challenges players to strategically select and combine tiles to reach exactly 12. Clear the board by making valid combinations and advance through increasingly challenging levels while building combos for higher scores.

## ✨ Features

### 🎯 Core Gameplay
- **Tile Combination Logic**: Select multiple tiles that sum to exactly 12
- **Progressive Difficulty**: 50+ levels with increasing complexity
- **Combo System**: Build multipliers for higher scores
- **Time Bonuses**: Complete levels quickly for extra points
- **Move Optimization**: Strategic thinking for efficient solutions

### 🏆 Achievement System
- **Multiple Categories**: Progress, Combo Master, Speed Demon, Level Master, Perfect Player
- **Progress Tracking**: Visual progress bars and unlock notifications
- **Social Sharing**: Share achievements on Instagram, Twitter, Facebook
- **Detailed Stats**: Comprehensive performance analytics

### 🌟 Social Features
- **Activity Feed**: Real-time updates from friends and guild members
- **Friend System**: Add friends, view their progress, and compete
- **Guild System**: Join guilds, participate in events, and chat
- **Leaderboards**: Global and friend-based rankings with sortable data

### ⚙️ Customization & Settings
- **Audio Controls**: Sound effects and background music toggles
- **Visual Themes**: Light and dark mode options
- **AI Assistant**: Cursor AI integration for helpful hints
- **Accessibility**: Font size adjustments and reduced motion options
- **Multi-language**: Support for 7 languages

### 📱 Modern UI/UX
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Beautiful Design**: Warm beige-brown color palette
- **Intuitive Controls**: Touch-friendly interface

## 🎨 Design System

### Color Palette
- **Royal Beige** (#D2B48C) - Primary background
- **Warm Brown** (#8B5E3C) - Primary buttons and highlights
- **Soft Beige** (#F5F5DC) - Secondary backgrounds and modals
- **Deep Brown** (#5C4033) - Headings and borders
- **Ivory White** (#FFFFF0) - Text on dark backgrounds

### Typography
- **Headers**: Merriweather (serif) - Bold, 36pt to 18pt
- **Body Text**: Open Sans (sans-serif) - Regular, 16pt
- **Buttons**: Open Sans (sans-serif) - Semi-bold, 14pt

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shreshth-Agarwal/Make-It-12.git
   cd Make-It-12
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Styling**: CSS with CSS Variables
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SplashScreen.jsx
│   ├── MainMenu.jsx
│   ├── Game.jsx
│   ├── GameBoard.jsx
│   ├── GameTile.jsx
│   ├── EndLevelModal.jsx
│   ├── Achievements.jsx
│   ├── Leaderboard.jsx
│   ├── Settings.jsx
│   ├── Social.jsx
│   └── Tutorial.jsx
├── stores/             # State management
│   └── gameStore.js
├── App.jsx             # Main application
├── main.jsx            # Entry point
├── index.css           # Global styles
└── App.css             # App-specific styles
```

## 🎮 How to Play

1. **Start the Game**: Click "Start Game" from the main menu
2. **Select Tiles**: Tap on tiles to select them (you can select multiple)
3. **Make 12**: Combine selected tiles to reach a sum of exactly 12
4. **Clear the Board**: Remove all tiles to complete the level
5. **Build Combos**: Make combinations quickly to build combo multipliers
6. **Advance**: Complete levels to unlock achievements and progress

## 🔧 Configuration

### Game Settings
- **Sound Effects**: Toggle game audio
- **Background Music**: Enable/disable ambient music
- **AI Assistant**: Cursor AI integration for hints
- **Animation Speed**: Adjust visual effects
- **Theme**: Light or dark mode

### Social Features
- **Profile Visibility**: Public, friends-only, or private
- **Progress Sharing**: Control what gets shared
- **Notifications**: Email and in-app notifications
- **Language**: Multi-language support

## 📱 Responsive Design

The game is fully responsive and optimized for:
- **Desktop**: Full feature set with enhanced controls
- **Tablet**: Touch-optimized interface
- **Mobile**: Streamlined mobile experience
- **Accessibility**: Screen reader support and keyboard navigation

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Deploy with zero configuration

### GitHub Pages
1. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
2. Run `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Team No 1** - Building the future of puzzle gaming

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Zustand** for state management
- **Vite** for fast development experience

## 📞 Support

For support, questions, or feedback:
- Create an issue on GitHub
- Contact: team.email@example.com

---

**Make It 12** - Where strategy meets fun! 🎯✨
