import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormRoutingModule } from './weather-details-routing.module';
import { WeatherDetailsComponent } from './weather-details.component';
import { ModalComponent } from './components';

@NgModule({
    imports: [CommonModule, FormRoutingModule],
    declarations: [WeatherDetailsComponent,ModalComponent]
})
export class WeatherDetailsModule {}
