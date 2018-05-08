import { UtilityService } from '../services/utility.service';
import { Biome, Planet } from './planet';

export class Game {
  planet: Planet;
  planet1: Planet;
  planet2: Planet;
  planet3: Planet;

  constructor() {
    this.planet = new Planet();
    this.planet1 = new Planet();
    this.planet2 = new Planet();
    this.planet3 = new Planet();
    this.planet1.name = this.generatePlanetName();
    this.planet1.startingStats = this.generateStartingStats(1);
    this.planet1.scoreModifier = this.generateScoreMod(this.planet1);
    this.planet2.name = this.generatePlanetName();
    this.planet2.startingStats = this.generateStartingStats(2);
    this.planet2.scoreModifier = this.generateScoreMod(this.planet2);
    this.planet3.name = this.generatePlanetName();
    this.planet3.startingStats = this.generateStartingStats(3);
    this.planet3.scoreModifier = this.generateScoreMod(this.planet3);
  }

  private getRomanNumeral(num: number): string {
    switch (num) {
      case 1:
        return 'I';
      case 2:
        return 'II';
      case 3:
        return 'III';
      case 4:
        return 'IV';
      case 5:
        return 'V';
      case 6:
        return 'VI';
      case 7:
        return 'VII';
    }
  }

  private generatePlanetName(): string {
    let name = '';
    const length = UtilityService.rand(3, 10);
    const c = 'bcdfghjklmnpqrstvwxyz';
    const v = 'aeiou';

    let constInRow = 0;
    let vowelInRow = 0;
    for (let index = 0; index < length; index++) {
      let letter = '';
      if ((UtilityService.rand() > 33 && constInRow < 2) || vowelInRow > 2) {
        letter = c[UtilityService.rand(0, c.length - 1)];
        constInRow++;
        vowelInRow = 0;
      } else {
        letter = v[UtilityService.rand(0, v.length - 1)];
        constInRow = 0;
        vowelInRow++;
      }
      name += index === 0 ? letter.toUpperCase() : letter;
    }
    name += ' ' + this.getRomanNumeral(UtilityService.rand(1, 7));

    return name;
  }

  private generateStartingStats(diff: number): any {
    let min: number;
    let max: number;
    let biome: Biome;
    const biomeNum = UtilityService.rand(1, 3);
    switch (diff) {
      case 1:
        min = 800;
        max = 1050;
        biome = biomeNum === 1 ? Biome.Temperate : biomeNum === 2 ? Biome.Savannah : Biome.Jungle;
        break;
      case 2:
        min = 600;
        max = 900;
        biome = biomeNum === 1 ? Biome.Jungle : biomeNum === 2 ? Biome.Taiga : Biome.Tundra;
        break;
      case 3:
        min = 400;
        max = 750;
        biome = biomeNum === 1 ? Biome.Tundra : biomeNum === 2 ? Biome.Desert : Biome.Ocean;
        break;
    }
    return {
      water: UtilityService.rand(min, max) / 1000,
      atmosphere: UtilityService.rand(min, max) / 1000,
      fertility: UtilityService.rand(min, max) / 1000,
      mineralDeposits: UtilityService.rand(min, max) / 1000,
      floraFauna: UtilityService.rand(min, max) / 1000,
      biome: biome
    };
  }

  private generateScoreMod(planet: Planet): number {
    return 2 - (planet.startingStats.atmosphere +
        planet.startingStats.fertility +
        planet.startingStats.floraFauna +
        planet.startingStats.mineralDeposits +
        planet.startingStats.water) / 5;
  }
}
