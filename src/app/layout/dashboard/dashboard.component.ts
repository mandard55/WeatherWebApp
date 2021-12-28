import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { WeatherService } from "../weather.service";
import {citylist} from "./citylist";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public citynames;
    public defaultCity;
    public weather;
    public temp;
    public temprature;
    public Date;
    lat: number = 13.36667;
    lon: number = 78.583328;
    userData: any[] = [];
    hourlyData: any[] = [];
    lastkeydown1: number = 0;

    constructor(private weatherService: WeatherService) {
       this.userData = citylist;
    }

    ngOnInit() {
        //For Landing page default location
        this.getDefaultLocationData();
        this.selectOption("Hourly");
    }

    //get default location data
    getDefaultLocationData(){
        this.weatherService.getWeatherSearchByCity(1259229).subscribe(data => {
            this.defaultCity = data;
            this.weather = data["weather"][0];
            var d = new Date();
            this.Date = d.toDateString();
            this.temprature =  data["main"];
            this.temp = (this.temprature.temp - 273.15).toFixed(0)
        })
    }

    //get city info search by user
    SearchCityTemp(){
        var cityname = (<HTMLInputElement>document.getElementById('cityname')).value;
        if(cityname != ''){
            let cityid = this.searchFromArray(this.userData, cityname);
            this.weatherService.getWeatherSearchByCity(cityid[0]["id"]).subscribe(data => {
                this.defaultCity = data;
                this.weather = data["weather"][0];
                var d = new Date();
                this.Date = d.toDateString();
                this.temprature =  data["main"];
                this.temp = (this.temprature.temp - 273.15).toFixed(0)
            })
            this.lat = cityid[0]["lat"] ;
            this.lon = cityid[0]["lon"] ;
            this.selectOption("Hourly");
        }
    }

    getCityIdsFirstWay($event) {
        var cityname = (<HTMLInputElement>document.getElementById('cityname')).value;
        this.citynames = [];
        if (cityname.length > 2) {
            if ($event.timeStamp - this.lastkeydown1 > 200) {
                this.citynames = this.searchFromArray(this.userData, cityname);
            }
        }
    }

    //auto complete city list name when user enter 2 letter of city name
    searchFromArray(arr, cityname) {
        cityname = cityname[0].toUpperCase() + cityname.substr(1).toLowerCase();
        let matches = [], i;
        for (i = 0; i < arr.length; i++){
            if(arr[i]["name"].includes(cityname)) {
                matches.push(arr[i]);
            }
        }
        return matches;
      };

    //select Auto Complete list city name
    SelectItem(item) {
        (<HTMLInputElement>document.getElementById("cityname")).value = item;
          this.citynames =[];
    }

    //Show hourly and daily filter data
    selectOption(option)
    {
        if(option == 'Hourly'){
            this.weatherService.getWeatherHourlyandDaily(this.lat,this.lon).subscribe(data => {
                this.hourlyData = data["hourly"];
                let hourlyData = [], i;
                for (i = 0; i < 8; i++) {
                    var date = new Date(this.hourlyData[i]["dt"] * 1000);
                    var temp = (this.hourlyData[i]["temp"] - 273.15).toFixed(0)
                    hourlyData.push({time:date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),temp:temp+"°C"});
                }
                this.hourlyData = hourlyData;
            })
        }
        else
        {
            this.weatherService.getWeatherHourlyandDaily(this.lat,this.lon).subscribe(data => {
                this.hourlyData = data["daily"];
                let hourlyData = [], i;
                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                for (i = 0; i < 8; i++) {
                    var minTemp = this.hourlyData[i]["temp"]
                    var date = new Date(this.hourlyData[i]["dt"] * 1000);
                    var min = (minTemp.min - 273.15).toFixed(0)
                    var max = (minTemp.max - 273.15).toFixed(0)
                    hourlyData.push({time:days[date.getDay()]+" "+ date.getUTCFullYear(),minTemp:min+'°C '+max+'°C',});
                }
                this.hourlyData = hourlyData;
            })
        }
    }
}
