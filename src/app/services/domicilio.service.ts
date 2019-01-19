import { Injectable } from '@angular/core';
import { DomicilioApi, Domicilio, Cliente, Pedidoventa } from '../shared/sdk';
import { Observable } from 'rxjs';
import { LoopBackFilter } from '../../../../webapp/src/app/shared/sdk';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  constructor(private domicilioApi: DomicilioApi) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Domicilio[]> {
    return this.domicilioApi.find(filtro);
  }

  getOne(id: string): Observable<Domicilio> {
    let idNumber = parseInt(id);
    let filter: any = { where: { id: idNumber }, include: 'cliente' };
    return this.domicilioApi.findOne(filter);
  }

  getById(id: number): Observable<Domicilio> {
    return this.domicilioApi.findById(id);
  }

  create(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.create(data);
  }

  createClienteWithDomicilio(id: number, cliente: Cliente): Observable<Domicilio> {
    return this.domicilioApi.createCliente(id, cliente);
  }

  updateClienteWithDomicilio(id: number, data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.updateCliente(id, data.cliente);
  }

  createPedidoWithDomicilio(id: number, pedido_venta: Pedidoventa): any {
    return this.domicilioApi.createPedido_venta(id, pedido_venta);
  }

  update(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.patchAttributes(data.id, data);
  }

  delete(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.deleteById(data.id);
  }
}
