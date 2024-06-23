import { Player } from './Player';
import { Dice } from './Dice';

export class Game {
    private dice: Dice;

    constructor(
        private player1: Player,
        private player2: Player
    ) {
        this.dice = new Dice();
    }

    start(): void {
        while (!this.isGameOver()) {
            this.takeTurn();
        }

        const winner = this.player1.isAlive() ? 'Player 1' : 'Player 2';
        console.log(`${winner} wins!`);
    }

    private takeTurn(): void {
        const attacker = this.player1.health <= this.player2.health ? this.player1 : this.player2;
        const defender = attacker === this.player1 ? this.player2 : this.player1;

        attacker.attackOpponent(defender, this.dice);

        console.log(`Player 1: ${this.player1.health} HP, Player 2: ${this.player2.health} HP`);
    }

    private isGameOver(): boolean {
        return !this.player1.isAlive() || !this.player2.isAlive();
    }
}
