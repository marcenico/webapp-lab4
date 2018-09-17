import { Injectable } from '@angular/core';
import { DomicilioApi, Domicilio } from '../shared/sdk';
import { Observable } from 'rxjs';
import { LoopBackFilter } from '../../../../ionicapp/src/app/shared/sdk';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  constructor(private domicilioApi: DomicilioApi) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Domicilio[]> {
    return this.domicilioApi.find(filtro);
  }

  getById(id: number): Observable<Domicilio> {
    return this.domicilioApi.findById(id);
  }

  create(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.create(data);
  }

  update(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.patchAttributes(data.id, data);
  }

  delete(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.deleteById(data.id);
  }
}
