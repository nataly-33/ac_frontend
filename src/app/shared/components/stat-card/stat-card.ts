import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() valor: string | number = '';
  @Input() etiqueta: string = '';
  @Input() color: string = 'var(--color-accent)';
  @Input() icono: string = '';
}
