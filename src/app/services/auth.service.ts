import { Injectable } from '@angular/core';
import { Usuarios, UsuariosApi } from '../shared/sdk';
import { LoopBackFilter } from './../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private usersApi: UsuariosApi) { }


  getAll(filtro: LoopBackFilter = {}): Observable<Usuarios[]> {
    return this.usersApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Usuarios> {
    return this.usersApi.findOne(filtro);
  }

  login(user: Usuarios): Observable<Usuarios> {
    let filter: any = {where: {and: [{email: user.email}, {password: user.password}]}};
    return this.usersApi.findOne(filter);
  }

  getById(id: number): Observable<Usuarios> {
    return this.usersApi.findById(id);
  }

  create(data: Usuarios): Observable<Usuarios> {
    return this.usersApi.create(data);
  }

  update(data: Usuarios): Observable<Usuarios> {
    return this.usersApi.patchAttributes(data.id, data);
  }

  delete(data: Usuarios): Observable<Usuarios> {
    return this.usersApi.deleteById(data.id);
  }

}