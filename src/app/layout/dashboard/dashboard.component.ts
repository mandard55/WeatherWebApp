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
    defaultCity:any;
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
    async getDefaultLocationData(){
         await this.weatherService.getWeatherSearchByCity(1259229).then(res=>{
            this.defaultCity = res;
            console.log("this.defaultCity",this.defaultCity);
            this.weather = this.defaultCity["weather"][0];
            var d = new Date();
            this.Date = d.toDateString();
            this.temprature =  this.defaultCity["main"];
            this.temp = (this.temprature.temp - 273.15).toFixed(0)
        });
    }

    //get city info search by user
    async SearchCityTemp(){
        var cityname = (<HTMLInputElement>document.getElementById('cityname')).value;
        if(cityname != ''){
            let cityid = this.searchFromArray(this.userData, cityname);
            await this.weatherService.getWeatherSearchByCity(cityid[0]["id"]).then(res=>{
                this.defaultCity = res;
                this.weather =  this.defaultCity["weather"][0];
                var d = new Date();
                this.Date = d.toDateString();
                this.temprature =   this.defaultCity["main"];
                this.temp = (this.temprature.temp - 273.15).toFixed(0)
                this.lat = cityid[0]["lat"] ;
                this.lon = cityid[0]["lon"] ;
                this.selectOption("Hourly");
            });
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
        console.log("matches",matches);
        return matches;
      };

    //select Auto Complete list city name
    SelectItem(item) {
        (<HTMLInputElement>document.getElementById("cityname")).value = item;
          this.citynames =[];
    }

    //Show hourly and daily filter data
    async selectOption(option)
    {
        if(option == 'Hourly'){
            await this.weatherService.getWeatherHourlyandDaily(this.lat,this.lon).then(
               data =>{
                this.hourlyData = data["hourly"];
                let hourlyData = [], i;
                for (i = 0; i < 8; i++) {
                    var date = new Date(this.hourlyData[i]["dt"] * 1000);
                    var temp = (this.hourlyData[i]["temp"] - 273.15).toFixed(0)
                    hourlyData.push({time:date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),temp:temp+"°C"});
                }
                this.hourlyData = hourlyData;
               });
        }
        else
        {
            await this.weatherService.getWeatherHourlyandDaily(this.lat,this.lon).then(
                data =>{
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
            });
        }
    }
}
