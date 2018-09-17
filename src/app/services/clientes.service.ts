import { Injectable } from '@angular/core';
import { Cliente, ClienteApi, Domicilio } from '../shared/sdk';
import { LoopBackFilter } from './../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  constructor(private clienteApi: ClienteApi) { }
  
  getAll(filtro: LoopBackFilter = {}): Observable<Cliente[]> {
    return this.clienteApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Cliente> {
    return this.clienteApi.findOne(filtro);
  }

  getById(id: number): Observable<Cliente> {
    return this.clienteApi.findById(id);
  }

  create(data: Cliente): Observable<Cliente> {
    return this.clienteApi.create(data);
  }

  update(data: Cliente): Observable<Cliente> {
    return this.clienteApi.patchAttributes(data.id, data);
  }

  delete(data: Cliente): Observable<Cliente> {
    return this.clienteApi.deleteById(data.id);
  }
}