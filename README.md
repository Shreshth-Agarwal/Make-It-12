# Make It 12 - Puzzle Challenge Game

A modern, engaging puzzle game where players must combine tiles to make combinations that equal exactly 12. Built with HTML5, CSS3, and vanilla JavaScript, featuring a beautiful warm color palette, comprehensive game mechanics, and integrated player registration and ranking system.

## 🎮 Game Overview

**Make It 12** is a strategic puzzle game that challenges players to think mathematically while racing against time. Players register with their name and phone number, then compete on a global leaderboard. Select tiles strategically to create combinations that sum to 12, chain combos for bonus points, and unlock achievements as you progress through increasingly challenging levels.

## ✨ New Features

### 🔐 Player Registration System
- **Registration Page**: Players enter name and phone number before playing
- **Data Validation**: Form validation ensures proper data entry
- **Returning Players**: Automatic recognition of existing players
- **Top Players Preview**: Shows current leaderboard on registration page

### 🏆 Airtable Integration & Rankings
- **Cloud Storage**: Player data stored securely in Airtable
- **Real-time Leaderboard**: Live rankings based on high scores
- **Player Statistics**: Track games played, total score, best combo
- **Persistent Data**: Game progress saved across sessions

### 🎯 Dual Game Modes
- **Addition Mode**: Classic tile addition (5+3+4=12)
- **Math Operations Mode**: Use +, -, ×, ÷ operations (6×2=12, 24÷2=12, 15-3=12)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Airtable account and base setup (for leaderboard functionality)

### Airtable Setup
1. Create a new Airtable base
2. Create a table named "Players" with these fields:
   - `Name` (Single line text)
   - `Phone` (Phone number)
   - `HighScore` (Number)
   - `CurrentLevel` (Number)
   - `GamesPlayed` (Number)
   - `TotalScore` (Number)
   - `BestCombo` (Number)
   - `LastPlayed` (Date)
   - `GameMode` (Single select: addition, math)

3. Update `airtable-integration.js`:
   - Replace `appYourBaseID` with your actual Airtable base ID
   - The API token is already configured

### Installation
1. Clone or download this repository
2. Set up your Airtable base as described above
3. Update the base ID in `airtable-integration.js`
4. Open `register.html` in your web browser to start
5. Register as a new player and start playing!

## 🎯 How to Play

### Registration Flow
1. **Enter Details**: Provide your name and phone number
2. **View Leaderboard**: See current top players
3. **Start Playing**: Click "Start Game" to begin

### Game Modes
1. **Addition Only**: Select tiles that add up to exactly 12
2. **Math Operations**: Use any mathematical operation to make 12
   - Examples: 6×2=12, 24÷2=12, 15-3=12, 8+4=12

### Scoring & Ranking
- **Base Score**: 100 points per successful combination
- **Combo Multiplier**: Chain combinations for bonus points
- **Time Bonus**: Complete levels quickly for extra points
- **Global Ranking**: Compete against all players worldwide

## 🏆 Achievements System

### Progress Achievements
- **First Steps**: Complete your first level
- **Perfect Score**: Achieve a high score on any level
- **Survivor**: Complete 5 levels without losing health
- **Math Wizard**: Complete 3 levels in Math Operations mode

### Skill Achievements
- **Combo Master**: Achieve a 5x combo multiplier
- **Speed Demon**: Complete a level in under 30 seconds
- **Multiplication Master**: Use multiplication in Math Operations mode
- **Division Expert**: Use division in Math Operations mode

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

## 📱 File Structure

```
Make-It-12/
├── register.html          # Player registration page (entry point)
├── index.html            # Main game interface
├── styles.css            # Complete styling
├── game.js              # Game logic and mechanics
├── register.js          # Registration page logic
├── airtable-integration.js # Airtable API integration
├── package.json         # Project configuration
└── README.md           # Documentation
```

## 🔧 Technical Features

### Registration System
- **Form Validation**: Client-side validation for name and phone
- **Phone Formatting**: Automatic phone number formatting
- **Duplicate Detection**: Checks for existing players
- **Data Persistence**: Local storage backup

### Airtable Integration
- **CRUD Operations**: Create, read, update player records
- **Leaderboard Queries**: Sorted by high score and level
- **Error Handling**: Graceful fallbacks for API issues
- **Data Synchronization**: Real-time updates

### Game Mechanics
- **Dual Modes**: Addition and mathematical operations
- **Smart Board Generation**: Ensures solvable puzzles
- **Combo System**: Multiplier bonuses for consecutive plays
- **Achievement Tracking**: Progress monitoring and unlocks

## 🌐 Deployment

### GitHub Pages Setup
1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → main branch
4. Your game will be available at: `https://yourusername.github.io/repository-name/register.html`

### Custom Domain (Optional)
1. Add a `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## 🔐 Security & Privacy

### Data Protection
- **Minimal Data**: Only name and phone number collected
- **Secure Storage**: Data encrypted in Airtable
- **No Sensitive Info**: No passwords or personal details
- **User Control**: Players can request data deletion

### API Security
- **Token Protection**: Airtable API token secured
- **Rate Limiting**: Built-in Airtable rate limits
- **Error Handling**: No sensitive data exposed in errors

## 🚧 Future Enhancements

### Planned Features
- **Social Login**: Google/Facebook authentication
- **Real-time Multiplayer**: Live competitive gameplay
- **Tournament Mode**: Organized competitions
- **Mobile App**: Native iOS/Android versions
- **Advanced Analytics**: Detailed player statistics

### Technical Improvements
- **Offline Mode**: Play without internet connection
- **Push Notifications**: Achievement and challenge alerts
- **Data Export**: Player statistics download
- **Admin Dashboard**: Player management interface

## 🤝 Contributing

We welcome contributions! Areas for improvement:
- **UI/UX Enhancements**: Better visual design
- **New Game Modes**: Additional puzzle variations
- **Performance**: Optimization and speed improvements
- **Accessibility**: Better support for all users
- **Testing**: Automated test coverage

## 📞 Support

### Setup Help
- Check Airtable base configuration
- Verify API token and base ID
- Ensure proper field names and types
- Test with browser developer tools

### Common Issues
- **Registration fails**: Check Airtable connectivity
- **Leaderboard empty**: Verify API permissions
- **Data not saving**: Check browser local storage

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Start your puzzle journey!** 🎉

*Register now, compete globally, and become the ultimate Make It 12 champion!*

## 🔗 Quick Links

- **Play Now**: Open `register.html` to start
- **Leaderboard**: Compete against players worldwide
- **Achievements**: Unlock badges and rewards
- **Game Modes**: Choose your challenge level
