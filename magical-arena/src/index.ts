import express from 'express';
import { Player } from './Player';
import { Game } from './Game';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
const port = 3000;

interface GameState {
    player1: Player;
    player2: Player;
    game: Game;
}

const games: Record<string, GameState> = {};

app.use(cors());
app.use(express.json());

app.post('/create-game', (req, res) => {
    const { player1, player2 } = req.body;

    if (!player1.health || !player1.strength || !player1.attack || !player2.health || !player2.strength || !player2.attack) {
        return res.status(400).json({ message: 'Invalid player data' });
    }

    const p1 = new Player(player1.health, player1.strength, player1.attack);
    const p2 = new Player(player2.health, player2.strength, player2.attack);

    const game = new Game(p1, p2);
    const gameId = uuidv4();

    games[gameId] = { player1: p1, player2: p2, game };

    res.json({ gameId });
});

app.post('/roll/:gameId', (req, res) => {
    const { gameId } = req.params;
    const gameState = games[gameId];
    if (!gameState) {
        return res.status(404).json({ message: 'Game not found' });
    }

    const log = gameState.game.playTurn();

    res.json({
        log,
        gameOver: gameState.game.isGameOver(),
        winner: gameState.game.getWinner(),
        player1: { health: gameState.player1.health },
        player2: { health: gameState.player2.health }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app };
