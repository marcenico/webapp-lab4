import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Articulo, Rubro } from 'src/app/shared/sdk';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StringsRegex } from 'src/app/wrappers/StringsRegex';
import { RubroService } from 'src/app/services/rubro.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
})
export class ArticuloComponent implements OnInit {

  forma: FormGroup;
  id: string;
  accion: string;
  isNew: boolean = false;

  private articulo: Articulo = new Articulo();
  private rubros: Array<Rubro> = new Array<Rubro>();
  value: string = '';

  constructor(private articuloService: ArticulosService, private rubroService: RubroService, private router: Router, private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {
        
        this.rubroService.getAll()
          .subscribe(data => {
            this.rubros = data;
          });

        this.id = parametros['id'];
        if (this.id === "new") {
          this.accion = " Nuevo Articulo";
          this.validarFormulario();
        } else {
          this.accion = " Actualizando Articulo";
          this.validarFormulario();
          this.articuloService.getOne(parseInt(this.id))
            .subscribe(data => {
              this.articulo = data;
              console.log(data);
              this.setSelectedRubro(this.articulo.rubro);
            });
        }
      });
  }

  ngOnInit() {
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      denominacion: new FormControl('', [Validators.required]),
      precioCompra: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyFloatNumbers)]),
      precioVenta: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyFloatNumbers)]),
      iva: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyFloatNumbers)]),
      rubro: new FormControl('', [Validators.required]),
    })
  }

  public guardar() {
    // INSERTANDO
    if (this.id === "new") {
      console.log(this.articulo);
      this.articulo.createdAt = new Date();
      this.articulo.updatedAt = new Date();
      this.articuloService.create(this.articulo)
        .subscribe((articulo: Articulo) => {
          console.log("Rubro creado");
          this.router.navigate(['/articulos'], { replaceUrl: true });
        }, error => console.error(error));;
    } else {
      // ACTUALIZANDO
      this.articulo.updatedAt = new Date();
      console.log("PARA ACTUALIZAR", this.articulo);
      this.articuloService.update(this.articulo)
        .subscribe(res => {
          console.log("ACTUALIZADO", res);
          this.router.navigate(['/articulos'], { replaceUrl: true });
        }, error => console.log(error));
    }
  }

  selectChange() {
    // console.log(this.selectedRubro);
    this.articulo.rubro = this.getSelectedRubro;
    if (this.getSelectedRubro == null) {
      this.articulo.rubroId = null;
    } else {
      this.articulo.rubroId = this.getSelectedRubro.id;
    }
  }

  get getSelectedRubro(): Rubro {
    let value = this.forma ? this.forma.get('rubro').value : '';
    let rubro = this.rubros.find(x => x.denominacion == value);
    return rubro;
  }

  private setSelectedRubro(rubro: Rubro) {
    if (rubro != null) {
      console.log(rubro.denominacion);
      this.forma.get('rubro').setValue(rubro.denominacion);
    } else {
      this.forma.get('rubro').setValue(null);
    }
  }
}
