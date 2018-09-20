import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { DetallemensajePage } from '../pages/detallemensaje/detallemensaje';
import { TareasPage } from '../pages/tareas/tareas';
import { DetalletareaPage } from '../pages/detalletarea/detalletarea';
import { EventosPage } from '../pages/eventos/eventos';
import { DetalleeventoPage } from '../pages/detalleevento/detalleevento';
import { NotasPage } from '../pages/notas/notas';
import { AsignaturasPage } from '../pages/asignaturas/asignaturas';
import { ActividadesPage } from '../pages/actividades/actividades';

//Servicios
import { LoginService } from '../services/login.service';
import { MensajesService } from '../services/mensajes.service';
import { TareasService } from '../services/tareas.service';
import { EventosService } from '../services/eventos.service';
import { AcudidosService } from '../services/acudidos.service';
import { NotasService } from '../services/notas.service';

//Modulos
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MensajesPage,
    DetallemensajePage,
    TareasPage,
    DetalletareaPage,
    EventosPage,
    DetalleeventoPage,
    NotasPage,
    AsignaturasPage,
    ActividadesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MensajesPage,
    DetallemensajePage,
    TareasPage,
    DetalletareaPage,
    EventosPage,
    DetalleeventoPage,
    NotasPage,
    AsignaturasPage,
    ActividadesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    MensajesService,
    TareasService,
    EventosService,
    AcudidosService,
    NotasService
  ]
})
export class AppModule {}
