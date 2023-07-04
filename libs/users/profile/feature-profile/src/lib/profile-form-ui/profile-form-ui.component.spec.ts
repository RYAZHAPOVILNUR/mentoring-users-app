import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileFormUiComponent } from './profile-form-ui.component';

describe('ProfileFormUiComponent', () => {
  let component: ProfileFormUiComponent;
  let fixture: ComponentFixture<ProfileFormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFormUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFormUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
