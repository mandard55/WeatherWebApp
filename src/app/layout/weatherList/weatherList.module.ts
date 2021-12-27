import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesRoutingModule } from './weatherList-routing.module';
import { WeatherListComponent } from './weatherList.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [CommonModule,NgbCarouselModule, TablesRoutingModule, PageHeaderModule,InfiniteScrollModule],
    declarations: [WeatherListComponent]
})
export class WeatherListModule {}
