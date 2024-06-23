export class Player {
    constructor(
        public health: number,
        public strength: number,
        public attack: number
    ) {}

    isAlive(): boolean {
        return this.health > 0;
    }
}
