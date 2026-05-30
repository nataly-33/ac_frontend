import { Component, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-tendencia',
  standalone: true,
  imports: [],
  templateUrl: './grafico-tendencia.html',
  styleUrl: './grafico-tendencia.css',
})
export class GraficoTendencia implements AfterViewInit, OnDestroy {
  @Input() proyeccion: number[] = [];
  @Input() precipitacion: number[] = [];

  @ViewChild('chartCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.crearGrafico(), 0);
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private crearGrafico(): void {
    if (!this.canvasRef?.nativeElement) return;
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const meses = ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'];

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Nivel freático (%)',
            data: this.proyeccion,
            borderColor: '#84CC16',
            backgroundColor: 'rgba(132,204,22,0.08)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
            pointBackgroundColor: '#84CC16',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'Precipitación (mm)',
            data: this.precipitacion,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245,158,11,0.06)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            yAxisID: 'y1',
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#737373',
              font: { family: 'Poppins', size: 11 },
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 8,
            },
          },
          tooltip: {
            backgroundColor: '#262626',
            titleColor: '#F9FAF7',
            bodyColor: '#E5E5E5',
            borderColor: '#E5E5E5',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: { color: '#E5E5E5' },
            ticks: { color: '#737373', font: { family: 'Poppins', size: 11 } },
            border: { color: '#E5E5E5' },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'Nivel freático (%)', color: '#84CC16', font: { size: 11, family: 'Poppins' } },
            grid: { color: '#E5E5E5' },
            ticks: { color: '#737373', font: { family: 'Poppins', size: 11 } },
            border: { color: '#E5E5E5' },
            min: 0, max: 100,
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: { display: true, text: 'Precipitación (mm)', color: '#f59e0b', font: { size: 11, family: 'Poppins' } },
            grid: { drawOnChartArea: false },
            ticks: { color: '#737373', font: { family: 'Poppins', size: 11 } },
            border: { color: '#E5E5E5' },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }
}
