import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html'
})
export class AgregarClienteComponent implements OnInit {

  forma: FormGroup;

  constructor() { 
    this.validarFormulario();
  }

  ngOnInit() {
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      'razonSocial': new FormControl('', [Validators.required]),
      'cuit': new FormControl('', [Validators.required]),
      'saldo': new FormControl('', []),
      'calle': new FormControl('', [Validators.required]),
      'numero': new FormControl('', [Validators.required]),
      'localidad': new FormControl('', [Validators.required]),   
      'latitud': new FormControl('', [Validators.required]),   
      'longitud': new FormControl('', [Validators.required])   
    })
  }

  public agregarCliente(forma: Form) {

  }

}
