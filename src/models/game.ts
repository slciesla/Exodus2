import { Planet } from './planet';
import { UtilityService } from '../services/utility.service';

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
    this.planet2.name = this.generatePlanetName();
    this.planet3.name = this.generatePlanetName();
  }

  private getRomanNumeral(num: number): string {
    console.log(num);
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
}
