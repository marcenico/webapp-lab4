import { Injectable } from '@angular/core';
import { PedidoventadetalleApi, LoopBackFilter, Pedidoventadetalle, PedidoventaApi } from '../shared/sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosDetalleService {

  constructor(private detalleApi: PedidoventadetalleApi) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Pedidoventadetalle[]> {
    return this.detalleApi.find(filtro);
  }

  getAllById(pedidoVentaId: number): Observable<Pedidoventadetalle[]> {
    let filter: any = { where: { pedidoVentaId: pedidoVentaId }, include: 'articulo' };
    return this.detalleApi.find(filter);
  }

  getOne(id: number): Observable<Pedidoventadetalle> {
    let filter: any = { where: { id: id } };
    return this.detalleApi.findOne(filter);
  }

  getById(id: number): Observable<Pedidoventadetalle> {
    return this.detalleApi.findById(id);
  }

  create(data: Pedidoventadetalle): Observable<Pedidoventadetalle> {
    return this.detalleApi.create(data);
  }

  update(data: Pedidoventadetalle): Observable<Pedidoventadetalle> {
    return this.detalleApi.patchAttributes(data.id, data);
  }

  delete(data: Pedidoventadetalle): Observable<Pedidoventadetalle> {
    return this.detalleApi.deleteById(data.id);
  }


}
