import { Component, HostListener, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { WeatherService } from "../weather.service";
@Component({
    selector: 'app-weatherList',
    templateUrl: './weatherList.component.html',
    styleUrls: ['./weatherList.component.scss'],
    animations: [routerTransition()]
})
export class WeatherListComponent implements OnInit {
    selectedCity?: WeatherListComponent;
    items : any;
    public pageOfItems: any;
    public hourlyData: any;
    lat: number;
    lon:number;
    throttle = 300;
    scrollDistance = 0.2;
    private noOfItemsToShowInitially: number = 5;
    private itemsToLoad: number = 5;

    constructor(private weatherService: WeatherService) { }
    public isFullListDisplayed: boolean = false;

    ngOnInit() {
       this.getWeatherList();
    }

    //get weather list
    getWeatherList(){
        this.weatherService.getWeatherList().subscribe(data => {
            this.items = data;
            const mappeddata = Object.keys(data).map(key => (data[key]));
            this.pageOfItems = mappeddata.slice(0, this.noOfItemsToShowInitially)
        })
    }

    //Pagination to load data when scroll end
    onScroll() {
        if (this.noOfItemsToShowInitially <= this.items.length) {
            this.noOfItemsToShowInitially += this.itemsToLoad;
            this.pageOfItems = this.items.slice(0, this.noOfItemsToShowInitially);
            console.log("scrolled");
        } else {
            this.isFullListDisplayed = true;
        }
    }

    //show selected location hourly and daily data
    onSelect(city: WeatherListComponent,option): void {
        this.selectedCity = city;
        if(option == 'Hourly'){
            this.weatherService.getWeatherHourlyandDaily(this.selectedCity.lat,this.selectedCity.lon).subscribe(data => {
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
        else{
            this.weatherService.getWeatherHourlyandDaily(this.selectedCity.lat,this.selectedCity.lon).subscribe(data => {
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
