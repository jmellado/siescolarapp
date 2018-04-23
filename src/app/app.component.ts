import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { TareasPage } from '../pages/tareas/tareas';
import { EventosPage } from '../pages/eventos/eventos';

//Servicios
import {LoginService} from '../services/login.service';

//Modulos
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = LoginPage;
  rootPage:any;
  session : any;

  id_persona: string;
  token: string;
  respuesta:any;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private loginservice: LoginService, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.verificarlogin();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Mensajes', component: MensajesPage, icon: 'mail' },
      { title: 'Tareas', component: TareasPage, icon: 'clipboard' },
      { title: 'Eventos', component: EventosPage, icon: 'calendar' }
    ];
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  cerrar_sesion(){

    this.eliminar_token();
    this.loginservice.logout();
    this.nav.setRoot(LoginPage);
  }

  verificarlogin() {

    this.storage.get('session').then((val) =>{

      if(val !=null && val !=undefined){
        this.session = JSON.parse(val);
        console.log(this.session.nombres);
        this.rootPage = HomePage;
      }
      else{
        this.rootPage = LoginPage;
      }
      
    });
  }


  eliminar_token(){

    this.storage.get('session').then((val) =>{

      if(val !=null && val !=undefined){

        this.session = JSON.parse(val);
        this.id_persona = this.session.id_persona;
        this.token = "XYZ";

        let PersonaToken = {id_persona:this.id_persona, token:this.token};

        this.loginservice.registrarToken(PersonaToken)
            .subscribe(
              rs => this.respuesta = rs,
              er => console.log(er),
              () => console.log(this.respuesta)
            )
      }

    });

  }

}

