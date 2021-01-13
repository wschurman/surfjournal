const BASE_URL = 'https://services.surfline.com';

export interface Spot {
  id: string;
  name: string;
  permalink: string;
}

export interface Wave {
  minHeight: number;
  maxHeight: number;
  occasionalHeight?: number;
  plusHeight: boolean;
  human: string;
}

export interface Wind {
  speed: number;
  direction: number;
}

export interface Tide {
  type: string;
}

export interface Swell {
  height: number;
  direction: number;
  period: number;
}

export interface Forecast {
  rating?: string;
  wind: Wind;
  weather: {
    temperature: number;
  };
  wave: Wave;
  tide: Tide;
  primarySwell: Swell;
}

export interface Report {
  cam: {
    cameraStillUrl?: string;
    cameraRewindClipUrl?: string;
  };
  forecast: Forecast;
  report: {
    body?: string;
  };
}

export default class Surfline {
  private static async baseFetch<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = new Error(response.statusText);
      (error as any).response = response;
      (error as any).statusCode = response.status;
      throw error;
    }

    return await response.json();
  }

  private static createParamString(params: { [key: string]: any }): string {
    return Object.keys(params)
      .filter((key) => params[key] !== undefined && params[key] !== null)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  public static async searchSpots(input: string): Promise<Spot | null> {
    const result = await this.baseFetch<any[]>(
      `/search/site?q=${input}&querySize=1&suggestionSize=1`
    );

    const hits = result[0].hits.hits;
    if (!hits.length) {
      return null;
    }

    const hit = hits[0];

    return {
      id: hit._id,
      name: hit._source.name,
      permalink: hit._source.href,
    };
  }

  private static findPrimarySwell(swells: any[]): Swell {
    return swells[0];
  }

  public static async fetchReport(spotId: string): Promise<Report> {
    const result = await this.baseFetch<any>(`/kbyg/spots/reports?spotId=${spotId}`);
    const camera = result.spot.cameras[0];
    const forecast = result.forecast;
    const report = result.report;
    return {
      cam: {
        cameraStillUrl: camera?.stillUrl,
        cameraRewindClipUrl: camera?.rewindClip,
      },
      forecast: {
        rating: forecast.conditions.value,
        wind: {
          speed: forecast.wind.speed,
          direction: forecast.wind.direction,
        },
        weather: {
          temperature: forecast.weather.temperature,
        },
        wave: {
          minHeight: forecast.waveHeight.min,
          maxHeight: forecast.waveHeight.max,
          occasionalHeight: forecast.waveHeight.occasional,
          plusHeight: forecast.waveHeight.plus,
          human: forecast.waveHeight.humanRelation,
        },
        tide: {
          type: forecast.tide.current.type,
        },
        primarySwell: Surfline.findPrimarySwell(forecast.swells),
      },
      report: {
        body: report?.body,
      },
    };
  }
}
