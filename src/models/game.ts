import { Planet } from './planet';

export class Game {
  planet: Planet;

  constructor() {
    this.planet = new Planet();
  }
}