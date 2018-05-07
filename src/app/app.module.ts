import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { PlanetPage } from '../pages/planet/planet';
import { StatsPage } from '../pages/stats/stats';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GameService } from '../services/game.service';
import { OptionsPage } from '../pages/options/options';

@NgModule({
  declarations: [
    MyApp,
    PlanetPage,
    StatsPage,
    OptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlanetPage,
    StatsPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GameService
  ]
})
export class AppModule { }
