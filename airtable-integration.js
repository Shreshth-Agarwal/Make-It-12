// Airtable Integration for Make It 12 Game
class AirtableManager {
    constructor() {
        this.API_KEY = 'pat4Dwzr2oKA4bvHr.e842979a3f30aeb579e31439d8c368b66bda65072203bef4a15108f12dfe054f';
        this.BASE_ID = 'appYourBaseID'; // You'll need to replace this with your actual base ID
        this.TABLE_NAME = 'Players';
        this.API_URL = `https://api.airtable.com/v0/${this.BASE_ID}/${this.TABLE_NAME}`;
        
        this.headers = {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json'
        };
    }
    
    // Create a new player record
    async createPlayer(playerData) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    records: [{
                        fields: {
                            'Name': playerData.name,
                            'Phone': playerData.phone,
                            'HighScore': 0,
                            'CurrentLevel': 1,
                            'GamesPlayed': 0,
                            'TotalScore': 0,
                            'BestCombo': 0,
                            'LastPlayed': new Date().toISOString(),
                            'GameMode': 'addition'
                        }
                    }]
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.records[0];
        } catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    }
    
    // Get player by phone number
    async getPlayerByPhone(phone) {
        try {
            const filterFormula = `{Phone} = '${phone}'`;
            const response = await fetch(`${this.API_URL}?filterByFormula=${encodeURIComponent(filterFormula)}`, {
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.records.length > 0 ? result.records[0] : null;
        } catch (error) {
            console.error('Error getting player:', error);
            throw error;
        }
    }
    
    // Update player score and stats
    async updatePlayerScore(recordId, gameData) {
        try {
            const response = await fetch(`${this.API_URL}/${recordId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    fields: {
                        'HighScore': Math.max(gameData.score, gameData.highScore || 0),
                        'CurrentLevel': gameData.level,
                        'GamesPlayed': (gameData.gamesPlayed || 0) + 1,
                        'TotalScore': (gameData.totalScore || 0) + gameData.score,
                        'BestCombo': Math.max(gameData.combo, gameData.bestCombo || 0),
                        'LastPlayed': new Date().toISOString(),
                        'GameMode': gameData.gameMode
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error updating player score:', error);
            throw error;
        }
    }
    
    // Get top players leaderboard
    async getLeaderboard(limit = 10) {
        try {
            const sortParams = [
                { field: 'HighScore', direction: 'desc' },
                { field: 'CurrentLevel', direction: 'desc' }
            ];
            
            const sortString = sortParams.map(param => 
                `sort[0][field]=${param.field}&sort[0][direction]=${param.direction}`
            ).join('&');
            
            const response = await fetch(`${this.API_URL}?${sortString}&maxRecords=${limit}`, {
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.records.map((record, index) => ({
                rank: index + 1,
                id: record.id,
                name: record.fields.Name,
                phone: record.fields.Phone,
                highScore: record.fields.HighScore || 0,
                currentLevel: record.fields.CurrentLevel || 1,
                gamesPlayed: record.fields.GamesPlayed || 0,
                totalScore: record.fields.TotalScore || 0,
                bestCombo: record.fields.BestCombo || 0,
                lastPlayed: record.fields.LastPlayed,
                gameMode: record.fields.GameMode || 'addition'
            }));
        } catch (error) {
            console.error('Error getting leaderboard:', error);
            throw error;
        }
    }
    
    // Get player ranking
    async getPlayerRanking(phone) {
        try {
            const leaderboard = await this.getLeaderboard(100); // Get more records to find ranking
            const playerIndex = leaderboard.findIndex(player => player.phone === phone);
            
            if (playerIndex === -1) {
                return null; // Player not found
            }
            
            return {
                rank: playerIndex + 1,
                totalPlayers: leaderboard.length,
                player: leaderboard[playerIndex]
            };
        } catch (error) {
            console.error('Error getting player ranking:', error);
            throw error;
        }
    }
    
    // Search for existing players
    async searchPlayers(searchTerm) {
        try {
            const filterFormula = `OR(SEARCH('${searchTerm}', LOWER({Name})) > 0, SEARCH('${searchTerm}', {Phone}) > 0)`;
            const response = await fetch(`${this.API_URL}?filterByFormula=${encodeURIComponent(filterFormula)}`, {
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result.records;
        } catch (error) {
            console.error('Error searching players:', error);
            throw error;
        }
    }
    
    // Delete player record (for admin purposes)
    async deletePlayer(recordId) {
        try {
            const response = await fetch(`${this.API_URL}/${recordId}`, {
                method: 'DELETE',
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    }
    
    // Get player statistics
    async getPlayerStats(recordId) {
        try {
            const response = await fetch(`${this.API_URL}/${recordId}`, {
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return {
                id: result.id,
                name: result.fields.Name,
                phone: result.fields.Phone,
                highScore: result.fields.HighScore || 0,
                currentLevel: result.fields.CurrentLevel || 1,
                gamesPlayed: result.fields.GamesPlayed || 0,
                totalScore: result.fields.TotalScore || 0,
                bestCombo: result.fields.BestCombo || 0,
                lastPlayed: result.fields.LastPlayed,
                gameMode: result.fields.GameMode || 'addition',
                averageScore: result.fields.GamesPlayed > 0 ? 
                    Math.round(result.fields.TotalScore / result.fields.GamesPlayed) : 0
            };
        } catch (error) {
            console.error('Error getting player stats:', error);
            throw error;
        }
    }
}

// Create global instance
window.airtableManager = new AirtableManager();
