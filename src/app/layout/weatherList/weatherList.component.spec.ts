import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WeatherListComponent } from './weatherList.component';
import { WeatherListModule } from './weatherList.module';

describe('WeatherListComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [WeatherListModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(WeatherListComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
