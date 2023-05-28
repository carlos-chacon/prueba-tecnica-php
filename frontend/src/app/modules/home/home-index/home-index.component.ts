import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Icon,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  latLng,
  tileLayer,
  Control,
} from 'leaflet';
import { CiudadInterface } from 'src/app/shared/interfaces/ciudad.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements AfterViewInit, OnInit {
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
    { name: 'Miami', latitude: 25.77093125, longitude: -80.19233518820613 },
    {
      name: 'Orlando',
      latitude: 28.537480962623437,
      longitude: -81.37744903564455,
    },
    {
      name: 'New York',
      latitude: 40.705216050000004,
      longitude: -73.99575931949556,
    },
  ];

  customControl = new CustomInfoControl('');

  constructor(private apiService: ApiService, private hs: HeaderService) {}

  ngOnInit(): void {
    this.hs.titleHeader.emit('Humedad por Ciudad');
    this.hs.descriptionHeader
      .emit(`En el mapa mostrara la Humedad de las ciudades: Miami, Orlando y New York. Al darle click sobre el marcador se puede observar algunos detalles del clima.
    También al darle click sobre alguna zona del mapa mostrara algunos datos como Humedad, Temperatura y una pequeña descripción del clima.`);
  }

  ngAfterViewInit(): void {}

  onMapReady(map: Map) {
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

    this.customControl.addTo(this.map);

    this.cities.forEach((city) => {
      this.apiService
        .getObs(
          `/v1/ciudades/obtener-humedad/${city.latitude}/${city.longitude}`
        )
        .subscribe({
          next: (resp: any) => {
            const markerCity = new Marker(
              latLng(city.latitude, city.longitude),
              {
                icon: icon(iconMarker),
              },
            ).addTo(this.map);
            markerCity.bindPopup(this.getHtmlPopup(resp));
            this.customControl.update({
              name: city.name,
              humidity: resp.current.humidity,
            });
          },
          error: (err) => {},
        });
    });
  }

  onMapClick(event: LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    this.marker.setLatLng(latLng(lat, lng));
    this.marker.bindPopup(this.getHtmlPopup()).openPopup();
    this.apiService
      .getObs(`/v1/ciudades/obtener-humedad/${lat}/${lng}`)
      .subscribe({
        next: (resp: any) => {
          this.marker.bindPopup(this.getHtmlPopup(resp)).openPopup();
        },
        error: (err) => {},
      });
  }

  getHtmlPopup(props?: CiudadInterface) {
    if (!props) return '<div class="animate-pulse">cargando...</div>';

    return `
    <ul class="list-none list-inside">
      <li class="mb-1 font-bold">${props?.address}</li>
      <li class="mb-1 font-bold">Humedad: ${props?.current.humidity}%</li>
      <li class="mb-1">Temperatura: ${props?.current.temp} °C</li>
      <li class="mb-1">
        <div class="flex gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full" src="https://openweathermap.org/img/w/${props?.current.weather[0].icon}.png" alt="">
          <div class="min-w-0 flex-auto inline-block">
            <p class="">${props?.current.weather[0].description}</p>
          </div>
        </div>
      </li>
    </ul>
    `;
  }
}

export class CustomInfoControl extends Control {
  controlDiv = document.createElement('div');
  constructor(private infoText: string) {
    super({ position: 'topright' });
    this.controlDiv.className = 'bg-white p-2';
  }

  override onAdd(map: Map): HTMLElement {
    this.controlDiv.innerHTML =
      '<h4 class="font-bold">Humedad por ciudad:</h4>';
    this.update();
    return this.controlDiv;
  }

  update(props?: any) {
    this.controlDiv.innerHTML += props
      ? '<b>' + props.name + ': </b>' + props.humidity + ' % <br />'
      : '';
  }
}
