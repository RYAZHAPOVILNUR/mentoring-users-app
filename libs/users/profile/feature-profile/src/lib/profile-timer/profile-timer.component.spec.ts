import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileTimerComponent } from './profile-timer.component';

describe('ProfileTimerComponent', () => {
  let component: ProfileTimerComponent;
  let fixture: ComponentFixture<ProfileTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
