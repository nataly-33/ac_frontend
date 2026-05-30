<<<<<<< Updated upstream
import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, afterNextRender } from '@angular/core';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
export class MapaScz implements AfterViewInit, OnDestroy {
=======
export class MapaScz implements OnChanges {
>>>>>>> Stashed changes
  @Input() municipios: Municipio[] = [];
  @Output() municipioSeleccionado = new EventEmitter<Municipio>();

  private map: any = null;
<<<<<<< Updated upstream
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
=======
  private L: any = null;
  private markersLayer: any = null;

  private readonly colorMap: Record<string, string> = {
    critico: '#dc2626',
    alto:    '#f59e0b',
    medio:   '#eab308',
    bajo:    '#84CC16',
  };

  constructor() {
    afterNextRender(async () => {
      await this.initMap();
      if (this.municipios.length) {
        this.renderMarkers();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['municipios'] && this.map && this.L) {
      this.renderMarkers();
    }
  }

  private async initMap(): Promise<void> {
    const L = await import('leaflet');
    this.L = L;

    this.map = L.map('map-scz', {
      center: [-17.5, -62],
>>>>>>> Stashed changes
      zoom: 6,
      zoomControl: false,
    });

<<<<<<< Updated upstream
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © Carto',
      subdomains: 'abcd',
=======
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">Carto</a>',
      subdomains: 'abcd',
      maxZoom: 19,
>>>>>>> Stashed changes
    }).addTo(this.map);

    L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

<<<<<<< Updated upstream
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
=======
    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  private renderMarkers(): void {
    const L = this.L;
    this.markersLayer.clearLayers();

    this.municipios.forEach(m => {
      const color = this.colorMap[m.nivel_riesgo] ?? '#737373';
      const isCritico = m.nivel_riesgo === 'critico';

      const circle = L.circleMarker([m.lat, m.lng], {
        radius: 10 + m.score_riesgo * 8,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: isCritico ? 0.9 : 0.75,
      }).addTo(this.markersLayer);

      circle.bindTooltip(`
        <div style="font-family:Poppins,sans-serif;font-size:12px;padding:4px 2px;color:#262626">
          <strong>${m.nombre}</strong><br>
          <span style="color:${color};font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.04em">
            ● ${m.nivel_riesgo}
          </span>
          &nbsp;·&nbsp;${(m.score_riesgo * 100).toFixed(0)}/100
>>>>>>> Stashed changes
        </div>
      `, { sticky: true });

      circle.on('click', () => this.municipioSeleccionado.emit(m));
<<<<<<< Updated upstream
      circle.addTo(this.markersLayer);
    });

    this.haloLayer.addTo(this.map);
    this.markersLayer.addTo(this.map);
=======
    });
>>>>>>> Stashed changes
  }
}
