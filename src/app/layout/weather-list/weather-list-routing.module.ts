import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherListComponent } from './weather-list.component';

const routes: Routes = [
    {
        path: '',
        component: WeatherListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule {}
