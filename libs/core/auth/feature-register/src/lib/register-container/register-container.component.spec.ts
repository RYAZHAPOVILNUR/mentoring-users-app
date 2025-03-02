import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterContainerComponent } from './register-container.component';

describe('RegisterContainerComponent', () => {
  let component: RegisterContainerComponent;
  let fixture: ComponentFixture<RegisterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
