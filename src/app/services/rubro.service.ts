import { Injectable } from '@angular/core';
import { Rubro, RubroApi, LoopBackFilter } from '../shared/sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  constructor(private rubroApi: RubroApi) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Rubro[]> {
    return this.rubroApi.find(filtro);
  }

  getOne(id: number): Observable<Rubro> {
    let filter: any = { where: { id: id } };
    return this.rubroApi.findOne(filter);
  }

  getById(id: number): Observable<Rubro> {
    return this.rubroApi.findById(id);
  }

  getOneWithRubroPadre(id: number): Observable<Rubro> {
    let filter: any =  { include: 'rubroPadre' };
    return this.rubroApi.findById(id, filter);
  }

  create(data: Rubro): Observable<Rubro> {
    return this.rubroApi.create(data);
  }


  update(data: Rubro): Observable<Rubro> {
    return this.rubroApi.patchAttributes(data.id, data);
  }

  delete(data: Rubro): Observable<Rubro> {
    return this.rubroApi.deleteById(data.id);
  }


}
