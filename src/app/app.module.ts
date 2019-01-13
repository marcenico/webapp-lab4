//#region Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
//#endregion

//#region Componentes
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PedidoVentaComponent } from './components/pedido-venta/pedido-venta.component';
import { DetallePedidoComponent } from './components/pedido-venta/detalle-pedido/detalle-pedido.component';
import { RubroComponent } from './components/rubro/rubro.component';
//#endregion

//#region AGREGADAS PARA QUE FUNCIONE EL SDK*/
import { UsuariosApi, LoopBackAuth, ClienteApi, DomicilioApi, PedidoventaApi } from './shared/sdk';
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
    ClienteComponent,
    FooterComponent,
    SidebarComponent,
    PedidoVentaComponent,
    DetallePedidoComponent,
    RubroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    DlDateTimePickerDateModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [DomicilioApi, UsuariosApi, ClienteApi, PedidoventaApi, HttpClientModule, SDKModels, InternalStorage, LoopBackAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
