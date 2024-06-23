import { Player } from '../src/Player';
import { Game } from '../src/Game';

describe('Game Class', () => {
    let player1: Player;
    let player2: Player;
    let game: Game;

    beforeEach(() => {
        player1 = new Player(100, 10, 5);
        player2 = new Player(80, 10, 5);
        game = new Game(player1, player2);
    });

    test('playTurn reduces health of the defending player', () => {
        const initialHealth = player2.health;
        game.playTurn();
        expect(player2.health).toBeLessThanOrEqual(initialHealth);
    });

    test('isGameOver returns false when both players are alive', () => {
        expect(game.isGameOver()).toBe(false);
    });

    test('isGameOver returns true when a player\'s health is 0 or less', () => {
        player1.health = 0;
        expect(game.isGameOver()).toBe(true);
    });

    test('getWinner returns the correct winner', () => {
        player1.health = 0;
        expect(game.getWinner()).toBe('Player 2 wins!');
        player1.health = 100;
        player2.health = 0;
        expect(game.getWinner()).toBe('Player 1 wins!');
    });
});
