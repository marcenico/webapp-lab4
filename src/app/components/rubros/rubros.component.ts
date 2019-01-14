import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Rubro } from 'src/app/shared/sdk';
import { Subject, from } from 'rxjs';
import { RubroService } from 'src/app/services/rubro.service';
import { Router } from '@angular/router';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubros.component.html',
})
export class RubrosComponent implements OnInit {
  rubros: Rubro[] = [];
  rubrosPadre: Array<String> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;

  constructor(
    private rubroService: RubroService, private chRef: ChangeDetectorRef,
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
    this.rubroService.getAll({ include: 'rubroPadre' })
      .subscribe((data: Rubro[]) => {
        console.log("Lista de rubros", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i] != null) {
            this.rubros[i] = data[i];
          }
        }

        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          language: Lang.lang,
        });

      });
  }

  borrar(rubro: Rubro) {
    console.log(rubro);
    this.rubroService.delete(rubro)
      .subscribe(res => {
        console.log(res);
        this.deleteRow(rubro.id);

      }, error => console.error(error));
  }

  deleteRow(id: number) {
    for (let i = 0; i < this.rubros.length; ++i) {
      if (this.rubros[i].id === id) {
        this.rubros.splice(i, 1);
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
