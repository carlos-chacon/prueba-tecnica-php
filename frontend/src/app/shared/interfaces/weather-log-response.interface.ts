export interface WeatherLogResponseInterface {
  current_page: number;
  data: WeatherLogResponseDataInterface[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: WeatherLogResponseLinkInterface[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface WeatherLogResponseLinkInterface {
  url?: string;
  label: string;
  active: boolean;
}

export interface WeatherLogResponseDataInterface {
  id: number;
  city: string;
  lat: string;
  lon: string;
  humidity: string;
  timezone: string;
  weather: WeatherResponseInterface;
  created_at: string;
  updated_at: string;
}


export interface WeatherResponseInterface {
  id: number;
  icon: string;
  main: string;
  description: string;
}
