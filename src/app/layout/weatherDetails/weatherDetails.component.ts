import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from "../weather.service";

@Component({
    selector: 'app-form',
    templateUrl: './weatherDetails.component.html',
    styleUrls: ['./weatherDetails.component.scss'],
    animations: [routerTransition()]
})
export class WeatherDetailsComponent implements OnInit {
    public weatherForecastData: any;
    public weatherData: any;
    public cityname;
    constructor(private weatherService: WeatherService,private route: ActivatedRoute) {}

    //show details of weather forecast using city id
    ngOnInit() {
        let cityname = this.route.snapshot.paramMap.get('name');
        this.cityname = cityname;
        this.selectOption(cityname)
    }

    selectOption(cityname) {
        this.weatherService.getWeatherForecastList().subscribe(data => {
            const mappeddata = Object.keys(data).map(key => (data[key]));
            let matches = [], i;
            for (i = 0; i < mappeddata.length; i++) {
                if(mappeddata[i]["name"].includes(cityname)) {
                    matches.push(mappeddata[i]);
                }
            }
            this.weatherData = matches;
        })

      };
}
