import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public cityList1;
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

    //city names list for AutoComplete
    public citylist = [
        {id: 1259229, name: 'Pune' ,"lon": 78.583328, "lat": 13.36667},
        {id: 1275339,name: 'Mumbai',"lon": 72.8479, "lat": 19.0144 },
        {id: 1275004,  name: 'Kolkata' ,"lon": 73.762589, "lat": 15.51807},
        {id: 1262180, name: 'Nagpur', "lon": 81.133331, "lat": 26.6166 },
        {id: 1257055, name: 'Satara' , "lon": 80.833336, "lat": 24.583332},
        {id: 1957309, name: 'Sangali' , "lon": 122.161392, "lat": 7.03222},
        {id: 1277333, name: 'Bengaluru', "lon": 78.23333, "lat": 15.31667 },
        {id: 1259223, name: 'Punjab', "lon": 77.199997, "lat": 11.35 },
        {id: 1261731, name: 'Nashik' , "lon": 74.73333, "lat": 26.299999},
        {id: 1262253, name: 'Nagar' , "lon": 77.166672, "lat": 32.116669},
        {id: 1266285, name: 'Kolhāpur', "lon": 77.116669, "lat": 12.15 },
      ];

    constructor(private http: HttpClient) {
       this.userData = this.citylist;
    }

    ngOnInit() {
        //For Landing page default location
        this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?id=1259229&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
            this.defaultCity = data;
            this.weather = data.weather[0];
            var d = new Date();
            this.Date = d.toDateString();
            this.temprature =  data.main;
            this.temp = (this.temprature.temp - 273.15).toFixed(0)
        })
        this.selectOption("Hourly");
    }

    //get city info search by user
    SearchCityTemp(){
        var cityname = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
        if(cityname != ''){
            let cityid = this.searchFromArray(this.userData, cityname);
            this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?id='+cityid[0]["id"]+'&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
                this.defaultCity = data;
                this.weather = data.weather[0];
                var d = new Date();
                this.Date = d.toDateString();
                this.temprature =  data.main;
                this.temp = (this.temprature.temp - 273.15).toFixed(0)
            })
            this.lat = cityid[0]["lat"] ;
            this.lon = cityid[0]["lon"] ;
            this.selectOption("Hourly");
        }
    }

    getUserIdsFirstWay($event) {
        var cityname = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
        this.cityList1 = [];

        if (cityname.length > 2) {
          if ($event.timeStamp - this.lastkeydown1 > 200) {
             this.cityList1 = this.searchFromArray(this.userData, cityname);
          }
        }
    }

    searchFromArray(arr, cityname) {
        let matches = [], i;
        for (i = 0; i < arr.length; i++) {
          if(arr[i]["name"].includes(cityname)) {
            matches.push(arr[i]);
          }
        }
        return matches;
      };

    //select Auto Complete list city name
    SelectItem(item) {
        (<HTMLInputElement>document.getElementById("userIdFirstWay")).value = item;
          this.cityList1 =[];
    }

    //Show hourly and daily filter data
    selectOption(option)
    {
        if(option == 'Hourly'){
         this.http.get<any>('https://api.openweathermap.org/data/2.5/onecall?lat='+this.lat+'&lon='+this.lon+'&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
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
            this.http.get<any>('https://api.openweathermap.org/data/2.5/onecall?lat='+this.lat+'&lon='+this.lon+'&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
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
