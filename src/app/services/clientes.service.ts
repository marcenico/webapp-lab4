import { Injectable } from '@angular/core';
import { Cliente, ClienteApi, Domicilio } from '../shared/sdk';
import { LoopBackFilter } from './../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs';
import { DomicilioService } from './domicilio.service';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  constructor(private clienteApi: ClienteApi, private domService: DomicilioService) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Cliente[]> {
    return this.clienteApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Cliente> {
    return this.clienteApi.findOne(filtro);
  }

  getById(id: number): Observable<Cliente> {
    return this.clienteApi.findById(id);
  }

  create(data: Domicilio):Observable<Domicilio> {
    return this.domService.create(data);
  }

  update(data: Cliente, id: string): Observable<Cliente> {
    return this.clienteApi.patchAttributes(id, data);
  }

  delete(data: Cliente): Observable<Cliente> {
    return this.clienteApi.deleteById(data.id);
  }

}