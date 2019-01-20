import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Domicilio, Pedidoventa, Pedidoventadetalle, Cliente } from 'src/app/shared/sdk';
import { PedidosService } from 'src/app/services/pedidos.service';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatesExtension } from 'src/app/wrappers/DatesExtension';
import { StringsRegex } from 'src/app/wrappers/StringsRegex';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
})
export class PedidoComponent implements OnInit {

  forma: FormGroup;
  id: string;
  accion: string;
  isNew: boolean = false;
  isBigger: boolean = false;

  showCalendar: boolean = false;
  dfechaPedido: Date = null;
  showCalendar2: boolean = false;
  dfechaEntrega: Date = null;

  estados = [
    { id: 1, name: "Pendiente" },
    { id: 2, name: "Enviado" },
    { id: 3, name: "Entregado" },
    { id: 4, name: "Anulado" }
  ];


  private pedido: Pedidoventa = new Pedidoventa();


  @Input() detalles: Array<Pedidoventadetalle> = [];
  clientes: Array<Cliente> = [];;

  constructor(private pedidosService: PedidosService, private domService: DomicilioService, private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.clienteService.getAll()
      .subscribe(data => this.clientes = data);
    this.armarPedido();
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      nroPedido: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyIntegerNumbers)]),
      fechaPedido: new FormControl('', [Validators.required]),
      fechaEstimadaEntrega: new FormControl('', [Validators.required]),
      gastosEnvio: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.noNegative)]),
      estado: new FormControl('Pendiente', [Validators.required]),
      entregado: new FormControl('', []),
      subTotal: new FormControl('', []),
      montoTotal: new FormControl('', []),
      detalleCantidad: new FormControl('', []),
      detalleSubTotal: new FormControl('', []),
      detalleDescuento: new FormControl('', []),
      cliente: new FormControl('', [Validators.required]),
    })
  }

  armarPedido() {
    this.route.params
      .subscribe(parametros => {
        this.id = parametros['id'];
        this.pedido.pedido_venta_detalle = [];
        this.validarFormulario();
        this.selectChangeEstado();
        if (this.id === "new") {
          this.accion = " Nuevo Pedido";
          this.dfechaPedido = null;
          this.dfechaEntrega = null;
          this.pedido.gastosEnvio = 0.0;
          this.pedido.nroPedido = 0;
          this.calcularSubTotalYMontoTotal();

        } else {
          this.accion = " Actualizando Pedido";
          this.pedidosService.getById(parseInt(this.id))
            .subscribe(data => {
              // console.log(data);
              this.forma.get('fechaPedido').setErrors(null);
              this.forma.get('fechaEstimadaEntrega').setErrors(null);
              this.pedido = data;
              this.dfechaPedido = this.pedido.fechaPedido;
              this.dfechaEntrega = this.pedido.fechaEstimadaEntrega;
              this.forma.get('nroPedido').setValue(this.pedido.nroPedido);
              this.forma.get('gastosEnvio').setValue(this.pedido.gastosEnvio);
              this.pedido.fechaPedido = new Date(data.fechaPedido);
              this.pedido.fechaEstimadaEntrega = new Date(data.fechaEstimadaEntrega);
              this.setEstado(this.pedido.estado);
              this.setCliente(this.pedido.clienteId);
              this.compararFechas();
              this.calcularSubTotalYMontoTotal();
            });
        }
      });
  }

  calcularSubTotalYMontoTotal() {
    let auxSubTotal = 0;
    // console.log(this.detalles);
    for (let i = 0; i < this.detalles.length; i++) {
      auxSubTotal += this.detalles[i].subTotal;
    }
    this.pedido.subTotal = auxSubTotal;
    this.calcularMontoTotal();
  }

  calcularMontoTotal() {
    this.pedido.montoTotal = this.pedido.gastosEnvio + this.pedido.subTotal;
  }

  public guardar() {
    // INSERTANDO

    this.pedido.clienteId = this.getCliente.id;
    this.pedido.domicilioId = this.getCliente.domicilioId;
    if (this.id === "new") {
      console.log(this.pedido);
      this.pedidosService.create(this.pedido)
        .subscribe(data => {
          console.log("Pedido creado");
          this.pedidosService.getAll()
            .subscribe(allPedidos => {
              this.calcularSaldo(allPedidos);
              this.clienteService.update(this.getCliente, this.getCliente.id.toString())
                .subscribe(() => {
                  this.pedidosService.createDetalles(data.id, this.detalles)
                    .subscribe(() => this.router.navigate(['/pedidos'], { replaceUrl: true }))
                });
            });
        });;
    } else {
      // ACTUALIZANDO
      console.log("PARA ACTUALIZAR", this.pedido);
      this.pedidosService.update(this.pedido, this.id)
        .subscribe(data => {
          console.log("ACTUALIZADO");

          this.pedidosService.getAll({ where: { clienteId: this.getCliente.id } })
            .subscribe(allPedidos => {
              console.log(allPedidos)
              this.calcularSaldo(allPedidos);
              this.clienteService.update(this.getCliente, this.getCliente.id.toString())
                .subscribe(() => {
                  for (let i = 0; i < this.detalles.length; i++) {
                    this.pedidosService.updateDetalles(this.detalles[i])
                      .subscribe(() => {
                        this.router.navigate(['/pedidos'], { replaceUrl: true });
                      }, error => console.log(error));
                  }
                });
            });

        }, error => console.log(error));
    }
  }

  calcularSaldo(allPedidos: Pedidoventa[]) {
    let total = 0
    for (let i = 0; i < allPedidos.length; i++) {
      if (allPedidos[i].estado == "Pendiente" || allPedidos[i].estado == "Enviado") {
        total = total + allPedidos[i].montoTotal;
      }
    }
    this.getCliente.saldo = total * -1;
  }

  onCustomFechaPedido(event) {
    if (event.value instanceof Date) {
      this.dfechaPedido = event.value;
      this.compararFechas();
    }
  }

  seeCalendar(v: boolean) {
    this.showCalendar = v;
  }

  onCustomFechaEntrega(event) {
    if (event.value instanceof Date) {
      this.dfechaEntrega = event.value;
      this.compararFechas();
    }
  }

  seeCalendar2(v: boolean) {
    this.showCalendar2 = v;
  }

  selectChangeEstado() {
    // console.log(this.estado);
    this.pedido.estado = this.getEstado;
    if (this.getEstado == "Entregado") {
      this.pedido.entregado = 1;
    } else {
      this.pedido.entregado = 0;
    }
  }

  selectChangeCliente() {
    // console.log(this.estado);
    this.pedido.estado = this.getEstado;
    // if (this.estado == "Entregado") {
    //   this.forma.get('entregado').setValue(true);
    // } else {
    //   this.forma.get('entregado').setValue(false);
    // }
  }

  get getEstado(): string {
    return this.forma ? this.forma.get('estado').value : '';
  }

  private setEstado(estado: string) {
    if (estado != null) {
      this.forma.get('estado').setValue(estado);
    } else {
      this.forma.get('estado').setValue(null);
    }
  }

  get getCliente(): Cliente {
    let value = this.forma ? this.forma.get('cliente').value : '';
    let cliente = this.clientes.find(x => x.razonSocial == value);
    return cliente;
  }

  private setCliente(idCliente: number) {
    // console.log(idCliente);
    if (idCliente != null) {
      let cliente = this.clientes.find(x => x.id == idCliente);
      this.forma.get('cliente').setValue(cliente.razonSocial);
    } else {
      this.forma.get('cliente').setValue(null);
    }
  }

  private compararFechas() {
    let number = DatesExtension.compareDate(this.dfechaPedido, this.dfechaEntrega);
    this.isBigger = (number === -1);
  }

}
