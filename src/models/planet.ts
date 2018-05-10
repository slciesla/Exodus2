import { UtilityService } from '../services/utility.service';

export class Planet {
  name: string;
  description: string;
  scoreModifier: number;
  startingStats: {
    water: number;
    atmosphere: number;
    fertility: number;
    resources: number;
    floraFauna: number;
    biome: Biome;
    waterColor: Color;
    landColor: Color;
  };

  constructor() {
    this.name = 'Exodus';
  }

  buildPlanet(diff: number): Planet {
    this.name = this.generatePlanetName();
    this.startingStats = this.generateStartingStats(diff);
    this.scoreModifier = this.generateScoreMod();
    this.description = this.generateDescription();
    return this;
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
      resources: UtilityService.rand(min, max) / 1000,
      floraFauna: UtilityService.rand(min, max) / 1000,
      biome: biome,
      waterColor: this.getColor(UtilityService.rand(0, 10)),
      landColor: this.getColor(UtilityService.rand(0, 10))
    };
  }

  private getColor(num: number): Color {
    switch (num) {
      case 0:
        return Color.Black;
      case 1:
        return Color.Blue;
      case 2:
        return Color.Gold;
      case 3:
        return Color.Green;
      case 4:
        return Color.Orange;
      case 5:
        return Color.Pink;
      case 6:
        return Color.Purple;
      case 7:
        return Color.Red;
      case 8:
        return Color.Silver;
      case 9:
        return Color.White;
      case 10:
        return Color.Yellow;
    }
  }

  private generateScoreMod(): number {
    return 2 - (this.startingStats.atmosphere +
      this.startingStats.fertility +
      this.startingStats.floraFauna +
      this.startingStats.resources +
      this.startingStats.water) / 5;
  }

  private generateDescription(): string {
    let desc = this.name + ' will be a';
    const good = [' great', ' wonderful', 'n excellent', 'n exceptional'];
    const goodDesc = ['plentiful', 'ample', 'copious', 'bountiful', 'generous', 'appreciable', 'prolific', 'considerable', 'numerous',
      'common'];
    const goodFert = ['very', 'extraordinarily', 'extremely', 'exceptionally'];
    const med = ['n okay', 'n all right', ' fine', 'n adequate'];
    const medDesc = ['some', 'a bit of', 'a little', 'a handful of', 'uncommon', 'scattered', 'sporadic', 'limited'];
    const medFert = ['not very', 'notably', 'unusually', 'curiously', 'surprisingly'];
    const bad = [' difficult', ' hard', 'n ambitious', ' trying', ' troublesome'];
    const badDesc = ['sparse', 'scarce', 'hardly any', 'scant', 'rare', 'infrequent', 'deficient', 'a small amount of'];
    const badFert = ['barely', 'terribly', 'hardly', 'dreadfully', 'awfully'];
    desc += this.scoreModifier < 1.15 ? good[UtilityService.rand(0, good.length - 1)] : this.scoreModifier < 1.3 ?
      med[UtilityService.rand(0, med.length - 1)] : bad[UtilityService.rand(0, bad.length - 1)];
    desc += ' planet to colonize. This planet has ';
    const waterDesc = this.startingStats.water > 0.85 ? goodDesc : this.startingStats.water > 0.7 ? medDesc : badDesc;
    const floraFaunaDesc = this.startingStats.floraFauna > 0.85 ? goodDesc : this.startingStats.floraFauna > 0.7 ? medDesc : badDesc;
    const atmoDesc = this.startingStats.atmosphere > 0.85 ? goodFert : this.startingStats.atmosphere > 0.7 ? medFert : badFert;
    const fertDesc = this.startingStats.fertility > 0.85 ? goodFert : this.startingStats.fertility > 0.7 ? medFert : badFert;
    const resourceDesc = this.startingStats.resources > 0.85 ? goodDesc : this.startingStats.resources > 0.7 ? medDesc : badDesc;
    switch (this.startingStats.biome) {
      case Biome.Desert:
        desc += 'arid deserts full of ' + this.startingStats.landColor.toLowerCase() + ' sand with ' +
          waterDesc[UtilityService.rand(0, waterDesc.length - 1)] + ' bodies of ' +
          this.startingStats.waterColor.toLowerCase() + ' water.';
        break;
      case Biome.Jungle:
        desc += 'lush ' + this.startingStats.landColor.toLowerCase() + ' jungles ';
        break;
      case Biome.Ocean:
        break;
      case Biome.Savannah:
        break;
      case Biome.Taiga:
        break;
      case Biome.Temperate:
        break;
      case Biome.Tundra:
        break;
    }
    desc += ' The land appears to have ' + floraFaunaDesc[UtilityService.rand(0, floraFaunaDesc.length - 1)] + ' flora and fauna living ' +
      'on the planet and appears to be ' + fertDesc[UtilityService.rand(0, fertDesc.length - 1)] + ' fertile.';
    desc += ' The atmosphere is ' + atmoDesc[UtilityService.rand(0, atmoDesc.length - 1)] + ' breathable.';
    desc += ' The ships scanners have picked up ' + resourceDesc[UtilityService.rand(0, resourceDesc.length - 1)] + ' resources ' +
      ' that we will be able to use to build our colony.';
    return desc;
  }
}

export enum Biome {
  Temperate = 'Temperate',
  Savannah = 'Savannah',
  Jungle = 'Jungle',
  Taiga = 'Taiga',
  Tundra = 'Tundra',
  Desert = 'Desert',
  Ocean = 'Ocean'
}

export enum Color {
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
  Orange = 'Orange',
  Pink = 'Pink',
  White = 'White',
  Black = 'Black',
  Silver = 'Silver',
  Gold = 'Gold',
  Yellow = 'Yellow',
  Purple = 'Purple'
}
