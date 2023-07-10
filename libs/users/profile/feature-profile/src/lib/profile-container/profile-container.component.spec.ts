import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileContainerComponent } from './profile-container.component';

describe('ProfileContaynerComponent', () => {
  let component: ProfileContainerComponent;
  let fixture: ComponentFixture<ProfileContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
