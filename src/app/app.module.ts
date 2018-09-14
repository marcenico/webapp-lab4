//#region Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { DataTablesModule } from 'angular-datatables';
//#endregion

//#region Componentes
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//#endregion

//#region AGREGADAS PARA QUE FUNCIONE EL SDK*/
import { UsuariosApi, LoopBackAuth, ClienteApi, DomicilioApi } from './shared/sdk';
import { SDKModels } from './shared/sdk/services/custom/SDKModels';
import { InternalStorage } from './shared/sdk/storage/storage.swaps';
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ClientesComponent,
    ArticulosComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [DomicilioApi, UsuariosApi, ClienteApi, HttpClientModule, SDKModels, InternalStorage, LoopBackAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
