export default class Coins {
    gold: number
    silver: number
    copper: number

    constructor(coins: number) {
        this.gold = Math.floor(coins / 10000);
        this.silver = Math.floor(coins / 100 % 100);
        this.copper = coins % 100;
    }

    toString = (): string => `${this.gold}g ${this.silver}s ${this.copper}c`
}
