import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileContaynerComponent } from './profile-contayner.component';

describe('ProfileContaynerComponent', () => {
  let component: ProfileContaynerComponent;
  let fixture: ComponentFixture<ProfileContaynerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContaynerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContaynerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
