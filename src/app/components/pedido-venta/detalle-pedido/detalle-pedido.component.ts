import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Domicilio, Pedidoventa } from 'src/app/shared/sdk';
import { PedidoVentaService } from 'src/app/services/pedido-venta.service';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatesExtension } from 'src/app/wrappers/DatesExtension';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
})
export class DetallePedidoComponent implements OnInit {

  forma: FormGroup;
  id: string;
  accion: string;
  isNew: boolean = false;
  isBigger: boolean = false;

  showCalendar = false;
  dfechaPedido: Date = null;
  showCalendar2 = false;
  dfechaEntrega: Date = null;

  estados = [
    { id: 1, name: "Pendiente" },
    { id: 2, name: "Enviado" },
    { id: 3, name: "Entregado" },
    { id: 4, name: "Anulado" }
  ];


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
    // if (this.id === "new") {
    //   this.selectChange();

    // }
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      nroDePedido: new FormControl('', [Validators.required]),
      fechaPedido: new FormControl('', [Validators.required]),
      fechaEstimadaEntrega: new FormControl('', [Validators.required]),
      gastosDeEnvio: new FormControl('', [Validators.required]),
      estado: new FormControl('Pendiente', []),
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

  onCustomDateChange(event) {
    // console.log(event.value instanceof Date, event.value);
    // console.log(event.value);
    if (event.value instanceof Date) {
      this.dfechaPedido = event.value;
      let number = DatesExtension.compareDate(this.dfechaPedido, this.dfechaEntrega);
      this.isBigger = (number === -1);
    }
  }


  seeCalendar(v: boolean) {
    this.showCalendar = v;
  }

  onCustomDateChange2(event) {
    // console.log(event.value instanceof Date, event.value);
    // console.log(event.value);
    if (event.value instanceof Date) {
      this.dfechaEntrega = event.value;
      let number = DatesExtension.compareDate(this.dfechaPedido, this.dfechaEntrega);
      this.isBigger = (number === -1);
    }
  }

  seeCalendar2(v: boolean) {
    this.showCalendar2 = v;
  }

  selectChange() {
    // console.log(this.estado);
    this.pedido.pedido_venta_domicilio.estado = this.estado;
  }

  get estado(): string {
    return this.forma ? this.forma.get('estado').value : '';
  }



}
