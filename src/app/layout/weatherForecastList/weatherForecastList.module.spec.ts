import { WeatherForecastListModule } from './weatherForecastList.module';

describe('GridModule', () => {
    let weatherForecastListModule: WeatherForecastListModule;

    beforeEach(() => {
        weatherForecastListModule = new WeatherForecastListModule();
    });

    it('should create an instance', () => {
        expect(weatherForecastListModule).toBeTruthy();
    });
});
