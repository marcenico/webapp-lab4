import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Pedidoventa, Cliente } from '../../shared/sdk';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html',
})
export class PedidosComponent implements OnInit {

    pedidos: Pedidoventa[] = [];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dataTable: any;
    entregado: boolean;

    constructor(
        private pedidosService: PedidosService,
        private clientesService: ClienteService,
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
        this.pedidosService.getAll()
            .subscribe((data: Pedidoventa[]) => {
                //console.log("Lista de clientes", data);         
                if (data != null) {
                    this.pedidos = data;
                }

                this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable({
                    language: Lang.lang,
                });
            });
    }

    borrar(pedido: Pedidoventa) {
        console.log(pedido);
        this.clientesService.getById(pedido.clienteId)
            .subscribe(data => {
                this.calcularSaldo(data, pedido);
                this.clientesService.update(data, data.id.toString())
                    .subscribe(() => {
                        this.pedidosService.delete(pedido)
                            .subscribe(res => {
                                // console.log(res);
                                this.deleteRow(pedido.id);
                            }, error => console.error(error));
                    });
            });
    }

    deleteRow(id: number) {
        for (let i = 0; i < this.pedidos.length; ++i) {
            if (this.pedidos[i].id === id) {
                this.pedidos.splice(i, 1);
            }
        }
    }

    calcularSaldo(cliente: Cliente, pedido: Pedidoventa) {
        cliente.saldo += pedido.montoTotal;
        if (cliente.saldo > 0) cliente.saldo = 0;
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