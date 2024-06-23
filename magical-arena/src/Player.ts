import { Dice } from './Dice';

export class Player {
    constructor(
        public health: number,
        public strength: number,
        public attack: number
    ) {}

    isAlive(): boolean {
        return this.health > 0;
    }

    attackOpponent(opponent: Player, dice: Dice): void {
        const attackRoll = dice.roll();
        const attackDamage = this.attack * attackRoll;
        opponent.defend(attackDamage, dice);
    }

    defend(attackDamage: number, dice: Dice): void {
        const defendRoll = dice.roll();
        const defendPower = this.strength * defendRoll;
        const damageTaken = Math.max(0, attackDamage - defendPower);
        this.health = Math.max(0, this.health - damageTaken);
    }
}
