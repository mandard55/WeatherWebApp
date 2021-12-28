import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherForecastListRoutingModule } from './weatherForecastList-routing.module';
import { WeatherForecastListComponent } from './weatherForecastList.component';



@NgModule({
    imports: [CommonModule, NgbCarouselModule, WeatherForecastListRoutingModule],
    declarations: [WeatherForecastListComponent]
})
export class WeatherForecastListModule {}
