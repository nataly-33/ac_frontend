import { Component, Input } from '@angular/core';
import { Alerta } from '../../../core/models/municipio.model';

@Component({
  selector: 'app-alerta-card',
  standalone: true,
  imports: [],
  templateUrl: './alerta-card.html',
  styleUrl: './alerta-card.css',
})
export class AlertaCard {
  @Input() alerta!: Alerta;

  get isCritica(): boolean {
    return this.alerta?.severidad === 'critical';
  }

  get tipoIcono(): string {
    const map: Record<string, string> = {
      sequia: '🏜️',
      sobreextraccion: '⛽',
      contaminacion: '⚠️',
    };
    return map[this.alerta?.tipo] || '🔔';
  }
}
