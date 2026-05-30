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

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.crearGrafico(), 0);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
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
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
            pointBackgroundColor: '#38bdf8',
            pointBorderColor: '#0a1e2e',
            pointRadius: 4,
          },
          {
            label: 'Precipitación (mm)',
            data: this.precipitacion,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            yAxisID: 'y1',
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#0a1e2e',
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
              color: '#7fa8c4',
              font: { family: 'DM Sans', size: 12 },
              padding: 16,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(10, 30, 46, 0.95)',
            titleColor: '#e2f0fb',
            bodyColor: '#7fa8c4',
            borderColor: 'rgba(56, 189, 248, 0.2)',
            borderWidth: 1,
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(56, 189, 248, 0.08)' },
            ticks: { color: '#7fa8c4', font: { size: 11 } },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Nivel freático (%)',
              color: '#38bdf8',
              font: { size: 11 },
            },
            grid: { color: 'rgba(56, 189, 248, 0.08)' },
            ticks: { color: '#7fa8c4', font: { size: 11 } },
            min: 0,
            max: 100,
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Precipitación (mm)',
              color: '#f59e0b',
              font: { size: 11 },
            },
            grid: { drawOnChartArea: false },
            ticks: { color: '#7fa8c4', font: { size: 11 } },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }
}
