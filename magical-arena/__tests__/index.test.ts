import request from 'supertest';
import { app } from '../src/index';


describe('Game Server', () => {
    let gameId: string;

    test('Create game with valid player data', async () => {
        const response = await request(app)
            .post('/create-game')
            .send({
                player1: { health: 100, strength: 10, attack: 5 },
                player2: { health: 100, strength: 10, attack: 5 },
            });

        expect(response.status).toBe(200);
        expect(response.body.gameId).toBeDefined();
        gameId = response.body.gameId;
    });

    test('Error on creating game with invalid player data', async () => {
        const response = await request(app)
            .post('/create-game')
            .send({ player1: { health: 100 }, player2: { health: 100, strength: 10, attack: 5 } });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });

    test('Roll a turn in an existing game', async () => {
        // Create a game to get a new gameId
        const createResponse = await request(app)
            .post('/create-game')
            .send({
                player1: { health: 100, strength: 10, attack: 5 },
                player2: { health: 100, strength: 10, attack: 5 },
            });
        gameId = createResponse.body.gameId;

        const response = await request(app).post(`/roll/${gameId}`);

        expect(response.status).toBe(200);
        expect(response.body.log).toBeDefined();
        expect(response.body.gameOver).toBeDefined();
        expect(response.body.winner).toBeDefined();
        expect(response.body.player1.health).toBeDefined();
        expect(response.body.player2.health).toBeDefined();
    });

    test('Error on rolling a turn in a non-existent game', async () => {
        const response = await request(app).post('/roll/non-existent-game');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Game not found');
    });

    test('Game ends correctly when a player\'s health reaches 0', async () => {
        // Create a game with very low health for player2 to ensure quick end
        const createResponse = await request(app)
            .post('/create-game')
            .send({
                player1: { health: 100, strength: 10, attack: 5 },
                player2: { health: 1, strength: 10, attack: 5 },
            });
        gameId = createResponse.body.gameId;

        let response = await request(app).post(`/roll/${gameId}`);
        while (!response.body.gameOver) {
            response = await request(app).post(`/roll/${gameId}`);
        }

        expect(response.body.gameOver).toBe(true);
        expect(response.body.winner).toBe('Player 1 wins!');
    });
});
