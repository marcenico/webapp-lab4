import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Domicilio, Pedidoventa } from 'src/app/shared/sdk';
import { PedidoVentaService } from 'src/app/services/pedido-venta.service';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
})
export class DetallePedidoComponent implements OnInit {

  forma: FormGroup;
  id: string;
  accion: string;
  isNew: boolean = false;
  showCalendar = false;
  
  private pedido: Domicilio = new Domicilio();

  constructor(private pedidoVentaService: PedidoVentaService, private domService: DomicilioService, private router: Router, private route: ActivatedRoute) {
    this.route.params
    .subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id === "new") {
        this.accion = " Nuevo Pedido";
        this.pedido.pedido_venta_domicilio = new Pedidoventa();
                this.validarFormulario();
      } else {
        this.accion = " Actualizando Pedido";
        this.pedido.pedido_venta_domicilio = new Pedidoventa();
        this.validarFormulario();
        this.domService.getOne(this.id)
          .subscribe(data => {
            this.pedido = data;
            this.pedido.pedido_venta_domicilio = data.pedido_venta_domicilio;
          });
      }
    });
   }

  ngOnInit() {

  }

  private validarFormulario() {
    this.forma = new FormGroup({
      'nroDePedido': new FormControl('', [Validators.required]),
      'fechaEstimadaEntrega': new FormControl('', [Validators.required]),
      'cuit': new FormControl('', [Validators.required]),
      'calle': new FormControl('', [Validators.required]),
      'numero': new FormControl('', [Validators.required]),
      'localidad': new FormControl('', [Validators.required]),
      'latitud': new FormControl('', [Validators.required]),
      'longitud': new FormControl('', [Validators.required])
    })
  }

  public guardar() {
    // INSERTANDO
    if (this.id === "new") {
    //   console.log(this.domicilio);
    //   this.pedidoVentaService.create(this.domicilio)
    //     .subscribe((dom: Domicilio) => {
    //       console.log("Domicilio creado");
    //       this.domService.createClienteWithDomicilio(dom.id, this.domicilio.cliente_domicilio)
    //         .subscribe(res => {
    //           console.log("Domicilio con cliente asociado", res);
    //           this.router.navigate(['/clientes'], { replaceUrl: true });
    //         });

    //     });;
    } else {
      // ACTUALIZANDO
      console.log("PARA ACTUALIZAR", this.pedido);
      // this.pedidoVentaService.updateClienteWithDomicilio(this.domicilio.id, this.domicilio)
      //   .subscribe(res => {
      //     console.log("ACTUALIZADO", res);
      //     this.domService.update(this.domicilio)
      //       .subscribe(res => {
      //         this.router.navigate(['/clientes'], { replaceUrl: true });
      //       }, error => console.log(error));
      //   }, error => console.log(error));
    }
  }

  onCustomDateChange(event){
    // console.log(event.value instanceof Date, event.value);
  }

  
  refresh(v: boolean) {
    this.showCalendar = v;
  }

}
