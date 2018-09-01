import { Injectable } from '@angular/core';
import { Users, UsersApi, LoopBackFilter } from '../shared/sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private usersApi: UsersApi) { }

  getAll(filtro: LoopBackFilter = {}): Observable<Users[]> {
    return this.usersApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Users> {
    return this.usersApi.findOne(filtro);
  }

  getById(id: number): Observable<Users> {
    return this.usersApi.findById(id);
  }

  create(data: Users): Observable<Users> {
    return this.usersApi.create(data);
  }

  update(data: Users): Observable<Users> {
    return this.usersApi.patchAttributes(data.id, data);
  }

  delete(data: Users): Observable<Users> {
    return this.usersApi.deleteById(data.id);
  }

  count() {
    return this.usersApi.count();
  }
}