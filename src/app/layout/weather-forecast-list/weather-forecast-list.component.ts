import { Component, HostListener, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { WeatherService } from "../weather.service";

//import { CUSTOMERS } from '../../customers';
@Component({
    selector: 'app-weather-forecast-list',
    templateUrl: './weather-forecast-list.component.html',
    styleUrls: ['./weather-forecast-list.component.scss'],
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
        this.selectOption("Pune")
    }

    async selectOption(cityname) {
        await this.weatherService.getWeatherForecastList().then(data => {
            this.weatherForecastData = data;
            let matches = [], i;
            for (i = 0; i < this.weatherForecastData.length; i++) {
                if(this.weatherForecastData[i]["name"].includes(cityname)) {
                    matches.push(this.weatherForecastData[i]);
                }
            }
            this.weatherData = matches;
        })
    };
}
