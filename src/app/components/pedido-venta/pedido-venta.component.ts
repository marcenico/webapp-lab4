import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DomicilioService } from '../../services/domicilio.service';
import { Domicilio, Pedidoventa } from '../../shared/sdk';
import { Router } from '@angular/router';
import { PedidoVentaService } from 'src/app/services/pedido-venta.service';

@Component({
    selector: 'app-pedido-venta',
    templateUrl: './pedido-venta.component.html',
})
export class PedidoVentaComponent implements OnInit {

    pedidosDomicilio: Domicilio[] = [];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dataTable: any;

    constructor(
        private pedidoVentaService: PedidoVentaService, private domicilioService: DomicilioService,
        private chRef: ChangeDetectorRef,
        private route: Router
    ) { }

    ngOnInit(): void {
        this.ArmarTabla();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    private ArmarTabla() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            processing: true,
        };
        this.dtOptions.language = Lang.lang;
        this.domicilioService.getAll({ include: 'pedido_venta' })
            .subscribe((data: Domicilio[]) => {
                //console.log("Lista de clientes", data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].pedido_venta != null) {
                        this.pedidosDomicilio[i] = data[i];
                    }
                }

                this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable({
                    language: Lang.lang,
                });
            });
    }

    borrar(domicilio: Domicilio) {
        console.log(domicilio);
        this.pedidoVentaService.delete(domicilio.pedido_venta)
            .subscribe(() => {
                this.domicilioService.delete(domicilio)
                    .subscribe(res => {
                        //this.ArmarTabla();
                        console.log(res);
                        this.deleteRow(domicilio.id);

                    }, error => console.error(error));
            }, error => console.error(error));
    }

    deleteRow(id: number) {
        for (let i = 0; i < this.pedidosDomicilio.length; ++i) {
            if (this.pedidosDomicilio[i].id === id) {
                this.pedidosDomicilio.splice(i, 1);
            }
        }
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