import { Component, HostListener, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

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
    pageOfItems: Array<any>;
    hourlyData: any[] = [];
    lat: number;
    lon:number;


    constructor(private http: HttpClient) { }
    public isFullListDisplayed: boolean = false;

    //default weather forecast list posted by forecaster
    ngOnInit() {
        this.http.get<any>('https://5c002505-2294-4571-a09f-187f73da9721.mock.pstmn.io/weatherList').subscribe(data => {
            console.log("Data Recived List:- ", data);
            this.pageOfItems = data;
        })
    }
}
