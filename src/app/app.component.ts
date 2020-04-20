import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(){
  
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions:AndroidPermissions,
    private localNotifications: LocalNotifications) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
    );
    this.platform.ready().then(()=>{
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.INTERNET, this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]);
    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
    this.localNotifications.schedule({
      id: 1,
      icon:'../assets/icon/quote.svg',
      text: 'Chaque 24 heures',
      sound: './../assets/sound.mp3' ,
      trigger: {at: new Date(new Date().getTime() + 120)},
      led: 'FF0000',
      data: { secret: 1 }
    });
  }
}
