import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatosLocalesService } from '../../core/services/datos-locales.service';
import { Municipio, Prediccion } from '../../core/models/municipio.model';
import { GraficoTendencia } from '../../shared/components/grafico-tendencia/grafico-tendencia';
import { GeminiPanel } from '../../shared/components/gemini-panel/gemini-panel';

@Component({
  selector: 'app-municipio-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, GraficoTendencia, GeminiPanel],
  templateUrl: './municipio-detalle.html',
  styleUrl: './municipio-detalle.css',
})
export class MunicipioDetalle implements OnInit {
  municipio: Municipio | null = null;
  prediccion: Prediccion | null = null;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private datos: DatosLocalesService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.datos.getMunicipio(id).subscribe(m => {
      if (!m) {
        this.notFound = true;
        this.loading = false;
        return;
      }
      this.municipio = m;

      this.datos.getPrediccion(id).subscribe(p => {
        this.prediccion = p || null;
        this.loading = false;
      });
    });
  }

  getRiesgoClass(nivel: string): string {
    const map: Record<string, string> = {
      critico: 'badge-critico',
      alto: 'badge-alto',
      medio: 'badge-medio',
      bajo: 'badge-bajo',
    };
    return map[nivel] || '';
  }

  getRiesgoColor(nivel: string): string {
    const map: Record<string, string> = {
      critico: '#ef4444',
      alto: '#f97316',
      medio: '#f59e0b',
      bajo: '#22c55e',
    };
    return map[nivel] || '#38bdf8';
  }
}
