import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ColonyPage } from '../pages/colony/colony';
import { StatsPage } from '../pages/stats/stats';
import { GameService } from '../services/game.service';
import { Storage } from '@ionic/storage';
import { OptionsPage } from '../pages/options/options';
import { Game } from '../models';
import * as CryptoJS from 'crypto-js';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ColonyPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private gameService: GameService, private storage: Storage) {
    this.initializeApp();
  }

  ngOnInit() {
    this.gameService.planetNameObs.subscribe(name => {
      this.pages = [
        { title: name, component: ColonyPage },
        { title: 'Stats', component: StatsPage },
        { title: 'Options', component: OptionsPage }
      ];
    });
    this.storage.ready().then(() => {
      return this.storage.get('game');
    }).then(val => {
      if (val) {
        Object.assign(this.gameService.game, JSON.parse(CryptoJS.AES.decrypt(val, 'exodus').toString(CryptoJS.enc.Latin1)));
      } else {
        console.log('No saved game found');
        this.storage.set('game', CryptoJS.AES.encrypt(JSON.stringify(this.gameService.game), 'exodus').toString(CryptoJS.enc.Latin1));
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
