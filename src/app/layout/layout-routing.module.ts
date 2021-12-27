import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'weatherList', loadChildren: () => import('./weatherList/weatherList.module').then((m) => m.WeatherListModule) },
            { path: 'weatherDetails/:id', loadChildren: () => import('./weatherDetails/weatherDetails.module').then((m) => m.WeatherDetailsModule) },
            { path: 'weatherForecastList', loadChildren: () => import('./weatherForecastList/weatherForecastList.module').then((m) => m.WeatherForecastListModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
