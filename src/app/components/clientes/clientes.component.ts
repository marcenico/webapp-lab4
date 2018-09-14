import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../services/clientes.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, OnDestroy {

    clientes: any[] = [];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    constructor(private clientService: ClienteService) { }

    ngOnInit(): void {

        this.dtOptions = {
            pagingType: 'full_numbers',
            processing: true,
        };

        this.clientService.getAll()
            .subscribe((data: any[]) => {
                this.clientes = data;
                this.dtTrigger.next();
            })
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}
