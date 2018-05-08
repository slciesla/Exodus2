import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Game } from '../models/game';
import { UtilityService } from './utility.service';

@Injectable()
export class GameService implements OnInit {
  private _planetNameSource = new BehaviorSubject<string>('Exodus');
  planetNameObs = this._planetNameSource.asObservable();
  game = new Game();

  set planetName(planetName: string) {
    this.game.planet.name = planetName;
    this._planetNameSource.next(planetName);
  }

  get planetName(): string {
    return this.game.planet.name;
  }

  constructor() { }

  ngOnInit() {
  }
}
