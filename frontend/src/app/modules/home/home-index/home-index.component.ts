import { AfterViewInit, Component } from '@angular/core';
import {
  Icon,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  latLng,
  tileLayer,
  Control
} from 'leaflet';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements AfterViewInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Leaflet',
      }),
    ],
    zoom: 5,
    center: latLng(35.567980458012094, -77.16796875000001),
  };

  map!: Map;
  marker!: Marker;

  cities = [
    { name: 'Miami', latitude: 25.7824792, longitude: -80.3851769 },
    { name: 'Orlando', latitude: 28.4811202, longitude: -81.6541434 },
    { name: 'New York', latitude: 40.6976307, longitude: -74.1448305 },
  ];

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  onMapReady(map: Map) {
    console.log('onMapReady');
    const iconMarker = {
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
    };

    this.map = map;
    this.marker = new Marker(latLng(0, 0), {
      icon: icon(iconMarker),
    }).addTo(this.map);

    const control = new Control();

    this.cities.forEach((city) => {
      this.apiService
        .getObs(
          `/v1/ciudades/obtener-humedad/${city.latitude}/${city.longitude}`
        )
        .subscribe({
          next: (resp: any) => {
            console.log(resp);
            const markerCity = new Marker(
              latLng(city.latitude, city.longitude),
              {
                icon: icon(iconMarker)
              }
            ).addTo(this.map);
            markerCity.bindPopup(this.getHtmlPopup(), {keepInView: true}).openPopup();
          },
          error: (err) => {
            console.log(err);
          },
        });
    });
  }

  onMapClick(event: LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    this.marker.setLatLng(event.latlng);
    this.marker
      .bindPopup(this.getHtmlPopup())
      .openPopup();
    console.log('Latitud:', lat);
    console.log('Longitud:', lng);
  }

  getHtmlPopup() {
    return `
    <ul class="list-none list-inside">
      <li class="mb-1">Ciudad: Bucaramanga</li>
      <li class="mb-1">Humedad: 90%</li>
      <li class="mb-1">Temperatura: 20 °C</li>
      <li class="mb-1">
      <div class="flex gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full" src="https://openweathermap.org/img/w/03n.png" alt="">
        <div class="min-w-0 flex-auto">
          <p class="">nubes dispersas</p>
        </div>
      </div>
      </li>
    </ul>
    `;
  }
}

