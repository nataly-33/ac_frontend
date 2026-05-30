import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../core/services/api';
import { Municipio, Alerta } from '../../core/models/municipio.model';
import { StatCard } from '../../shared/components/stat-card/stat-card';
import { AlertaCard } from '../../shared/components/alerta-card/alerta-card';
import { MapaScz } from '../../shared/components/mapa-scz/mapa-scz';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, StatCard, AlertaCard, MapaScz, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  municipios: Municipio[] = [];
  alertas: Alerta[] = [];
  loading = true;
  errorConexion = false;

  constructor(private api: Api, private router: Router) {}

  ngOnInit(): void {
    this.api.getMunicipios().subscribe({
      next: (data) => { this.municipios = data; this.loading = false; },
      error: () => { this.loading = false; this.errorConexion = true; }
    });
    this.api.getAlertas().subscribe({
      next: (data) => { this.alertas = data; },
      error: () => {}
    });
  }

  get criticosCount(): number {
    return this.municipios.filter(m => m.nivel_riesgo === 'critico').length;
  }

  get altosCount(): number {
    return this.municipios.filter(m => m.nivel_riesgo === 'alto').length;
  }

  get alertasCriticasCount(): number {
    return this.alertas.filter(a => a.severidad === 'critical').length;
  }

  get scorePromedio(): string {
    if (!this.municipios.length) return '—';
    const avg = this.municipios.reduce((sum, m) => sum + m.score_riesgo, 0) / this.municipios.length;
    return (avg * 100).toFixed(0) + '/100';
  }

  irAMunicipio(municipio: Municipio): void {
    this.router.navigate(['/municipio', municipio.id]);
  }
}
