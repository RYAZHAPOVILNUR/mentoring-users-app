import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStopwatchComponent } from './profile-stopwatch.component';

describe('ProfileStopwatchComponent', () => {
  let component: ProfileStopwatchComponent;
  let fixture: ComponentFixture<ProfileStopwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStopwatchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileStopwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
