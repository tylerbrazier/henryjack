const MAX_LAT = 90
const MAX_LON = 180
const MIN_LAT = -MAX_LAT
const MIN_LON = -MAX_LON

export class ValidationError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ValidationError';
  }
}

export class Coordinates {
  lat: number
  lon: number

  constructor(lat: number, lon: number) {
    if (isNaN(lat) || lat > MAX_LAT || lat < MIN_LAT)
      throw new ValidationError(`${MIN_LAT} <= lat <= ${MAX_LAT}`, 400)
    if (isNaN(lon) || lon > MAX_LON || lon < MIN_LON)
      throw new ValidationError(`${MIN_LON} <= lon <= ${MAX_LON}`, 400)

    this.lat = lat
    this.lon = lon
  }
}

export interface Weather {
  current: {
    temp: number,
    weather: [{
      main: string,
      description: string,
    }]
  }
}
