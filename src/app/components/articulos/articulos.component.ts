import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Articulo } from 'src/app/shared/sdk';
import { Subject } from 'rxjs';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  })
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  rubrosPadre: Array<String> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;

  constructor(
    private articuloService: ArticulosService, private chRef: ChangeDetectorRef,
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
    // { include: 'rubroPadre' }
    this.articuloService.getAll({ include: 'rubro' })
      .subscribe((data: Articulo[]) => {
        console.log("Lista de articulos", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i] != null) {
            this.articulos[i] = data[i];
          }
        }

        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          language: Lang.lang,
        });

      });
  }

  borrar(articulo: Articulo) {
    console.log(articulo);
    this.articuloService.delete(articulo)
      .subscribe(res => {
        console.log(res);
        this.deleteRow(articulo.id);

      }, error => console.error(error));
  }

  deleteRow(id: number) {
    for (let i = 0; i < this.articulos.length; ++i) {
      if (this.articulos[i].id === id) {
        this.articulos.splice(i, 1);
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
