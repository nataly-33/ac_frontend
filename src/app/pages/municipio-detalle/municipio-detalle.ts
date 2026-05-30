import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, TriangleAlert, TrendingDown, Droplets, CloudRain } from 'lucide-angular';
import { DatosLocalesService } from '../../core/services/datos-locales.service';
import { Municipio, Prediccion } from '../../core/models/municipio.model';
import { GraficoTendencia } from '../../shared/components/grafico-tendencia/grafico-tendencia';
import { GeminiPanel } from '../../shared/components/gemini-panel/gemini-panel';

@Component({
  selector: 'app-municipio-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, GraficoTendencia, GeminiPanel],
  templateUrl: './municipio-detalle.html',
  styleUrl: './municipio-detalle.css',
})
export class MunicipioDetalle implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly TriangleAlert = TriangleAlert;
  readonly TrendingDown = TrendingDown;
  readonly Droplets = Droplets;
  readonly CloudRain = CloudRain;

  municipio: Municipio | null = null;
  prediccion: Prediccion | null = null;
  loading = true;
  notFound = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly datos: DatosLocalesService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.datos.getMunicipio(id).subscribe(m => {
      if (!m) { this.notFound = true; this.loading = false; return; }
      this.municipio = m;
      this.datos.getPrediccion(id).subscribe(p => {
        this.prediccion = p || null;
        this.loading = false;
      });
    });
  }

  getRiesgoClass(nivel: string): string {
    const map: Record<string, string> = {
      critico: 'badge-critico', alto: 'badge-alto',
      medio: 'badge-medio',    bajo: 'badge-bajo',
    };
    return map[nivel] || '';
  }

  getRiesgoColor(nivel: string): string {
    const map: Record<string, string> = {
      critico: '#dc2626', alto: '#f59e0b',
      medio: '#eab308',   bajo: '#84CC16',
    };
    return map[nivel] || '#737373';
  }
}
