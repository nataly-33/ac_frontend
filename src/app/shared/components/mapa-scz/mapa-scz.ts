import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Municipio } from '../../../core/models/municipio.model';

interface LeafletModule {
  map: (id: string, options?: any) => any;
  tileLayer: (url: string, options?: any) => any;
  control: { zoom: (options?: any) => any };
  circleMarker: (latlng: [number, number], options?: any) => any;
  layerGroup: () => any;
}

@Component({
  selector: 'app-mapa-scz',
  standalone: true,
  imports: [],
  templateUrl: './mapa-scz.html',
  styleUrl: './mapa-scz.css',
})
export class MapaScz implements AfterViewInit, OnDestroy {
  @Input() municipios: Municipio[] = [];
  @Output() municipioSeleccionado = new EventEmitter<Municipio>();

  private map: any = null;
  private markersLayer: any = null;
  private haloLayer: any = null;

  private readonly colorPorRiesgo: Record<string, string> = {
    critico: '#ef4444',
    alto: '#f97316',
    medio: '#f59e0b',
    bajo: '#22c55e',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');
    setTimeout(() => this.initMap(L), 0);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(L: any): void {
    this.map = L.map('map-scz', {
      center: [-17.5, -62.0],
      zoom: 6,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © Carto',
      subdomains: 'abcd',
    }).addTo(this.map);

    L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

    this.renderMunicipios(L);
  }

  private renderMunicipios(L: any): void {
    this.markersLayer = L.layerGroup();
    this.haloLayer = L.layerGroup();

    this.municipios.forEach((m: Municipio) => {
      const color = this.colorPorRiesgo[m.nivel_riesgo] || '#38bdf8';
      const esCritico = m.nivel_riesgo === 'critico';
      const radius = 10 + (m.score_riesgo * 8);

      if (esCritico) {
        const hallo = L.circleMarker([m.lat, m.lng], {
          radius: radius + 6,
          fillColor: color,
          color: 'transparent',
          fillOpacity: 0.2,
        });
        hallo.addTo(this.haloLayer);
      }

      const circle = L.circleMarker([m.lat, m.lng], {
        radius,
        fillColor: color,
        color: color,
        weight: esCritico ? 3 : 1,
        opacity: 0.9,
        fillOpacity: 0.75,
      });

      circle.bindTooltip(`
        <div style="font-family: 'Exo 2', sans-serif; font-size: 13px; padding: 4px 8px">
          <strong>${m.nombre}</strong><br>
          <span style="color:${color}">⬤ ${m.nivel_riesgo.toUpperCase()}</span> — ${(m.score_riesgo * 100).toFixed(0)}/100
        </div>
      `, { sticky: true });

      circle.on('click', () => this.municipioSeleccionado.emit(m));
      circle.addTo(this.markersLayer);
    });

    this.haloLayer.addTo(this.map);
    this.markersLayer.addTo(this.map);
  }
}
