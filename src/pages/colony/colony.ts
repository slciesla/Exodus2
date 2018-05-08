import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { GameService } from '../../services/game.service';
import { UtilityService } from '../../services/utility.service';
import { Game } from '../../models';

@Component({
  selector: 'colony-page',
  templateUrl: 'colony.html'
})
export class ColonyPage implements OnInit, OnDestroy {
  private i = 0;
  private planetSub: Subscription;
  planetName = 'Exodus';
  tutorial = 0;
  game: Game;

  constructor(public navCtrl: NavController, private gameService: GameService, private storage: Storage) {
    this.game = this.gameService.game;
  }

  ngOnInit() {
    this.planetSub = this.gameService.planetNameObs.subscribe(name => {
      this.planetName = name;
    });

    const interval = setInterval(() => {
      this.tutorial++;
      if (this.tutorial === 10) {
        clearInterval(interval);
      }
    }, 500);
  }

  ngOnDestroy() {
    if (this.planetSub && !this.planetSub.closed) {
      this.planetSub.unsubscribe();
    }
  }


  land(planet: number) {
    console.log(planet);
  }

}
