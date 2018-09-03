//#region Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//#endregion

//#region Componentes
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
//#endregion

//#region AGREGADAS PARA QUE FUNCIONE EL SDK*/
import { UsuariosApi, LoopBackAuth } from './shared/sdk';
import { SDKModels } from './shared/sdk/services/custom/SDKModels';
import { InternalStorage } from './shared/sdk/storage/storage.swaps';
//#endregion
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [UsuariosApi, HttpClientModule, SDKModels, InternalStorage, LoopBackAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
