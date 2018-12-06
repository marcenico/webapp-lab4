import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Usuarios } from 'src/app/shared/sdk';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public goLogin: boolean = false;
  public isValidSignUp: boolean = true;
  public isValidLogIn: boolean = true;

  private usuario: Usuarios = new Usuarios();

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    this.document.body.classList.add('bg-dark')
  }

  ngOnDestroy() {
    this.document.body.classList.remove('bg-dark')
  }

  public signUp(forma: NgForm) {
    console.log(this.usuario);
    this.authService.create(this.usuario)
      .subscribe(res => {
        this.isValidSignUp = true;
        this.router.navigate(['/home'], { replaceUrl: true });
      },
        err => {
          console.log("error en el registro" + err);
          this.isValidSignUp = false;
        }
      );
  }

  public logIn(forma2: NgForm) {
    console.log(this.usuario);
    this.authService.login(this.usuario)
      .subscribe(user => {
        console.log("USUARIO => " + user);
        this.isValidLogIn = true;
        this.router.navigate(['/home'], { replaceUrl: true });
      },
        err => {
          console.log("error en el inicio de sesion" + err);
          this.isValidLogIn = false;
        })
  }
}

