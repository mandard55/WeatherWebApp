import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-form',
    templateUrl: './weatherDetails.component.html',
    styleUrls: ['./weatherDetails.component.scss'],
    animations: [routerTransition()]
})
export class WeatherDetailsComponent implements OnInit {
    public city;
    public weather;
    public temp;
    public temprature;
    public date;
    public minmaxTemp;
    constructor(private http: HttpClient,private route: ActivatedRoute) {}

    //show details of weather forecast using city id
    ngOnInit() {
         let id = this.route.snapshot.paramMap.get('id');
        this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?id='+id+'&cnt=10&appid=e93ea4b0201bd57e60f0673c24e3fccd').subscribe(data => {
            console.log("Details Recived:- ", data);
            this.city = data.name;
            console.log(this.city );
            this.weather = data.weather[0];
            var d = new Date();
            this.date = d.toDateString();
            this.temprature =  data.main;
            this.temp =  (this.temprature.temp - 273.15).toFixed(0)
            this.minmaxTemp ="min temp :"+ (this.temprature.temp_min - 273.15).toFixed(0)+'°C, max temp :'+(this.temprature.temp_max - 273.15).toFixed(0)+'°C';
        })
    }
}
