import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherSearchByCity(cityId) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=e93ea4b0201bd57e60f0673c24e3fccd'
    );
  }

  getWeatherList() {
    return this.http.get(
      "https://5c002505-2294-4571-a09f-187f73da9721.mock.pstmn.io/weatherList"
    );
  }

  getWeatherHourlyandDaily(lat, lon) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely&appid=e93ea4b0201bd57e60f0673c24e3fccd'
    );
  }

  getWeatherForecastList() {
    return this.http.get(
      "https://7ddd46db-9db1-4790-a865-c1bd6402c575.mock.pstmn.io/weatherForecastList"
    );
  }


  getWeatherDetails(id) {
    return this.http.get(
        'https://api.openweathermap.org/data/2.5/weather?id='+id+'&cnt=10&appid=e93ea4b0201bd57e60f0673c24e3fccd'
    );
  }


}
