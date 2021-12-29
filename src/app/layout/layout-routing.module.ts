import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'weather-list', loadChildren: () => import('./weather-list/weather-list.module').then((m) => m.WeatherListModule) },
            { path: 'weather-details/:name', loadChildren: () => import('./weather-details/weather-details.module').then((m) => m.WeatherDetailsModule) },
            { path: 'weather-forecast-list', loadChildren: () => import('./weather-forecast-list/weather-forecast-list.module').then((m) => m.WeatherForecastListModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
