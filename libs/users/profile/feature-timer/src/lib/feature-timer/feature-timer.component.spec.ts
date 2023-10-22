import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureTimerComponent } from './feature-timer.component';

describe('FeatureTimerComponent', () => {
  let component: FeatureTimerComponent;
  let fixture: ComponentFixture<FeatureTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
