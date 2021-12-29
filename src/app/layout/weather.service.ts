import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  //get weather search by city name
  getWeatherSearchByCity(cityId){
    var promise = new Promise((resolve, reject) => {
        let url = 'https://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=e93ea4b0201bd57e60f0673c24e3fccd';
        this.http.get(url).toPromise().then(
            res => { resolve(res) },
            err =>{ console.log(err); }
        );
    });
    return promise;
  }

  //get weather list
  getWeatherList() {
    var promise = new Promise((resolve, reject) => {
        let url = "https://5c002505-2294-4571-a09f-187f73da9721.mock.pstmn.io/weatherList";
        this.http.get(url).toPromise().then(
            res => { resolve(res) },
            err =>{ console.log(err); }
        );
    });
    return promise;
  }

  //get list of hourly and daily weather
  getWeatherHourlyandDaily(lat, lon) {
    var promise = new Promise((resolve, reject) => {
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd';
        this.http.get(url).toPromise().then(
            res => { resolve(res) },
            err =>{ console.log(err); }
        );
    });
    return promise;
  }

  //get weather forecast list
  getWeatherForecastList() {
    var promise = new Promise((resolve, reject) => {
        let url = "https://7ddd46db-9db1-4790-a865-c1bd6402c575.mock.pstmn.io/weatherForecastList";
        this.http.get(url).toPromise().then(
            res => { resolve(res) },
            err =>{ console.log(err); }
        );
    });
    return promise;
  }
}

