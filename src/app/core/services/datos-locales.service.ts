import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Municipio, Prediccion, Alerta } from '../models/municipio.model';

const MUNICIPIOS: Municipio[] = [
  { id: 1, nombre: 'Santa Cruz de la Sierra', lat: -17.7833, lng: -63.1821, region: 'metropolitana', poblacion: 1453549, nivel_riesgo: 'medio', score_riesgo: 0.45 },
  { id: 2, nombre: 'Charagua', lat: -19.7833, lng: -63.2167, region: 'chaco', poblacion: 31823, nivel_riesgo: 'critico', score_riesgo: 0.91 },
  { id: 3, nombre: 'Cabezas', lat: -18.7667, lng: -63.3833, region: 'chaco', poblacion: 28450, nivel_riesgo: 'critico', score_riesgo: 0.88 },
  { id: 4, nombre: 'San Ignacio de Velasco', lat: -16.3667, lng: -60.9500, region: 'chiquitania', poblacion: 52300, nivel_riesgo: 'alto', score_riesgo: 0.72 },
  { id: 5, nombre: 'Concepción', lat: -16.1333, lng: -62.0167, region: 'chiquitania', poblacion: 39800, nivel_riesgo: 'alto', score_riesgo: 0.68 },
  { id: 6, nombre: 'San José de Chiquitos', lat: -17.8333, lng: -60.7500, region: 'chiquitania', poblacion: 47200, nivel_riesgo: 'alto', score_riesgo: 0.71 },
  { id: 7, nombre: 'Montero', lat: -17.3333, lng: -63.2500, region: 'norte_integrado', poblacion: 109800, nivel_riesgo: 'medio', score_riesgo: 0.52 },
  { id: 8, nombre: 'Warnes', lat: -17.5000, lng: -63.1667, region: 'norte_integrado', poblacion: 91200, nivel_riesgo: 'medio', score_riesgo: 0.48 },
  { id: 9, nombre: 'Mineros', lat: -17.1167, lng: -63.0833, region: 'norte_integrado', poblacion: 79300, nivel_riesgo: 'bajo', score_riesgo: 0.28 },
  { id: 10, nombre: 'Camiri', lat: -20.0333, lng: -63.5167, region: 'chaco', poblacion: 43200, nivel_riesgo: 'critico', score_riesgo: 0.85 },
  { id: 11, nombre: 'Portachuelo', lat: -17.3500, lng: -63.3833, region: 'norte_integrado', poblacion: 45600, nivel_riesgo: 'bajo', score_riesgo: 0.22 },
  { id: 12, nombre: 'San Ramón', lat: -16.5667, lng: -62.5333, region: 'chiquitania', poblacion: 18900, nivel_riesgo: 'alto', score_riesgo: 0.74 },
  { id: 13, nombre: 'Vallegrande', lat: -18.4833, lng: -64.1000, region: 'vallegrande', poblacion: 32100, nivel_riesgo: 'medio', score_riesgo: 0.55 },
  { id: 14, nombre: 'Samaipata', lat: -18.1833, lng: -63.8667, region: 'vallegrande', poblacion: 14200, nivel_riesgo: 'bajo', score_riesgo: 0.31 },
  { id: 15, nombre: 'Puerto Suárez', lat: -18.9500, lng: -57.8000, region: 'pantanal', poblacion: 24700, nivel_riesgo: 'bajo', score_riesgo: 0.18 },
];

const ALERTAS: Alerta[] = [
  { id: 1, municipio_id: 2, municipio_nombre: 'Charagua', tipo: 'sequia', descripcion: 'Reservorios al 8% de capacidad. Emergencia hídrica declarada. Riesgo de colapso del suministro en 45 días.', severidad: 'critical', created_at: '2026-05-28T10:00:00Z' },
  { id: 2, municipio_id: 3, municipio_nombre: 'Cabezas', tipo: 'sequia', descripcion: 'Nivel freático descendió 12m en los últimos 6 meses. Pozos comunales en riesgo de secarse.', severidad: 'critical', created_at: '2026-05-28T10:00:00Z' },
  { id: 3, municipio_id: 10, municipio_nombre: 'Camiri', tipo: 'sobreextraccion', descripcion: 'Extracción industrial supera la recarga natural del acuífero en 340%. Alerta de sobreexplotación.', severidad: 'critical', created_at: '2026-05-28T10:00:00Z' },
  { id: 4, municipio_id: 4, municipio_nombre: 'San Ignacio de Velasco', tipo: 'sequia', descripcion: 'Precipitaciones 65% por debajo del promedio histórico. Acuífero en estrés severo.', severidad: 'warning', created_at: '2026-05-28T10:00:00Z' },
  { id: 5, municipio_id: 6, municipio_nombre: 'San José de Chiquitos', tipo: 'contaminacion', descripcion: 'Detección de nitratos por encima del límite OMS. Posible filtración agroindustrial.', severidad: 'warning', created_at: '2026-05-28T10:00:00Z' },
  { id: 6, municipio_id: 1, municipio_nombre: 'Santa Cruz de la Sierra', tipo: 'sobreextraccion', descripcion: 'Zonas de recarga en Lomas de Arena bajo presión urbanística. Monitoreo preventivo activo.', severidad: 'warning', created_at: '2026-05-28T10:00:00Z' },
];

const PREDICCIONES: Record<number, Prediccion> = {
  1:  { tendencia: 'descendente leve', meses_criticos: 18, proyeccion: [45, 43, 41, 40, 38, 37], precipitacion_historica: [120, 95, 88, 110, 72, 65] },
  2:  { tendencia: 'crítica inmediata', meses_criticos: 1, proyeccion: [8, 5, 3, 1, 0, 0], precipitacion_historica: [45, 30, 22, 18, 10, 8] },
  3:  { tendencia: 'crítica inmediata', meses_criticos: 2, proyeccion: [12, 9, 6, 3, 1, 0], precipitacion_historica: [50, 38, 30, 25, 15, 12] },
  4:  { tendencia: 'descendente severo', meses_criticos: 4, proyeccion: [28, 24, 20, 16, 12, 8], precipitacion_historica: [80, 65, 55, 48, 38, 32] },
  5:  { tendencia: 'descendente severo', meses_criticos: 5, proyeccion: [32, 28, 24, 20, 16, 12], precipitacion_historica: [85, 70, 60, 52, 42, 35] },
  6:  { tendencia: 'descendente severo', meses_criticos: 4, proyeccion: [30, 25, 21, 17, 13, 9], precipitacion_historica: [78, 63, 53, 46, 36, 30] },
  7:  { tendencia: 'estable riesgo medio', meses_criticos: 12, proyeccion: [52, 50, 48, 47, 45, 44], precipitacion_historica: [110, 95, 90, 85, 80, 78] },
  8:  { tendencia: 'estable riesgo medio', meses_criticos: 14, proyeccion: [48, 47, 45, 44, 42, 41], precipitacion_historica: [108, 93, 88, 83, 78, 75] },
  9:  { tendencia: 'estable', meses_criticos: 24, proyeccion: [72, 71, 70, 69, 68, 67], precipitacion_historica: [125, 110, 105, 100, 95, 92] },
  10: { tendencia: 'crítica inmediata', meses_criticos: 2, proyeccion: [15, 11, 7, 3, 0, 0], precipitacion_historica: [40, 28, 20, 15, 8, 5] },
  11: { tendencia: 'estable', meses_criticos: 30, proyeccion: [78, 77, 76, 75, 74, 73], precipitacion_historica: [130, 115, 110, 105, 100, 98] },
  12: { tendencia: 'descendente severo', meses_criticos: 3, proyeccion: [26, 22, 18, 14, 10, 6], precipitacion_historica: [75, 60, 50, 43, 33, 27] },
  13: { tendencia: 'estable riesgo medio', meses_criticos: 10, proyeccion: [55, 53, 51, 49, 47, 45], precipitacion_historica: [112, 97, 92, 87, 82, 79] },
  14: { tendencia: 'estable', meses_criticos: 36, proyeccion: [69, 68, 67, 66, 65, 64], precipitacion_historica: [122, 107, 102, 97, 92, 89] },
  15: { tendencia: 'estable', meses_criticos: 48, proyeccion: [85, 84, 83, 82, 81, 80], precipitacion_historica: [140, 125, 120, 115, 110, 108] },
};

const GEMINI_MOCK: Record<number, string> = {
  1: 'El acuífero de Santa Cruz de la Sierra presenta un descenso leve en su nivel freático, actualmente al 45% de su capacidad óptima. La presión urbanística sobre las zonas de recarga en Lomas de Arena es la principal amenaza. Se recomienda implementar un plan de protección de áreas de recarga y campañas de uso eficiente del agua en el área metropolitana. Proyección a 6 meses: nivel freático descenderá a 37% si no se toman medidas de conservación.',
  2: 'SITUACIÓN CRÍTICA en Charagua. Los reservorios se encuentran al 8% de capacidad, el nivel más bajo registrado en la última década. La emergencia hídrica es inminente con riesgo de colapso del suministro en los próximos 45 días. El ganado está siendo trasladado a zonas con mayor disponibilidad. Se requiere declaratoria de emergencia departamental y envío urgente de cisternas. La proyección a 6 meses indica un agotamiento total del acuífero superficial si no hay recarga por lluvias.',
  3: 'Cabezas enfrenta una crisis hídrica severa. El nivel freático ha descendido 12 metros en 6 meses, una tasa sin precedentes. Los pozos comunales están al borde de secarse completamente. La agricultura de subsistencia está en riesgo inminente. Se recomienda perforación de pozos profundos de emergencia y restricción inmediata de extracción para uso agrícola no esencial. Proyección: agotamiento de pozos someros en 60 días.',
  4: 'San Ignacio de Velasco presenta un escenario preocupante con precipitaciones 65% por debajo del promedio histórico. El acuífero de la región chiquitana está en estrés severo, afectando tanto el consumo humano como la ganadería extensiva. Se recomienda activar el comité de emergencia municipal y priorizar el uso del agua para consumo humano. La proyección a 6 meses muestra un descenso continuo a 8% de capacidad si no hay un periodo extraordinario de lluvias.',
  5: 'Concepción registra una tendencia descendente severa en su nivel freático, con 5 meses hasta alcanzar una situación crítica. Las comunidades rurales aledañas ya reportan escasez intermitente. La actividad ganadera, principal motor económico, está siendo afectada con reducción de cabezas de ganado. Se recomienda establecer puntos de distribución de agua y evaluar fuentes alternativas. Proyección: 12% de capacidad restante en 6 meses.',
  6: 'San José de Chiquitos enfrenta dos amenazas simultáneas: descenso severo del nivel freático y contaminación por nitratos que supera los límites de la OMS. La posible filtración agroindustrial requiere investigación urgente. Se recomienda análisis de agua en todos los pozos del municipio y restricción de uso de agroquímicos en zonas de recarga. Proyección: nivel freático a 9% en 6 meses si continúa la tendencia actual.',
  7: 'Montero mantiene un nivel freático en descenso moderado, actualmente al 52% de capacidad. La actividad agroindustrial del Norte Integrado ejerce presión constante sobre el acuífero. Se recomienda implementar sistemas de riego eficiente y monitoreo trimestral de niveles. Proyección a 6 meses: descenso a 44%, aún manejable con medidas de conservación adecuadas.',
  8: 'Warnes presenta un escenario de riesgo medio con tendencia estable pero con presión creciente por la expansión agrícola. El nivel freático se mantiene al 48% pero la extracción para riego aumenta cada año. Se recomienda implementar medidores de caudal en pozos industriales y promover cultivos de menor demanda hídrica. Proyección: descenso leve a 41% en 6 meses.',
  9: 'Mineros es uno de los municipios con mejor situación hídrica del departamento, con nivel freático al 72%. La recarga natural del acuífero es estable gracias a las precipitaciones regulares del Norte Integrado. Sin embargo, se recomienda mantener el monitoreo preventivo y no incrementar las concesiones de extracción. Proyección: nivel estable alrededor del 67% en 6 meses.',
  10: 'EMERGENCIA en Camiri. La extracción industrial supera la recarga natural del acuífero en un 340%, una situación insostenible. El acuífero chaqueño está siendo sobreexplotado principalmente por la industria hidrocarburífera. Se requiere intervención inmediata de la Gobernación para regular las concesiones de agua y establecer cuotas máximas de extracción. Proyección: agotamiento del acuífero aprovechable en 60 días si no se reducen las extracciones.',
  11: 'Portachuelo goza de una situación hídrica favorable con nivel freático al 78%. La recarga del acuífero es adecuada y la presión de extracción es moderada. Se recomienda mantener las prácticas actuales de manejo y fortalecer la protección de las riberas del río Piraí. Proyección: nivel estable alrededor del 73% en los próximos 6 meses.',
  12: 'San Ramón enfrenta un descenso severo con solo 3 meses hasta una situación crítica. El acuífero de la Chiquitania está en retroceso acelerado por la combinación de sequía y extracción para ganadería. Las comunidades indígenas de la zona reportan dificultades crecientes de acceso al agua. Se recomienda perforación de emergencia y cisternas para las comunidades más afectadas. Proyección: 6% de capacidad en 6 meses.',
  13: 'Vallegrande presenta un nivel freático en descenso moderado (55%). La región de los valles cruceños depende de acuíferos de recarga estacional que están siendo afectados por la variabilidad climática. La producción frutícola y hortícola requiere un plan de riego tecnificado. Se recomienda construir reservorios de cosecha de agua de lluvia. Proyección: descenso a 45% en 6 meses.',
  14: 'Samaipata mantiene una condición favorable con nivel freático al 69%. El acuífero de la región de Vallegrande se beneficia de las precipitaciones de la zona subandina. El turismo creciente debe ser acompañado de infraestructura de agua adecuada. Se recomienda planificar la capacidad hídrica antes de autorizar nuevos emprendimientos turísticos. Proyección: estable en 64% a 6 meses.',
  15: 'Puerto Suárez presenta la mejor situación hídrica del departamento con nivel freático al 85%. El acuífero del Pantanal boliviano cuenta con abundante recarga natural. Sin embargo, la navegabilidad del canal Tamengo y la actividad portuaria requieren monitoreo de calidad de agua. Se recomienda establecer una red de monitoreo de calidad para prevenir contaminación por actividad fluvial. Proyección: estable en 80% a 6 meses.',
};

@Injectable({ providedIn: 'root' })
export class DatosLocalesService {

  getMunicipios(): Observable<Municipio[]> {
    return of(MUNICIPIOS);
  }

  getMunicipio(id: number): Observable<Municipio | undefined> {
    return of(MUNICIPIOS.find(m => m.id === id));
  }

  getPrediccion(municipioId: number): Observable<Prediccion | undefined> {
    return of(PREDICCIONES[municipioId]);
  }

  getAlertas(): Observable<Alerta[]> {
    return of(ALERTAS);
  }

  getResumenGemini(municipioId: number): Observable<{ resumen: string }> {
    const texto = GEMINI_MOCK[municipioId] || 'No hay análisis disponible para este municipio.';
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next({ resumen: texto });
        subscriber.complete();
      }, 1500);
    });
  }
}
