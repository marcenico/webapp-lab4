import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { PedidoVentaComponent } from './components/pedido-venta/pedido-venta.component';
import { DetallePedidoComponent } from './components/pedido-venta/detalle-pedido/detalle-pedido.component';
import { RubrosComponent } from './components/rubros/rubros.component';
import { RubroComponent } from './components/rubros/rubro/rubro.component';

const app_routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/cliente/:id', component: ClienteComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'rubros', component: RubrosComponent },
  { path: 'rubros/rubro/:id', component: RubroComponent },
  { path: 'pedidos', component: PedidoVentaComponent },
  { path: 'pedidos/pedido/:id', component: DetallePedidoComponent },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(app_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
