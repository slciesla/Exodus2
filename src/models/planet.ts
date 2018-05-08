export class Planet {
  name: string;
  description: string;
  scoreModifier: number;
  startingStats: {
    water: number;
    atmosphere: number;
    fertility: number;
    mineralDeposits: number;
    floraFauna: number;
    biome: Biome;
  };

  constructor() {
    this.name = 'Exodus';
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
