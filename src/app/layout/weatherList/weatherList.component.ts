import { Component, HostListener, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { CUSTOMERS } from '../../customers';
@Component({
    selector: 'app-weatherList',
    templateUrl: './weatherList.component.html',
    styleUrls: ['./weatherList.component.scss'],
    animations: [routerTransition()]
})
export class WeatherListComponent implements OnInit {
    selectedCity?: WeatherListComponent;
    items = [];
    pageOfItems: Array<any>;
    hourlyData: any[] = [];
    lat: number;
    lon:number;


    constructor(private http: HttpClient) { }
    public isFullListDisplayed: boolean = false;

    //default weather List
    ngOnInit() {
        this.http.get<any>('https://5c002505-2294-4571-a09f-187f73da9721.mock.pstmn.io/weatherList').subscribe(data => {
            this.pageOfItems = data;
        })
    }

    //show selected location hourly and daily data
    onSelect(customer: WeatherListComponent,option): void {
        this.selectedCity = customer;
        if(option == 'Hourly'){
         this.http.get<any>('https://api.openweathermap.org/data/2.5/onecall?lat='+this.selectedCity.lat+'&lon='+this.selectedCity.lon+'&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
            this.hourlyData = data.hourly;
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
            this.http.get<any>('https://api.openweathermap.org/data/2.5/onecall?lat='+this.selectedCity.lat+'&lon='+this.selectedCity.lon+'&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
            this.hourlyData = data.daily;
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
