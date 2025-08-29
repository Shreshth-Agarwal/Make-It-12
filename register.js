// Registration Page Logic
class RegistrationManager {
    constructor() {
        this.form = document.getElementById('registration-form');
        this.playerNameInput = document.getElementById('player-name');
        this.phoneInput = document.getElementById('phone-number');
        this.startBtn = document.getElementById('start-btn');
        this.errorMessage = document.getElementById('error-message');
        this.successMessage = document.getElementById('success-message');
        this.topPlayersContainer = document.getElementById('top-players');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadLeaderboard();
        this.checkForExistingPlayer();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
        this.playerNameInput.addEventListener('input', () => this.clearMessages());
        this.phoneInput.addEventListener('input', () => this.clearMessages());
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const playerName = this.playerNameInput.value.trim();
        const phoneNumber = this.phoneInput.value.trim();
        
        // Validation
        if (!this.validateForm(playerName, phoneNumber)) {
            return;
        }
        
        try {
            this.setLoading(true);
            
            // Check if player already exists
            let existingPlayer = await window.airtableManager.getPlayerByPhone(phoneNumber);
            
            if (existingPlayer) {
                // Player exists, update their info if name changed
                if (existingPlayer.fields.Name !== playerName) {
                    await this.updatePlayerName(existingPlayer.id, playerName);
                    existingPlayer.fields.Name = playerName;
                }
                
                // Store player data and redirect to game
                this.storePlayerData(existingPlayer);
                this.showSuccessMessage('Welcome back! Redirecting to game...');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } else {
                // Create new player
                const newPlayer = await window.airtableManager.createPlayer({
                    name: playerName,
                    phone: phoneNumber
                });
                
                // Store player data and redirect to game
                this.storePlayerData(newPlayer);
                this.showSuccessMessage('Player created successfully! Redirecting to game...');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
            
        } catch (error) {
            console.error('Registration error:', error);
            this.showErrorMessage('Registration failed. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    validateForm(playerName, phoneNumber) {
        // Clear previous messages
        this.clearMessages();
        
        // Name validation
        if (playerName.length < 2) {
            this.showErrorMessage('Name must be at least 2 characters long.');
            return false;
        }
        
        if (playerName.length > 50) {
            this.showErrorMessage('Name must be less than 50 characters.');
            return false;
        }
        
        // Phone validation
        if (phoneNumber.length < 10) {
            this.showErrorMessage('Please enter a valid phone number.');
            return false;
        }
        
        // Basic phone format validation
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneNumber)) {
            this.showErrorMessage('Please enter a valid phone number format.');
            return false;
        }
        
        return true;
    }
    
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        
        e.target.value = value;
    }
    
    async updatePlayerName(recordId, newName) {
        try {
            const response = await fetch(window.airtableManager.API_URL + '/' + recordId, {
                method: 'PATCH',
                headers: window.airtableManager.headers,
                body: JSON.stringify({
                    fields: {
                        'Name': newName
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update player name');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating player name:', error);
            throw error;
        }
    }
    
    storePlayerData(playerRecord) {
        const playerData = {
            id: playerRecord.id,
            name: playerRecord.fields.Name,
            phone: playerRecord.fields.Phone,
            highScore: playerRecord.fields.HighScore || 0,
            currentLevel: playerRecord.fields.CurrentLevel || 1,
            gamesPlayed: playerRecord.fields.GamesPlayed || 0,
            totalScore: playerRecord.fields.TotalScore || 0,
            bestCombo: playerRecord.fields.BestCombo || 0,
            lastPlayed: playerRecord.fields.LastPlayed,
            gameMode: playerRecord.fields.GameMode || 'addition'
        };
        
        localStorage.setItem('makeIt12PlayerData', JSON.stringify(playerData));
    }
    
    async loadLeaderboard() {
        try {
            const leaderboard = await window.airtableManager.getLeaderboard(5);
            this.displayLeaderboard(leaderboard);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            this.showLeaderboardError();
        }
    }
    
    displayLeaderboard(leaderboard) {
        if (!leaderboard || leaderboard.length === 0) {
            this.topPlayersContainer.innerHTML = '<p style="color: var(--warm-brown);">No players yet. Be the first!</p>';
            return;
        }
        
        this.topPlayersContainer.innerHTML = leaderboard.map(player => `
            <div class="player-rank">
                <div class="rank-number">#${player.rank}</div>
                <div class="player-info">
                    <div class="player-name">${this.escapeHtml(player.name)}</div>
                    <div class="player-score">Score: ${player.highScore.toLocaleString()} | Level: ${player.currentLevel}</div>
                </div>
            </div>
        `).join('');
    }
    
    showLeaderboardError() {
        this.topPlayersContainer.innerHTML = '<p style="color: var(--warm-brown);">Unable to load leaderboard</p>';
    }
    
    async checkForExistingPlayer() {
        const storedData = localStorage.getItem('makeIt12PlayerData');
        if (storedData) {
            try {
                const playerData = JSON.parse(storedData);
                const existingPlayer = await window.airtableManager.getPlayerByPhone(playerData.phone);
                
                if (existingPlayer) {
                    // Auto-fill form with existing data
                    this.playerNameInput.value = existingPlayer.fields.Name;
                    this.phoneInput.value = existingPlayer.fields.Phone;
                    this.showSuccessMessage('Welcome back! Your details are pre-filled.');
                }
            } catch (error) {
                console.error('Error checking existing player:', error);
            }
        }
    }
    
    setLoading(loading) {
        if (loading) {
            this.startBtn.disabled = true;
            this.startBtn.textContent = 'Processing...';
            this.startBtn.classList.add('loading');
        } else {
            this.startBtn.disabled = false;
            this.startBtn.textContent = 'Start Game';
            this.startBtn.classList.remove('loading');
        }
    }
    
    showErrorMessage(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.successMessage.style.display = 'none';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }
    
    showSuccessMessage(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
        this.errorMessage.style.display = 'none';
    }
    
    clearMessages() {
        this.errorMessage.style.display = 'none';
        this.successMessage.style.display = 'none';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize registration manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationManager();
});

// Add some utility functions
function validatePhoneNumber(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function formatPhoneNumber(phone) {
    let value = phone.replace(/\D/g, '');
    
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    
    return value;
}
