# Make It 12 - Puzzle Challenge Game

A modern, engaging puzzle game where players must combine tiles to make combinations that equal exactly 12. Built with HTML5, CSS3, and vanilla JavaScript, featuring a beautiful warm color palette and comprehensive game mechanics.

## 🎮 Game Overview

**Make It 12** is a strategic puzzle game that challenges players to think mathematically while racing against time. Select tiles strategically to create combinations that sum to 12, chain combos for bonus points, and unlock achievements as you progress through increasingly challenging levels.

## ✨ Features

### Core Gameplay
- **Tile Selection**: Tap tiles to select them and create combinations
- **Smart Combinations**: Find tiles that add up to exactly 12
- **Combo System**: Chain successful combinations for multiplier bonuses
- **Progressive Difficulty**: Board size increases with each level
- **Time Management**: Race against the clock for time bonuses

### User Interface
- **Beautiful Design**: Warm beige and brown color palette for comfortable gameplay
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Engaging visual feedback for all interactions
- **Intuitive Controls**: Simple tap/click mechanics with visual cues

### Game Features
- **Achievement System**: Unlock badges for various accomplishments
- **Leaderboard**: Compete with other players for high scores
- **Progress Tracking**: Save game state and continue where you left off
- **Settings Customization**: Adjust audio, gameplay, and AI assist options

### Social Features
- **Achievement Sharing**: Share your accomplishments on social media
- **Score Sharing**: Challenge friends to beat your scores
- **Social Integration**: Connect with Instagram, Twitter, and Facebook

### AI Assist
- **Cursor AI Integration**: Toggle AI assistance for hints and guidance
- **Smart Hints**: Get help when you're stuck on a level
- **Adaptive Difficulty**: AI adjusts based on your skill level

## 🎨 Design System

### Color Palette
- **Royal Beige** (#D2B48C): Primary background
- **Warm Brown** (#8B5E3C): Primary buttons and highlights
- **Soft Beige** (#F5F5DC): Secondary backgrounds and modals
- **Deep Brown** (#5C4033): Headings and borders
- **Ivory White** (#FFFFF0): Text on dark backgrounds

### Typography
- **Headers**: Merriweather (serif) for titles and important text
- **Body**: Open Sans (sans-serif) for readable content
- **Buttons**: Open Sans semi-bold for clear call-to-actions

### Icons
- **Minimalist Style**: Clean, stroke-based iconography
- **Consistent Sizing**: 24x24px for actions, 32x32px for important elements
- **Warm Brown Strokes**: Consistent with the overall color scheme

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start playing immediately!

### Alternative: Live Server
If you have Node.js installed:
```bash
# Install live-server globally
npm install -g live-server

# Navigate to the project directory
cd make-it-12

# Start the development server
live-server
```

## 🎯 How to Play

### Basic Rules
1. **Select Tiles**: Click or tap tiles to select them
2. **Make 12**: Choose tiles that add up to exactly 12
3. **Clear Tiles**: When you make 12, tiles disappear and you score points
4. **Chain Combos**: Quick successive combinations earn bonus multipliers
5. **Beat the Clock**: Complete levels before time runs out

### Scoring System
- **Base Score**: 100 points per successful combination
- **Combo Bonus**: Multiplier increases with each consecutive combination
- **Time Bonus**: Extra points for completing levels quickly
- **Level Bonus**: Additional points for higher difficulty levels

### Progression
- **Level 1**: 4x4 grid, 60 seconds
- **Level 2+**: Grid size increases, more time available
- **Difficulty Scaling**: More complex combinations required
- **Unlockables**: Achievements and special tiles appear

## 🏆 Achievements

### Progress Achievements
- **First Steps**: Complete your first level
- **Perfect Score**: Achieve a high score on any level
- **Survivor**: Complete 5 levels without losing health

### Skill Achievements
- **Combo Master**: Achieve a 5x combo multiplier
- **Speed Demon**: Complete a level in under 30 seconds

## ⚙️ Settings & Customization

### Audio Settings
- Master volume control
- Sound effects volume
- Background music volume

### Gameplay Settings
- Animation speed adjustment
- Hint system toggle
- AI assist preferences

### Account Settings
- Username customization
- Email preferences
- Privacy controls

## 🔧 Technical Details

### Architecture
- **Vanilla JavaScript**: No external frameworks required
- **ES6+ Features**: Modern JavaScript with classes and modules
- **Local Storage**: Game progress saved locally
- **Responsive Design**: CSS Grid and Flexbox for layouts

### Browser Support
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

### Performance
- **Optimized Rendering**: Efficient DOM manipulation
- **Memory Management**: Proper cleanup of event listeners
- **Smooth Animations**: CSS transitions and keyframes
- **Mobile Optimized**: Touch-friendly interactions

## 🎮 Game Controls

### Desktop
- **Mouse Click**: Select/deselect tiles
- **Escape Key**: Close modals
- **H Key**: Request hint (during gameplay)

### Mobile
- **Touch**: Tap tiles to select
- **Swipe**: Navigate between screens
- **Pinch**: Zoom in/out (if implemented)

## 🚧 Future Enhancements

### Planned Features
- **Multiplayer Mode**: Real-time competitive gameplay
- **Custom Levels**: Level editor for creating puzzles
- **Sound Effects**: Immersive audio experience
- **Particle Effects**: Enhanced visual feedback
- **Daily Challenges**: New puzzles every day

### Technical Improvements
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Play without internet connection
- **Cloud Sync**: Save progress across devices
- **Analytics**: Track gameplay patterns and improvements

## 🤝 Contributing

We welcome contributions to improve Make It 12! Here are some ways you can help:

### Development
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Contribution
- **Bug Fixes**: Report and fix any issues you find
- **New Features**: Add exciting gameplay elements
- **UI/UX Improvements**: Enhance the visual design
- **Performance Optimization**: Make the game faster and smoother
- **Documentation**: Improve code comments and README

### Code Style
- Follow existing code formatting
- Add comments for complex logic
- Use meaningful variable names
- Test changes across different browsers

## 📱 Mobile Experience

### Responsive Design
- **Adaptive Layouts**: Automatically adjust to screen size
- **Touch Optimization**: Large touch targets for mobile users
- **Gesture Support**: Swipe and tap gestures
- **Performance**: Optimized for mobile devices

### Mobile Features
- **Fullscreen Mode**: Immersive mobile gaming
- **Touch Feedback**: Visual response to touch interactions
- **Orientation Support**: Works in portrait and landscape
- **Battery Optimization**: Efficient resource usage

## 🎨 Customization

### Themes
The game supports easy theming through CSS custom properties:

```css
:root {
    --royal-beige: #D2B48C;
    --warm-brown: #8B5E3C;
    --soft-beige: #F5F5DC;
    --deep-brown: #5C4033;
    --ivory-white: #FFFFF0;
}
```

### Modifying Colors
To change the game's appearance:
1. Edit the CSS variables in `styles.css`
2. Update the color values to your preference
3. Ensure sufficient contrast for accessibility

## 🐛 Troubleshooting

### Common Issues

**Game won't start**
- Check browser console for JavaScript errors
- Ensure all files are in the same directory
- Try refreshing the page

**Tiles not responding**
- Check if JavaScript is enabled
- Try clicking instead of tapping on mobile
- Clear browser cache and reload

**Performance issues**
- Close other browser tabs
- Update to latest browser version
- Check available system memory

### Browser Compatibility
If you experience issues:
- Update to the latest browser version
- Try a different browser
- Check browser console for error messages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Design Inspiration**: Modern puzzle game aesthetics
- **Color Palette**: Warm, comfortable gaming experience
- **Typography**: Google Fonts for beautiful text rendering
- **Icons**: Custom SVG icons for consistent design
- **Community**: Feedback and suggestions from players

## 📞 Support

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check this README for common solutions
- **Community**: Join discussions in the project repository

### Reporting Issues
When reporting problems, please include:
- Browser and version
- Operating system
- Steps to reproduce
- Screenshots if applicable
- Console error messages

---

**Enjoy playing Make It 12!** 🎉

*Challenge your mind, beat the clock, and become the ultimate puzzle master!*
