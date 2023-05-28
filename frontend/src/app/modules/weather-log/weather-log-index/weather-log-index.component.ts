import { Component, OnInit } from '@angular/core';
import { WeatherLogResponseDataInterface, WeatherLogResponseInterface, WeatherLogResponseLinkInterface } from 'src/app/shared/interfaces/weather-log-response.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-weather-log-index',
  templateUrl: './weather-log-index.component.html',
  styleUrls: ['./weather-log-index.component.scss']
})
export class WeatherLogIndexComponent implements OnInit {

  dataResponseLog!: WeatherLogResponseInterface;
  logsResponse!: WeatherLogResponseDataInterface[];
  linksResponse!: WeatherLogResponseLinkInterface[];

  loading = false;

  constructor(private hs: HeaderService, private apiService: ApiService) { }

  ngOnInit(): void {
   this.hs.titleHeader.emit('Histórico de consultas');
   this.hs.descriptionHeader.emit("sdfa");

   this.getWeatherLogs();
  }

  getWeatherLogs(numPage: number | string = 1){
    this.loading = true;
    this.apiService.getObs(`/v1/ciudades/weather-log?page=${numPage}`).subscribe({
      next: (resp: any) => {
        this.dataResponseLog = resp;
        this.logsResponse = resp.data;
        this.linksResponse = resp.links;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
      }
    })
  }

  goToPage(link: WeatherLogResponseLinkInterface) {
    if(link.url) {
      console.log(link);
      const url = new URL(link.url);
      const params = url.searchParams;
      const page = params.get('page');
      if (page) {
        this.getWeatherLogs(page);
      }
      console.log(page);
    }
  }

}
