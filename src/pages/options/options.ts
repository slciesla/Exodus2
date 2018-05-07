import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GameService } from '../../services/game.service';

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
    this.navCtrl.goToRoot({});
  }

}
