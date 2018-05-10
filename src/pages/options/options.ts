import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GameService } from '../../services/game.service';
import { Game } from '../../models';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'options-page',
  templateUrl: 'options.html'
})
export class OptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private gameService: GameService) {
  }

  clearData() {
    this.storage.clear();
    this.gameService.planetName = 'Exodus';
    this.gameService.game = new Game();
    this.gameService.generatePlanets(3);
    this.storage.set('game', JSON.stringify(this.gameService.game));
    this.navCtrl.goToRoot({});
  }

}
