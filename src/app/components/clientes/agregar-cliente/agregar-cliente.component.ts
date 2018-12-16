import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { ClienteService } from 'src/app/services/clientes.service';
import { Cliente, Domicilio } from 'src/app/shared/sdk';
import { ClientesComponent } from '../clientes.component';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html'
})
export class AgregarClienteComponent implements OnInit {

  forma: FormGroup;
  private domicilio: Domicilio = new Domicilio();

  constructor(private clienteService: ClienteService) {
    this.domicilio.cliente_domicilio = new Cliente();
    this.domicilio.cliente_domicilio.saldo = 0;
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

  public agregarCliente() {
    console.log(this.domicilio);
    this.clienteService.create(this.domicilio);
  }

}
