import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PlanetPage } from '../pages/planet/planet';
import { StatsPage } from '../pages/stats/stats';
import { GameService } from '../services/game.service';
import { Storage } from '@ionic/storage';
import { OptionsPage } from '../pages/options/options';
import { Game } from '../models/game';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PlanetPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private gameService: GameService, private storage: Storage) {
    this.initializeApp();
  }

  ngOnInit() {
    this.gameService.planetNameObs.subscribe(name => {
      this.pages = [
        { title: name, component: PlanetPage },
        { title: 'Stats', component: StatsPage },
        { title: 'Options', component: OptionsPage }
      ];
    });
    this.storage.ready().then(() => {
      return this.storage.get('game');
    }).then(val => {
      if (val) {
        this.gameService.game = JSON.parse(val);
      } else {
        this.gameService.game = new Game();
        console.log('No saved game found');
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
