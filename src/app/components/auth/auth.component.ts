import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
  public formaLogin: FormGroup;

  private usuario: Usuarios = new Usuarios();

  constructor(
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.validarRegistro();
    this.validarInicioSesion();
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#5b5b5b";
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#fcfcff";
  }

  validarRegistro() {
    this.formaRegistro = new FormGroup({
      nameSU: new FormControl('', [Validators.required, Validators.minLength(3)]),
      passwordSU: new FormControl('', [Validators.required, Validators.minLength(8)]),
      emailSU: new FormControl('', [Validators.required, Validators.email])
      
    })
  }

  validarInicioSesion() {
    this.formaLogin = new FormGroup({
      passwordLI: new FormControl('', [Validators.required, Validators.minLength(8)]),
      emailLI: new FormControl('', [Validators.required, Validators.email])
    })
  }

  public signUp() {
    this.authService.create(this.usuario)
      .subscribe((res: Usuarios) => {
        console.log(res);
        this.isValidSignUp = true;
        this.router.navigate(['/home'], { replaceUrl: true });
      },
        err => {
          console.log("error en el registro" + err);
          this.isValidSignUp = false;
        }
      );
  }

  public logIn() {
    this.authService.login(this.usuario)
      .subscribe((user: Usuarios) => {
        console.log(user);
        this.isValidLogIn = true;
        this.router.navigate(['/home'], { replaceUrl: true });
      },
        err => {
          console.log("error en el inicio de sesion" + err);
          this.isValidLogIn = false;
        })
  }
}

