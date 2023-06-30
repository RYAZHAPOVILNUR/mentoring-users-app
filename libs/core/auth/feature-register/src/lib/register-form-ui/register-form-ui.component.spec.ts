import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormUiComponent } from './register-form-ui.component';

describe('RegisterFormUiComponent', () => {
  let component: RegisterFormUiComponent;
  let fixture: ComponentFixture<RegisterFormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
