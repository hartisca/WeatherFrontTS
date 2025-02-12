export interface HourlyData {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  conditions: string;
  icon: string;
  precipprob: number;  
}

export interface DayData {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  humidity: number;
  windgust: number;
  windspeed: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  conditions: string;
  icon: string;
  hours: HourlyData[];
}

export interface CurrentConditions {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  conditions: string;
  icon: string;
}

export interface WeatherResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: DayData[];
  currentConditions: CurrentConditions;
}
