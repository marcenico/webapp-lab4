import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DomicilioService } from '../../services/domicilio.service';
import { Domicilio } from '../../shared/sdk';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit, OnDestroy {

    clientesDomicilio: Domicilio[] = [];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dataTable: any;
    constructor(
        private domicilioService: DomicilioService, private chRef: ChangeDetectorRef
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
        this.domicilioService.getAll({ include: 'cliente_domicilio' })
            .subscribe((data: Domicilio[]) => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].cliente_domicilio != null) {
                        this.clientesDomicilio[i] = data[i];
                    }
                }

                this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable({
                    language: Lang.lang,
                });

            });
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