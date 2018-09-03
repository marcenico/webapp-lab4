import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuarios } from '../../shared/sdk';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  public isLogged: boolean = false
  private usuario: any = {
    name: null,
    email: null,
    password: null
  }

  constructor(private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  public signUp(forma: NgForm) {
    console.log(this.usuario.name);
    let user: Usuarios = new Usuarios();
    user.name = this.usuario.name;
    user.email = this.usuario.email;
    user.password = this.usuario.password;
    console.log(user.name);

    this.authService.create(user)
      .subscribe(user => {
        console.log(user)
      });
  }
}

