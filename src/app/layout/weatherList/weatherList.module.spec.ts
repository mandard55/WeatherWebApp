import { WeatherListModule } from './weatherList.module';

describe('TablesModule', () => {
    let weatherListModule: WeatherListModule;

    beforeEach(() => {
        weatherListModule = new WeatherListModule();
    });

    it('should create an instance', () => {
        expect(weatherListModule).toBeTruthy();
    });
});
