import { Component, OnInit, ChangeDetectorRef, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Pedidoventadetalle, Articulo, Pedidoventa } from 'src/app/shared/sdk';
import { PedidosDetalleService } from 'src/app/services/pedidos-detalle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { StringsRegex } from 'src/app/wrappers/StringsRegex';
import { ArticulosService } from 'src/app/services/articulos.service';
import { TouchSequence, EventEmitter } from 'selenium-webdriver';
import { ThrowStmt } from '@angular/compiler';
import { PedidosComponent } from '../pedidos.component';
import { PedidoComponent } from '../pedido/pedido.component';

@Component({
    selector: 'app-detalle-pedido',
    templateUrl: './detalle-pedido.component.html',
})
export class DetallePedidoComponent implements OnInit {

    dForma: FormGroup;
    tieneDetalle: boolean = false;
    showForm: boolean = false;
    id: string;
    updateId: string = '';

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dataTable: any;

    detalles: Array<Pedidoventadetalle> = [];
    action: string;
    private articulos: Articulo[] = [];
    private detalle: Pedidoventadetalle;
    private aux: Pedidoventadetalle = new Pedidoventadetalle();

    @ViewChild("pedido") pedido: PedidoComponent;


    constructor(private articuloService: ArticulosService, private detalleService: PedidosDetalleService, private router: Router, private route: ActivatedRoute, private chRef: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.route.params
            .subscribe(parametros => {

                this.articuloService.getAll()
                    .subscribe(data => this.articulos = data);

                this.id = parametros['id'];
                if (this.id === "new") {
                    this.setDefaultForm();
                    this.armarTabla();
                    this.validarFormulario();
                    this.action = "Generar Pedido";
                } else {
                    this.action = "Actualizar Pedido";
                    this.detalleService.getAllById(parseInt(this.id))
                        .subscribe(data => {
                            console.log(data);
                            this.detalles = data;
                            this.armarTabla();
                        });
                    this.validarFormulario();
                }
            });
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    private validarFormulario() {
        this.dForma = new FormGroup({
            cantidad: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.greaterThanZero)]),
            descuento: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.percentage)]),
            subTotal: new FormControl('', [Validators.required]),
            articulo: new FormControl('', [Validators.required])

        })
    }

    private armarTabla() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            processing: true,
        };
        this.dtOptions.language = Lang.lang;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
            language: Lang.lang,
        });
    }

    selectChange() {
        // console.log(this.estado);
        this.detalle.articuloId = this.getArticulo.id;
        this.calculateSubtotal();
    }

    get getArticulo(): Articulo {
        let value = this.dForma ? this.dForma.get('articulo').value : '';
        let articulo = this.articulos.find(x => x.denominacion == value);
        return articulo;
    }

    private setSelectedArticulo(articulo: Articulo) {
        if (articulo != null) {
            this.dForma.get('articulo').setValue(articulo.denominacion);
        } else {
            this.dForma.get('articulo').setValue(null);
        }
    }

    seeForm(v: boolean) {
        this.showForm = v;
        this.setDefaultForm();
        this.setSelectedArticulo(null);

    }

    setDefaultForm() {
        this.detalle = new Pedidoventadetalle();
        this.detalle.cantidad = 1;
        this.detalle.subTotal = 0;
        this.detalle.porcentajeDescuento = 0;
        this.updateId = '';
    }

    setFormValues(data: Pedidoventadetalle) {
        console.log(data);
        this.updateId = data.id.toString();
        this.dForma.get('cantidad').setValue(data.cantidad);
        this.dForma.get('descuento').setValue(data.porcentajeDescuento);
        this.dForma.get('subTotal').setValue(data.subTotal);
        this.setSelectedArticulo(data.articulo);
        this.detalle = data;
    }

    calculateSubtotal() {
        // console.log(this.getArticulo);
        if (this.getArticulo == null) return;
        let subTotal = 0;
        this.detalle.articulo = this.getArticulo;
        let cantidad = this.detalle.cantidad
        let articulo = this.detalle.articulo;
        let precio = articulo.precioVenta + (articulo.precioVenta * articulo.iva);
        // console.log("precio ", precio);
        let descuento = precio * (this.detalle.porcentajeDescuento / 100);
        // console.log("descuento ", descuento);
        subTotal = (cantidad * precio) - descuento;
        // console.log("subTotal ", subTotal);
        this.detalle.subTotal = subTotal;
    }

    addDetalle() {
        if (this.updateId != '') {
            this.aux = this.detalles.find(x => x.id == parseInt(this.updateId));
            let index = this.detalles.indexOf(this.aux);
            this.detalle.id = parseInt(this.updateId);
            this.detalles[index] = this.detalle;
        } else {
            this.detalle.id = this.detalles.length + 1;
            this.detalles.push(this.detalle);
        }
        this.seeForm(false);
        this.updateId = '';
        console.log(this.detalles);
    }

    deleteRow(detalle: Pedidoventadetalle) {
        for (let i = 0; i < this.detalles.length; ++i) {
            if (this.detalles[i].id === detalle.id) {
                this.detalles.splice(i, 1);
            }
        }

        if (this.detalles.length <= 0) this.tieneDetalle = false;
    }

    editRow(refDetalle: Pedidoventadetalle) {
        this.seeForm(true);
        this.aux = refDetalle;
        this.setFormValues(this.aux);
    }

    cancel() {
        this.detalle = this.aux;
        this.seeForm(false);
    }

    generatePedido() {
        this.tieneDetalle = true;
        if (this.pedido != null) {
            this.pedido.armarPedido();
        }
    }

    volver() {
        this.router.navigate(['/pedidos'], { replaceUrl: true });
    }
}

class Lang {
    static lang: any = {
        "lengthMenu": "Mostrando _MENU_ registros por pagina",
        "zeroRecords": "No hay registros",
        "info": "Mostrando _PAGE_ de _PAGES_ paginas",
        "infoEmpty": "No hay registros",
        "search": "Buscar:",
        "infoFiltered": "(Filtrado de _MAX_ total de registros)"
    }
}
