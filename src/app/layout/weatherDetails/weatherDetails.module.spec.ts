import { WeatherDetailsModule } from './weatherDetails.module';

describe('WeatherDetailsModule', () => {
    let weatherDetailsModule: WeatherDetailsModule;

    beforeEach(() => {
        weatherDetailsModule = new WeatherDetailsModule();
    });

    it('should create an instance', () => {
        expect(weatherDetailsModule).toBeTruthy();
    });
});
