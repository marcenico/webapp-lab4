import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Usuarios } from 'src/app/shared/sdk';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public goLogin: boolean = false;
  public isValidSignUp: boolean = true;
  public isValidLogIn: boolean = true;
  public formaRegistro: FormGroup;

  private usuario: Usuarios = new Usuarios();

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.validarRegistro();
  }

  ngOnInit() {
    this.document.body.classList.add('bg-dark')
  }

  ngOnDestroy() {
    this.document.body.classList.remove('bg-dark')
  }

  validarRegistro() {
    this.formaRegistro = new FormGroup({
      'nameSU': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'passwordSU': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'emailSU': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    })
  }


  public signUp() {
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

