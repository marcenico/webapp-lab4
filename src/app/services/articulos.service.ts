import { Injectable } from '@angular/core';
import { Articulo, ArticuloApi, LoopBackFilter } from '../shared/sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private articuloApi: ArticuloApi) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Articulo[]> {
    return this.articuloApi.find(filtro);
  }

  getOne(id: number): Observable<Articulo> {
    let filter: any = { where: { id: id } };
    return this.articuloApi.findOne(filter);
  }

  getById(id: number): Observable<Articulo> {
    return this.articuloApi.findById(id);
  }

  create(data: Articulo): Observable<Articulo> {
    return this.articuloApi.create(data);
  }


  update(data: Articulo): Observable<Articulo> {
    return this.articuloApi.patchAttributes(data.id, data);
  }

  delete(data: Articulo): Observable<Articulo> {
    return this.articuloApi.deleteById(data.id);
  }

}
