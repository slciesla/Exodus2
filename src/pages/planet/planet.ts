import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'planet-page',
  templateUrl: 'planet.html'
})
export class PlanetPage implements OnInit, OnDestroy {
  private i = 0;
  private planetSub: Subscription;
  planetName = 'Exodus';

  constructor(public navCtrl: NavController, private gameService: GameService, private storage: Storage) { }

  ngOnInit() {
    this.planetSub = this.gameService.planetNameObs.subscribe(name => {
      this.planetName = name;
    });
  }

  ngOnDestroy() {
    if (this.planetSub && !this.planetSub.closed) {
      this.planetSub.unsubscribe();
    }
  }

  buttonClick() {
    this.gameService.planetName = 'Planet ' + this.i++;
    this.storage.set('name', this.gameService.planetName);
  }

}
