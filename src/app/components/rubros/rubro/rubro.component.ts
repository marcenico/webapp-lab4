import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Rubro } from 'src/app/shared/sdk';
import { RubroService } from 'src/app/services/rubro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StringsRegex } from 'src/app/wrappers/StringsRegex';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
})
export class RubroComponent implements OnInit {

  forma: FormGroup;
  id: string;
  accion: string;
  isNew: boolean = false;

  private rubro: Rubro = new Rubro();
  private rubros: Array<Rubro> = new Array<Rubro>();
  value: string = '';

  constructor(private rubroService: RubroService, private router: Router, private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {

        this.rubroService.getAll()
          .subscribe(data => {
            this.rubros = data;
          });

        this.id = parametros['id'];
        if (this.id === "new") {
          this.accion = " Nuevo Rubro";
          this.validarFormulario();
        } else {
          this.accion = " Actualizando Rubro";
          this.validarFormulario();
          this.rubroService.getOneWithRubroPadre(parseInt(this.id))
            .subscribe(data => {
              this.rubro = data;
              console.log(this.rubro);
              this.setSelectedRubro(this.rubro);
            });
        }
      });
  }

  ngOnInit() {
  }

  private validarFormulario() {
    this.forma = new FormGroup({
      'codigo': new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyIntegerNumbers)]),
      'denominacion': new FormControl('', [Validators.required]),
      'rubroPadre': new FormControl('', []),
    })
  }

  public guardar() {
    // INSERTANDO
    if (this.id === "new") {
      console.log(this.rubro);
      this.rubro.createdAt = new Date();
      this.rubro.updatedAt = new Date();
      this.rubroService.create(this.rubro)
        .subscribe((rubro: Rubro) => {
          console.log("Rubro creado");
          this.router.navigate(['/rubros'], { replaceUrl: true });
        }, error => console.error(error));;
    } else {
      // ACTUALIZANDO
      this.rubro.updatedAt = new Date();
      console.log("PARA ACTUALIZAR", this.rubro);
      this.rubroService.update(this.rubro)
        .subscribe(res => {
          console.log("ACTUALIZADO", res);
          this.router.navigate(['/rubros'], { replaceUrl: true });
        }, error => console.log(error));
    }
  }

  selectChange() {
    // console.log(this.selectedRubro);
    this.rubro.rubroPadre = this.getSelectedRubro;
    if (this.getSelectedRubro == null) {
      this.rubro.rubroPadreId = null;
    } else {
      this.rubro.rubroPadreId = this.getSelectedRubro.id;
    }
  }

  get getSelectedRubro(): Rubro {
    let value = this.forma ? this.forma.get('rubroPadre').value : '';
    let rubro = this.rubros.find(x => x.denominacion == value);
    return rubro;
  }

  private setSelectedRubro(rubro: Rubro) {
    if (rubro.rubroPadreId != null) {
      this.forma.get('rubroPadre').setValue(rubro.rubroPadre.denominacion);
    } else {
      this.forma.get('rubroPadre').setValue(null);
    }
  }

}
