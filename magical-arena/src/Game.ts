import { Player } from './Player';

export class Game {
    player1: Player;
    player2: Player;
    currentPlayer: Player;
    otherPlayer: Player;

    constructor(player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1.health < player2.health ? player1 : player2;
        this.otherPlayer = this.currentPlayer === player1 ? player2 : player1;
    }

    playTurn(): string {
        const attackRoll = Math.floor(Math.random() * 6) + 1;
        const defenseRoll = Math.floor(Math.random() * 6) + 1;

        const attackDamage = this.currentPlayer.attack * attackRoll;
        const defenseValue = this.otherPlayer.strength * defenseRoll;
        const damageDealt = Math.max(attackDamage - defenseValue, 0);
        this.otherPlayer.health -= damageDealt;

        let log = `Player ${this.currentPlayer === this.player1 ? 1 : 2} attacks and rolls ${attackRoll}. ` +
                  `Player ${this.otherPlayer === this.player1 ? 1 : 2} defends and rolls ${defenseRoll}. ` +
                  `Damage dealt: ${damageDealt}. ` +
                  `Player ${this.otherPlayer === this.player1 ? 1 : 2} health: ${this.otherPlayer.health}.`;

        if (this.otherPlayer.health <= 0) {
            log += ` Player ${this.otherPlayer === this.player1 ? 1 : 2} dies.`;
            return log;
        }

        // Swap current and other player
        [this.currentPlayer, this.otherPlayer] = [this.otherPlayer, this.currentPlayer];
        return log;
    }

    isGameOver(): boolean {
        return this.player1.health <= 0 || this.player2.health <= 0;
    }

    getWinner(): string {
        if (this.player1.health <= 0) return 'Player 2 wins!';
        if (this.player2.health <= 0) return 'Player 1 wins!';
        return 'No winner yet.';
    }
}
