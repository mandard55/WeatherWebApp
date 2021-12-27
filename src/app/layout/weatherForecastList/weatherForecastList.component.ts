import { Component, HostListener, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { WeatherService } from "../weather.service";

//import { CUSTOMERS } from '../../customers';
@Component({
    selector: 'app-weatherForecastList',
    templateUrl: './weatherForecastList.component.html',
    styleUrls: ['./weatherForecastList.component.scss'],
    animations: [routerTransition()]
})
export class WeatherForecastListComponent implements OnInit {
    selectedCity?: WeatherForecastListComponent;
    items = [];
    public weatherForecastData: any;
    public weatherData: any;
    hourlyData: any[] = [];
    lat: number;
    lon:number;


    constructor(private weatherService: WeatherService) { }
    public isFullListDisplayed: boolean = false;

    //default weather forecast list posted by forecaster
    ngOnInit() {
        this.weatherService.getWeatherForecastList().subscribe(data => {
            this.weatherForecastData = data;
            this.selectOption("Pune")
            //this.weatherData = data;
        })
    }

    selectOption(cityname) {
        console.log("cityname",cityname);
        let matches = [], i;
        for (i = 0; i < this.weatherForecastData.length; i++) {
          if(this.weatherForecastData[i]["name"].includes(cityname)) {
            matches.push(this.weatherForecastData[i]);
          }
        }
        this.weatherData = matches;
      };

}
