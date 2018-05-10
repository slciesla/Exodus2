import { UtilityService } from '../services/utility.service';
import { Biome, Planet, Color } from './planet';

export class Game {
  planet: Planet;
  planets: Planet[] = [];

  constructor() {
    this.planet = new Planet();
    this.planets = [];
  }
}
