import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';


import   { HttpModule } from '@angular/http';
import { Storage } from "@ionic/storage";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InfraccionesPage } from '../pages/infracciones/infracciones';
import { NuevainfraccionPage } from '../pages/nuevainfraccion/nuevainfraccion';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../providers/registrar';
import { InfraccionesService } from '../providers/infracciones';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InfraccionesPage,
    NuevainfraccionPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InfraccionesPage,
    NuevainfraccionPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsuarioService,
    InfraccionesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},


  ]
})
export class AppModule {}
