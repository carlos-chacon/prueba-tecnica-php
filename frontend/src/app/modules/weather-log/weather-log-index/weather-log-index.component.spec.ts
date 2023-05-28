import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLogIndexComponent } from './weather-log-index.component';

describe('WeatherLogIndexComponent', () => {
  let component: WeatherLogIndexComponent;
  let fixture: ComponentFixture<WeatherLogIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherLogIndexComponent]
    });
    fixture = TestBed.createComponent(WeatherLogIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
