import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html'
})
export class AgregarClienteComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  ngOnInit() {
    this.validarFormulario();
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      'nameSU': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'passwordSU': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'emailSU': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    })
  }

  public agregarCliente(forma: Form) {

  }

}
