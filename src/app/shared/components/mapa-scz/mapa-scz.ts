import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Municipio } from '../../../core/models/municipio.model';

@Component({
  selector: 'app-mapa-scz',
  standalone: true,
  imports: [],
  templateUrl: './mapa-scz.html',
  styleUrl: './mapa-scz.css',
})
export class MapaScz {
  @Input() municipios: Municipio[] = [];
  @Output() municipioSeleccionado = new EventEmitter<Municipio>();
}
