import { Injectable } from '@angular/core';
import { Pedidoventa, Domicilio, PedidoventaApi } from '../shared/sdk';
import { LoopBackFilter } from './../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs';
import { DomicilioService } from './domicilio.service';

@Injectable({
  providedIn: 'root'
})

export class PedidosService {
  constructor(private pedidoventaApi: PedidoventaApi, private domService: DomicilioService) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Pedidoventa[]> {
    return this.pedidoventaApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Pedidoventa> {
    return this.pedidoventaApi.findOne(filtro);
  }

  getById(id: number): Observable<Pedidoventa> {
    return this.pedidoventaApi.findById(id);
  }

  create(data: Domicilio): Observable<Domicilio> {
    return this.domService.create(data);
  }

  update(data: Pedidoventa, id: string): Observable<Pedidoventa> {
    return this.pedidoventaApi.patchAttributes(id, data);
  }

  delete(data: Pedidoventa): Observable<Pedidoventa> {
    return this.pedidoventaApi.deleteById(data.id);
  }
}