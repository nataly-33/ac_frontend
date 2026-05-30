import { Component, Input } from '@angular/core';
import { LucideAngularModule, Brain, RotateCcw, Loader } from 'lucide-angular';
import { DatosLocalesService } from '../../../core/services/datos-locales.service';

@Component({
  selector: 'app-gemini-panel',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './gemini-panel.html',
  styleUrl: './gemini-panel.css',
})
export class GeminiPanel {
  readonly Brain = Brain;
  readonly RotateCcw = RotateCcw;
  readonly Loader = Loader;

  @Input() municipioId!: number;
  @Input() municipioNombre!: string;

  resumen: string = '';
  loading = false;

  constructor(private readonly datos: DatosLocalesService) {}

  generarResumen(): void {
    if (this.loading) return;
    this.loading = true;
    this.resumen = '';
    this.datos.getResumenGemini(this.municipioId).subscribe({
      next: (res) => { this.resumen = res.resumen; this.loading = false; },
      error: () => { this.resumen = 'No se pudo generar el análisis. Intente nuevamente.'; this.loading = false; },
    });
  }
}
