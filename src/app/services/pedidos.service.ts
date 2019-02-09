import { Injectable } from '@angular/core';
import { Pedidoventa, Domicilio, PedidoventaApi, Pedidoventadetalle, PedidoventadetalleApi } from '../shared/sdk';
import { LoopBackFilter } from './../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs';
import { DomicilioService } from './domicilio.service';
import { PedidosDetalleService } from './pedidos-detalle.service';

@Injectable({
  providedIn: 'root'
})

export class PedidosService {
  constructor(private pedidoventaApi: PedidoventaApi, private detalleApi: PedidoventadetalleApi, private detalleService: PedidosDetalleService) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Pedidoventa[]> {
    return this.pedidoventaApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Pedidoventa> {
    return this.pedidoventaApi.findOne(filtro);
  }

  getById(id: number): Observable<Pedidoventa> {
    return this.pedidoventaApi.findById(id);
  }

  create(data: Pedidoventa): Observable<Pedidoventa> {
    return this.pedidoventaApi.create(data);
  }

  createDetalles(id: number, d: Pedidoventadetalle[]): Observable<Pedidoventadetalle[]> {
    for (let i = 0; i < d.length; i++) {
      d[i].pedidoVentaId = id;
      d[i].id = null;
    }
    return this.detalleApi.createMany(d)
  }

  createDetalle(pedidoVentaId: number, d: Pedidoventadetalle): Observable<Pedidoventadetalle> {
    d.pedidoVentaId = pedidoVentaId;
    d.id = null;
    return this.detalleApi.create(d);
  }

  updateDetalles(d: Pedidoventadetalle): Observable<Pedidoventadetalle> {
    return this.detalleService.update(d);
  }

  update(data: Pedidoventa, id: string): Observable<Pedidoventa> {
    return this.pedidoventaApi.patchAttributes(id, data);
  }

  delete(data: Pedidoventa): Observable<Pedidoventa> {
    return this.pedidoventaApi.deleteById(data.id);
  }
}