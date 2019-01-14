import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/clientes.service';
import { Cliente, Domicilio } from 'src/app/shared/sdk';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StringsRegex } from 'src/app/wrappers/StringsRegex';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  forma: FormGroup;
  id: string;
  accion: string;
  isNew: boolean = false;

  private domicilio: Domicilio = new Domicilio();

  constructor(private clienteService: ClienteService, private domService: DomicilioService, private router: Router, private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {
        this.id = parametros['id'];
        if (this.id === "new") {
          this.accion = " Nuevo Cliente";
          this.domicilio.cliente = new Cliente();
          this.domicilio.cliente.saldo = 0;
          this.validarFormulario();
        } else {
          this.accion = " Actualizando Cliente";
          this.domicilio.cliente = new Cliente();
          this.validarFormulario();
          this.domService.getOne(this.id)
            .subscribe(data => {
              this.domicilio = data;
              this.domicilio.cliente = data.cliente;
            });
        }
      });
  }

  ngOnInit() {
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      'razonSocial': new FormControl('', [Validators.required]),
      'cuit': new FormControl('', [Validators.required, Validators.pattern(StringsRegex.cuit)]),
      // 'saldo': new FormControl('', []),
      'calle': new FormControl('', [Validators.required]),
      'numero': new FormControl('', [Validators.required]),
      'localidad': new FormControl('', [Validators.required]),
      'latitud': new FormControl('', [Validators.required, Validators.pattern(StringsRegex.latitude)]),
      'longitud': new FormControl('', [Validators.required, Validators.pattern(StringsRegex.longitude)])
    })
  }

  public guardar() {
    // INSERTANDO
    if (this.id === "new") {
      this.domicilio.createdAt = new Date();
      this.domicilio.updatedAt = new Date();
      console.log(this.domicilio);
      this.clienteService.create(this.domicilio)
        .subscribe((dom: Domicilio) => {
          console.log("Domicilio creado");
          this.domService.createClienteWithDomicilio(dom.id, this.domicilio.cliente)
            .subscribe(res => {
              console.log("Domicilio con cliente asociado", res);
              this.router.navigate(['/clientes'], { replaceUrl: true });
            });

        });;
    } else {
      // ACTUALIZANDO
      this.domicilio.updatedAt = new Date();
      console.log("PARA ACTUALIZAR", this.domicilio);
      this.domService.updateClienteWithDomicilio(this.domicilio.id, this.domicilio)
        .subscribe(res => {
          console.log("ACTUALIZADO", res);
          this.domService.update(this.domicilio)
            .subscribe(res => {
              this.router.navigate(['/clientes'], { replaceUrl: true });
            }, error => console.log(error));
        }, error => console.log(error));
    }
  }

}
