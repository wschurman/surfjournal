import striptags from 'striptags';

import { Forecast, Report, Swell, Wave, Wind } from './Surfline';

function formatRating(rating?: string): string | null {
  return rating ? rating.toLowerCase() : null;
}

function formatWave(wave: Wave): string {
  const occString = wave.occasionalHeight ? ` occ. ${wave.occasionalHeight}` : '';
  const plusString = wave.plusHeight ? `+` : '';
  return `${wave.minHeight}-${wave.maxHeight}ft${occString}${plusString}`;
}

function formatTide(tide: { type: string }): string {
  return `Tide: ${tide.type.toLowerCase()}`;
}

function formatWind(wind: Wind): string {
  return `Wind: ${wind.speed}kts, ${wind.direction}°`;
}

function formatPrimarySwell(swell: Swell): string {
  return `Primary Swell: ${swell.height}ft at ${swell.period}s ${swell.direction}`;
}

export function formatForecast(forecast: Forecast): string {
  const { wave, wind, rating, tide, primarySwell } = forecast;
  return [
    formatRating(rating),
    formatWave(wave),
    formatTide(tide),
    formatWind(wind),
    formatPrimarySwell(primarySwell),
  ]
    .filter((a) => a)
    .join('\n');
}

export function formatReport(report: Report): string {
  return formatForecast(report.forecast);
}

export function formatFullReport(report: Report): string {
  const { wave, wind, rating, tide, primarySwell } = report.forecast;
  return [
    formatRating(rating),
    formatWave(wave),
    formatTide(tide),
    formatWind(wind),
    formatPrimarySwell(primarySwell),
    '',
    report.report.body ? striptags(report.report.body) : '',
  ]
    .filter((a) => a !== null)
    .join('\n');
}
