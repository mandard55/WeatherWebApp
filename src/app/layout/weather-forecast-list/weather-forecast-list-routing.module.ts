import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastListComponent } from './weather-forecast-list.component';

const routes: Routes = [
    {
        path: '',
        component: WeatherForecastListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeatherForecastListRoutingModule {}
