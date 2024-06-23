import { Player } from './Player';
import { Game } from './Game';

const player1 = new Player(50, 5, 10);
const player2 = new Player(100, 10, 5);

const game = new Game(player1, player2);
game.start();
