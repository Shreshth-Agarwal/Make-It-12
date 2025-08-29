// Make It 12 - Game Logic
class MakeIt12Game {
    constructor() {
        this.currentScreen = 'splash';
        this.gameMode = 'addition'; // 'addition' or 'math'
        this.gameState = {
            level: 1,
            score: 0,
            health: 3,
            combo: 1,
            timeLeft: 60,
            selectedTiles: [],
            board: [],
            gameTimer: null,
            soundEnabled: true,
            aiAssistEnabled: true,
            achievements: [],
            leaderboard: []
        };
        
        this.achievements = [
            { id: 'first_level', title: 'First Steps', description: 'Complete your first level', category: 'progress', unlocked: false, progress: 0, maxProgress: 1 },
            { id: 'combo_master', title: 'Combo Master', description: 'Achieve a 5x combo', category: 'combo', unlocked: false, progress: 0, maxProgress: 5 },
            { id: 'speed_demon', title: 'Speed Demon', description: 'Complete a level in under 30 seconds', category: 'speed', unlocked: false, progress: 0, maxProgress: 1 },
            { id: 'perfect_score', title: 'Perfect Score', description: 'Get a perfect score on any level', category: 'progress', unlocked: false, progress: 0, maxProgress: 1 },
            { id: 'survivor', title: 'Survivor', description: 'Complete 5 levels without losing health', category: 'progress', unlocked: false, progress: 0, maxProgress: 5 },
            { id: 'math_wizard', title: 'Math Wizard', description: 'Complete 3 levels in Math Operations mode', category: 'progress', unlocked: false, progress: 0, maxProgress: 3 },
            { id: 'multiplication_master', title: 'Multiplication Master', description: 'Use multiplication to make 12 in Math Operations mode', category: 'combo', unlocked: false, progress: 0, maxProgress: 1 },
            { id: 'division_expert', title: 'Division Expert', description: 'Use division to make 12 in Math Operations mode', category: 'combo', unlocked: false, progress: 0, maxProgress: 1 }
        ];
        
        this.leaderboard = [
            { rank: 1, player: 'Champion', score: 15000, level: 10 },
            { rank: 2, player: 'PuzzleMaster', score: 12500, level: 8 },
            { rank: 3, player: 'NumberNinja', score: 11000, level: 7 },
            { rank: 4, player: 'MathWizard', score: 9500, level: 6 },
            { rank: 5, player: 'Player1', score: 0, level: 1 }
        ];
        
        this.init();
    }
    
    init() {
        this.checkPlayerRegistration();
        this.bindEvents();
        this.showSplashScreen();
        this.loadGameData();
    }
    
    checkPlayerRegistration() {
        const storedPlayerData = localStorage.getItem('makeIt12PlayerData');
        if (!storedPlayerData) {
            // Redirect to registration page if no player data
            window.location.href = 'register.html';
            return;
        }
        
        try {
            this.playerData = JSON.parse(storedPlayerData);
            console.log('Player data loaded:', this.playerData);
        } catch (error) {
            console.error('Error parsing player data:', error);
            // Redirect to registration page if data is corrupted
            window.location.href = 'register.html';
        }
    }
    
    bindEvents() {
        // Main menu events
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('achievements').addEventListener('click', () => this.showAchievements());
        document.getElementById('leaderboard').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('settings').addEventListener('click', () => this.showSettings());
        document.getElementById('social').addEventListener('click', () => this.showSocial());
        document.getElementById('sound-toggle').addEventListener('click', () => this.toggleSound());
        
        // Game mode selection
        document.querySelectorAll('input[name="game-mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.gameMode = e.target.value;
                console.log('Game mode changed to:', this.gameMode);
            });
        });
        
        // Tutorial events
        document.getElementById('next-step').addEventListener('click', () => this.nextTutorialStep());
        document.getElementById('prev-step').addEventListener('click', () => this.prevTutorialStep());
        document.getElementById('skip-tutorial').addEventListener('click', () => this.skipTutorial());
        document.getElementById('close-tutorial').addEventListener('click', () => this.closeTutorial());
        
        // Game events
        document.getElementById('next-level').addEventListener('click', () => this.nextLevel());
        document.getElementById('replay-level').addEventListener('click', () => this.replayLevel());
        document.getElementById('share-achievement').addEventListener('click', () => this.showShareModal());
        
        // Share modal events
        document.getElementById('close-share').addEventListener('click', () => this.closeShareModal());
        document.querySelectorAll('.share-platform').forEach(button => {
            button.addEventListener('click', (e) => this.shareToPlatform(e.target.closest('.share-platform').classList[1]));
        });
        
        // Modal close events
        document.getElementById('close-achievements').addEventListener('click', () => this.closeModal('achievements-modal'));
        document.getElementById('close-leaderboard').addEventListener('click', () => this.closeModal('leaderboard-modal'));
        document.getElementById('close-settings').addEventListener('click', () => this.closeModal('settings-modal'));
        
        // Settings events
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Game over events
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
        document.getElementById('main-menu-return').addEventListener('click', () => this.showMainMenu());
        
        // Cursor AI toggle
        document.getElementById('cursor-ai-toggle').addEventListener('change', (e) => {
            this.gameState.aiAssistEnabled = e.target.checked;
        });
    }
    
    showSplashScreen() {
        this.currentScreen = 'splash';
        this.showScreen('splash-screen');
        
        // Simulate loading time
        setTimeout(() => {
            this.showMainMenu();
        }, 3000);
    }
    
    showMainMenu() {
        this.currentScreen = 'main';
        this.showScreen('main-menu');
        this.updateLeaderboard();
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    startGame() {
        if (this.gameState.level === 1) {
            this.showTutorial();
        } else {
            this.startLevel();
        }
    }
    
    showTutorial() {
        this.showModal('tutorial-modal');
        this.currentTutorialStep = 1;
        this.updateTutorialStep();
    }
    
    updateTutorialStep() {
        document.querySelectorAll('.tutorial-step').forEach(step => {
            step.classList.remove('active');
        });
        document.querySelector(`[data-step="${this.currentTutorialStep}"]`).classList.add('active');
        
        // Update button states
        document.getElementById('prev-step').disabled = this.currentTutorialStep === 1;
        document.getElementById('next-step').textContent = this.currentTutorialStep === 3 ? 'Start Game' : 'Next';
    }
    
    nextTutorialStep() {
        if (this.currentTutorialStep === 3) {
            this.closeTutorial();
            this.startLevel();
        } else {
            this.currentTutorialStep++;
            this.updateTutorialStep();
        }
    }
    
    prevTutorialStep() {
        if (this.currentTutorialStep > 1) {
            this.currentTutorialStep--;
            this.updateTutorialStep();
        }
    }
    
    skipTutorial() {
        this.closeTutorial();
        this.startLevel();
    }
    
    closeTutorial() {
        this.hideModal('tutorial-modal');
    }
    
    startLevel() {
        this.currentScreen = 'game';
        this.showScreen('game-screen');
        this.generateBoard();
        this.startTimer();
        this.updateHUD();
    }
    
    generateBoard() {
        const boardSize = Math.min(4 + Math.floor(this.gameState.level / 3), 8);
        const targetSum = 12;
        
        // Generate tiles based on game mode
        this.gameState.board = [];
        const tileValues = [];
        
        if (this.gameMode === 'addition') {
            // Addition mode: smaller numbers that can add to 12
            const combinations = this.generateValidCombinations(targetSum, boardSize * boardSize);
            tileValues.push(...combinations);
            
            // Fill remaining tiles with random values
            while (tileValues.length < boardSize * boardSize) {
                tileValues.push(Math.floor(Math.random() * 9) + 1);
            }
        } else {
            // Math operations mode: larger numbers and operations
            const combinations = this.generateMathCombinations(targetSum, boardSize * boardSize);
            tileValues.push(...combinations);
            
            // Fill remaining tiles with numbers that can work with operations
            while (tileValues.length < boardSize * boardSize) {
                // Generate numbers that can potentially make 12 with operations
                const num = Math.floor(Math.random() * 20) + 1;
                if (num !== 12) { // Avoid having 12 directly
                    tileValues.push(num);
                }
            }
        }
        
        // Shuffle tiles
        for (let i = tileValues.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tileValues[i], tileValues[j]] = [tileValues[j], tileValues[i]];
        }
        
        // Create board grid
        let tileIndex = 0;
        for (let row = 0; row < boardSize; row++) {
            this.gameState.board[row] = [];
            for (let col = 0; col < boardSize; col++) {
                this.gameState.board[row][col] = {
                    value: tileValues[tileIndex++],
                    row: row,
                    col: col,
                    element: null
                };
            }
        }
        
        this.renderBoard();
    }
    
    generateValidCombinations(targetSum, maxTiles) {
        const combinations = [];
        const maxValue = Math.min(9, targetSum);
        
        // Generate some simple combinations
        combinations.push(3, 4, 5); // 3+4+5 = 12
        combinations.push(6, 6); // 6+6 = 12
        combinations.push(7, 5); // 7+5 = 12
        combinations.push(8, 4); // 8+4 = 12
        combinations.push(9, 3); // 9+3 = 12
        
        return combinations;
    }
    
    generateMathCombinations(targetSum, maxTiles) {
        const combinations = [];
        const maxValue = Math.min(20, targetSum);
        
        // Generate some simple combinations
        combinations.push(10, 2); // 10 - 2 = 8
        combinations.push(15, 3); // 15 - 3 = 12
        combinations.push(20, 8); // 20 - 8 = 12
        combinations.push(18, 6); // 18 - 6 = 12
        combinations.push(12, 0); // 12 - 0 = 12 (edge case, might need adjustment)
        
        return combinations;
    }
    
    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        const boardSize = this.gameState.board.length;
        const grid = document.createElement('div');
        grid.className = 'board-grid';
        grid.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const tile = this.gameState.board[row][col];
                const tileElement = document.createElement('div');
                tileElement.className = 'game-tile';
                tileElement.textContent = tile.value;
                tileElement.dataset.row = row;
                tileElement.dataset.col = col;
                
                tileElement.addEventListener('click', () => this.selectTile(row, col));
                
                tile.element = tileElement;
                grid.appendChild(tileElement);
            }
        }
        
        gameBoard.appendChild(grid);
    }
    
    selectTile(row, col) {
        const tile = this.gameState.board[row][col];
        const tileElement = tile.element;
        
        if (tileElement.classList.contains('selected')) {
            // Deselect tile
            tileElement.classList.remove('selected');
            this.gameState.selectedTiles = this.gameState.selectedTiles.filter(t => t !== tile);
        } else {
            // Select tile
            tileElement.classList.add('selected');
            this.gameState.selectedTiles.push(tile);
        }
        
        this.checkCombination();
    }
    
    checkCombination() {
        if (this.gameState.selectedTiles.length === 0) return;
        
        let isValid = false;
        
        if (this.gameMode === 'addition') {
            // Addition mode: simple sum
            const sum = this.gameState.selectedTiles.reduce((total, tile) => total + tile.value, 0);
            isValid = sum === 12;
        } else {
            // Math operations mode: try different combinations
            isValid = this.checkMathCombination();
        }
        
        if (isValid) {
            this.clearTiles();
            this.updateScore();
            this.checkLevelComplete();
        } else if (this.gameMode === 'addition') {
            // Only reset selection in addition mode if sum exceeds 12
            const sum = this.gameState.selectedTiles.reduce((total, tile) => total + tile.value, 0);
            if (sum > 12) {
                this.resetSelection();
            }
        }
    }
    
    checkMathCombination() {
        const tiles = this.gameState.selectedTiles;
        if (tiles.length < 2) return false;
        
        // Try different mathematical operations
        const values = tiles.map(t => t.value);
        
        // Check if any combination of operations can make 12
        return this.canMake12WithOperations(values);
    }
    
    canMake12WithOperations(values) {
        if (values.length === 2) {
            const [a, b] = values;
            // Check basic operations
            if (a + b === 12) return true;
            if (a - b === 12) return true;
            if (b - a === 12) return true;
            if (a * b === 12) return true;
            if (a / b === 12) return true;
            if (b / a === 12) return true;
        } else if (values.length === 3) {
            const [a, b, c] = values;
            // Check combinations of operations
            if (a + b + c === 12) return true;
            if (a + b - c === 12) return true;
            if (a - b + c === 12) return true;
            if (a - b - c === 12) return true;
            if (a * b + c === 12) return true;
            if (a * b - c === 12) return true;
            if (a + b * c === 12) return true;
            if (a - b * c === 12) return true;
            if (a * b * c === 12) return true;
            if (a * b / c === 12) return true;
            if (a / b * c === 12) return true;
            if (a / b / c === 12) return true;
        }
        
        return false;
    }
    
    clearTiles() {
        // Animate tile clearing
        this.gameState.selectedTiles.forEach(tile => {
            tile.element.classList.add('clearing');
        });
        
        setTimeout(() => {
            // Remove cleared tiles
            this.gameState.selectedTiles.forEach(tile => {
                tile.element.remove();
                this.gameState.board[tile.row][tile.col] = null;
            });
            
            this.gameState.selectedTiles = [];
            this.collapseBoard();
            this.fillEmptySpaces();
            this.renderBoard();
        }, 500);
    }
    
    collapseBoard() {
        // Move tiles down to fill empty spaces
        for (let col = 0; col < this.gameState.board[0].length; col++) {
            let writeRow = this.gameState.board.length - 1;
            for (let row = this.gameState.board.length - 1; row >= 0; row--) {
                if (this.gameState.board[row][col] !== null) {
                    if (writeRow !== row) {
                        this.gameState.board[writeRow][col] = this.gameState.board[row][col];
                        this.gameState.board[row][col] = null;
                    }
                    writeRow--;
                }
            }
        }
    }
    
    fillEmptySpaces() {
        // Fill empty spaces with new tiles
        for (let row = 0; row < this.gameState.board.length; row++) {
            for (let col = 0; col < this.gameState.board[row].length; col++) {
                if (this.gameState.board[row][col] === null) {
                    this.gameState.board[row][col] = {
                        value: Math.floor(Math.random() * 9) + 1,
                        row: row,
                        col: col,
                        element: null
                    };
                }
            }
        }
    }
    
    resetSelection() {
        this.gameState.selectedTiles.forEach(tile => {
            tile.element.classList.remove('selected');
        });
        this.gameState.selectedTiles = [];
    }
    
    updateScore() {
        const baseScore = 100;
        const comboBonus = this.gameState.combo * 50;
        const timeBonus = Math.floor(this.gameState.timeLeft / 10) * 10;
        
        const levelScore = baseScore + comboBonus + timeBonus;
        this.gameState.score += levelScore;
        
        // Increase combo
        this.gameState.combo++;
        
        this.updateHUD();
        this.playSound('tile-clear');
    }
    
    checkLevelComplete() {
        // Check if board is empty or no more combinations are possible
        if (this.isBoardEmpty() || !this.hasValidCombinations()) {
            this.completeLevel();
        }
    }
    
    isBoardEmpty() {
        return this.gameState.board.every(row => row.every(cell => cell === null));
    }
    
    hasValidCombinations() {
        // Simple check - could be enhanced with more sophisticated algorithms
        const values = [];
        this.gameState.board.forEach(row => {
            row.forEach(cell => {
                if (cell !== null) values.push(cell.value);
            });
        });
        
        // Check if any combination of values can sum to 12
        return this.canMakeSum(values, 12);
    }
    
    canMakeSum(values, target) {
        // Simple recursive check for combinations
        if (target === 0) return true;
        if (target < 0 || values.length === 0) return false;
        
        for (let i = 0; i < values.length; i++) {
            if (this.canMakeSum(values.slice(i + 1), target - values[i])) {
                return true;
            }
        }
        return false;
    }
    
    completeLevel() {
        clearInterval(this.gameState.gameTimer);
        
        // Calculate final score
        const timeBonus = this.gameState.timeLeft * 2;
        const comboBonus = this.gameState.combo * 100;
        const finalScore = this.gameState.score + timeBonus + comboBonus;
        
        // Update display
        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('time-bonus').textContent = timeBonus;
        document.getElementById('combo-bonus').textContent = comboBonus;
        
        // Show end level modal
        this.showModal('end-level-modal');
        
        // Update achievements
        this.checkAchievements();
        
        // Update leaderboard
        this.updateLeaderboard();
    }
    
    nextLevel() {
        this.gameState.level++;
        this.gameState.combo = 1;
        this.gameState.timeLeft = 60 + (this.gameState.level * 5);
        this.hideModal('end-level-modal');
        this.startLevel();
    }
    
    replayLevel() {
        this.gameState.combo = 1;
        this.gameState.timeLeft = 60 + (this.gameState.level * 5);
        this.hideModal('end-level-modal');
        this.startLevel();
    }
    
    startTimer() {
        this.gameState.gameTimer = setInterval(() => {
            this.gameState.timeLeft--;
            this.updateHUD();
            
            if (this.gameState.timeLeft <= 0) {
                this.gameOver();
            }
        }, 1000);
    }
    
    updateHUD() {
        document.getElementById('health-value').textContent = this.gameState.health;
        document.getElementById('current-level').textContent = `Level ${this.gameState.level}`;
        document.getElementById('time-left').textContent = this.gameState.timeLeft;
        document.getElementById('combo-text').textContent = `Combo x${this.gameState.combo}`;
        document.getElementById('score-text').textContent = `Score: ${this.gameState.score}`;
        
        // Update game mode indicator
        const modeIndicator = document.getElementById('game-mode-indicator');
        const modeBadge = modeIndicator.querySelector('.mode-badge');
        modeBadge.textContent = this.gameMode === 'addition' ? '+' : '±×÷';
        modeBadge.className = `mode-badge ${this.gameMode}`;
    }
    
    gameOver() {
        clearInterval(this.gameState.gameTimer);
        
        // Update game over modal
        document.getElementById('game-over-score').textContent = this.gameState.score;
        document.getElementById('game-over-level').textContent = this.gameState.level;
        
        this.showModal('game-over-modal');
    }
    
    restartGame() {
        this.gameState = {
            level: 1,
            score: 0,
            health: 3,
            combo: 1,
            timeLeft: 60,
            selectedTiles: [],
            board: [],
            gameTimer: null,
            soundEnabled: this.gameState.soundEnabled,
            aiAssistEnabled: this.gameState.aiAssistEnabled,
            achievements: this.gameState.achievements,
            leaderboard: this.gameState.leaderboard
        };
        
        this.hideModal('game-over-modal');
        this.startLevel();
    }
    
    showAchievements() {
        this.renderAchievements();
        this.showModal('achievements-modal');
    }
    
    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const item = document.createElement('div');
            item.className = 'achievement-item';
            
            const progress = (achievement.progress / achievement.maxProgress) * 100;
            const isUnlocked = achievement.unlocked || achievement.progress >= achievement.maxProgress;
            
            item.innerHTML = `
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-progress">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <span>${achievement.progress}/${achievement.maxProgress}</span>
            `;
            
            if (isUnlocked) {
                item.style.borderColor = '#4CAF50';
                item.style.backgroundColor = '#E8F5E8';
            }
            
            grid.appendChild(item);
        });
    }
    
    showLeaderboard() {
        this.renderLeaderboard();
        this.showModal('leaderboard-modal');
    }
    
    renderLeaderboard() {
        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        
        this.leaderboard.forEach(entry => {
            const row = document.createElement('tr');
            if (entry.player === 'Player1') {
                row.classList.add('current-player');
            }
            
            row.innerHTML = `
                <td>${entry.rank}</td>
                <td>${entry.player}</td>
                <td>${entry.score.toLocaleString()}</td>
                <td>${entry.level}</td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    updateLeaderboard() {
        // Update current player's score
        const currentPlayer = this.leaderboard.find(entry => entry.player === 'Player1');
        if (currentPlayer) {
            currentPlayer.score = this.gameState.score;
            currentPlayer.level = this.gameState.level;
        }
        
        // Sort leaderboard
        this.leaderboard.sort((a, b) => b.score - a.score);
        
        // Update ranks
        this.leaderboard.forEach((entry, index) => {
            entry.rank = index + 1;
        });
    }
    
    showSettings() {
        this.showModal('settings-modal');
    }
    
    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Add active class to clicked tab button
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }
    
    showSocial() {
        // For now, just show a simple alert
        alert('Social features coming soon!');
    }
    
    toggleSound() {
        this.gameState.soundEnabled = !this.gameState.soundEnabled;
        const button = document.getElementById('sound-toggle');
        
        if (this.gameState.soundEnabled) {
            button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>`;
        } else {
            button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>`;
        }
    }
    
    showShareModal() {
        // Update share modal with current game data
        document.getElementById('share-score').textContent = this.gameState.score;
        document.getElementById('share-time').textContent = `${60 - this.gameState.timeLeft}s`;
        
        this.hideModal('end-level-modal');
        this.showModal('share-modal');
    }
    
    closeShareModal() {
        this.hideModal('share-modal');
        this.showModal('end-level-modal');
    }
    
    shareToPlatform(platform) {
        const message = document.getElementById('share-message').value;
        const score = this.gameState.score;
        const level = this.gameState.level;
        
        let shareUrl = '';
        let shareText = message || `I just completed Level ${level} in Make It 12 with a score of ${score}! Can you beat my score?`;
        
        switch (platform) {
            case 'instagram':
                // Instagram sharing would require their API
                alert('Instagram sharing coming soon!');
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                window.open(shareUrl, '_blank');
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                window.open(shareUrl, '_blank');
                break;
            case 'copy-link':
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                });
                break;
        }
    }
    
    checkAchievements() {
        // Check for level completion achievements
        if (this.gameState.level === 1) {
            this.unlockAchievement('first_level');
        }
        
        // Check for combo achievements
        if (this.gameState.combo >= 5) {
            this.unlockAchievement('combo_master');
        }
        
        // Check for speed achievements
        if (this.gameState.timeLeft >= 30) {
            this.unlockAchievement('speed_demon');
        }
        
        // Check for perfect score (could be enhanced)
        if (this.gameState.score >= 1000) {
            this.unlockAchievement('perfect_score');
        }
        
        // Check for math operations achievements
        if (this.gameMode === 'math') {
            this.checkMathAchievements();
        }
    }
    
    checkMathAchievements() {
        // Track math wizard achievement
        const mathWizard = this.achievements.find(a => a.id === 'math_wizard');
        if (mathWizard && !mathWizard.unlocked) {
            mathWizard.progress = Math.min(mathWizard.progress + 1, mathWizard.maxProgress);
            if (mathWizard.progress >= mathWizard.maxProgress) {
                this.unlockAchievement('math_wizard');
            }
        }
        
        // Check for multiplication and division usage
        if (this.gameState.selectedTiles.length >= 2) {
            const values = this.gameState.selectedTiles.map(t => t.value);
            const [a, b] = values;
            
            // Check multiplication
            if (a * b === 12) {
                this.unlockAchievement('multiplication_master');
            }
            
            // Check division
            if ((a / b === 12) || (b / a === 12)) {
                this.unlockAchievement('division_expert');
            }
        }
    }
    
    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.progress = achievement.maxProgress;
            
            // Show achievement notification
            this.showAchievementNotification(achievement.title);
            
            // Save game data
            this.saveGameData();
        }
    }
    
    showAchievementNotification(title) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--warm-brown);
            color: var(--ivory-white);
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px var(--shadow);
            z-index: 2000;
            animation: slideIn 0.5s ease-out;
        `;
        notification.textContent = `Achievement Unlocked: ${title}!`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    playSound(soundName) {
        if (!this.gameState.soundEnabled) return;
        
        // Simple sound implementation - could be enhanced with actual audio files
        console.log(`Playing sound: ${soundName}`);
    }
    
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }
    
    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }
    
    closeModal(modalId) {
        this.hideModal(modalId);
    }
    
    loadGameData() {
        const savedData = localStorage.getItem('makeIt12GameData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.gameState = { ...this.gameState, ...data };
                this.achievements = data.achievements || this.achievements;
                this.leaderboard = data.leaderboard || this.leaderboard;
            } catch (e) {
                console.error('Error loading game data:', e);
            }
        }
    }
    
    saveGameData() {
        const gameData = {
            level: this.gameState.level,
            score: this.gameState.score,
            health: this.gameState.health,
            achievements: this.achievements,
            leaderboard: this.leaderboard,
            soundEnabled: this.gameState.soundEnabled,
            aiAssistEnabled: this.gameState.aiAssistEnabled
        };
        
        try {
            localStorage.setItem('makeIt12GameData', JSON.stringify(gameData));
        } catch (e) {
            console.error('Error saving game data:', e);
        }
    }
    
    // AI Assist functionality
    provideHint() {
        if (!this.gameState.aiAssistEnabled) return;
        
        // Find a valid combination
        const hint = this.findHint();
        if (hint) {
            this.showHint(hint);
        }
    }
    
    findHint() {
        // Simple hint algorithm - find tiles that sum to 12
        const allTiles = [];
        this.gameState.board.forEach(row => {
            row.forEach(cell => {
                if (cell !== null) allTiles.push(cell);
            });
        });
        
        // Look for simple combinations
        for (let i = 0; i < allTiles.length; i++) {
            for (let j = i + 1; j < allTiles.length; j++) {
                if (allTiles[i].value + allTiles[j].value === 12) {
                    return [allTiles[i], allTiles[j]];
                }
            }
        }
        
        // Look for triple combinations
        for (let i = 0; i < allTiles.length; i++) {
            for (let j = i + 1; j < allTiles.length; j++) {
                for (let k = j + 1; k < allTiles.length; k++) {
                    if (allTiles[i].value + allTiles[j].value + allTiles[k].value === 12) {
                        return [allTiles[i], allTiles[j], allTiles[k]];
                    }
                }
            }
        }
        
        return null;
    }
    
    showHint(hintTiles) {
        // Highlight hint tiles briefly
        hintTiles.forEach(tile => {
            tile.element.style.boxShadow = '0 0 30px #FFD700';
        });
        
        setTimeout(() => {
            hintTiles.forEach(tile => {
                tile.element.style.boxShadow = '';
            });
        }, 2000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MakeIt12Game();
});

// Add some additional utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--warm-brown);
        color: var(--ivory-white);
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px var(--shadow);
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal:not(.hidden)');
        if (openModals.length > 0) {
            openModals.forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    }
    
    if (e.key === 'h' && window.game && window.game.currentScreen === 'game') {
        // Provide hint
        window.game.provideHint();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    // Prevent double-tap zoom on mobile
    if (e.target.classList.contains('game-tile')) {
        e.preventDefault();
    }
}, { passive: false });

// Add window resize handling
window.addEventListener('resize', () => {
    // Recalculate board layout if needed
    if (window.game && window.game.currentScreen === 'game') {
        // Could add responsive layout adjustments here
    }
});

// Add beforeunload event to save game data
window.addEventListener('beforeunload', () => {
    if (window.game) {
        window.game.saveGameData();
    }
});
