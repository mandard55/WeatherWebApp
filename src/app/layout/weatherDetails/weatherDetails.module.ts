import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { FormRoutingModule } from './weatherDetails-routing.module';
import { WeatherDetailsComponent } from './weatherDetails.component';
import { ModalComponent } from './components';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule],
    declarations: [WeatherDetailsComponent,ModalComponent]
})
export class WeatherDetailsModule {}
