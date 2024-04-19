import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMaterialButtonComponent } from './create-material-button.component';

describe('CreateMaterialButtonComponent', () => {
  let component: CreateMaterialButtonComponent;
  let fixture: ComponentFixture<CreateMaterialButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMaterialButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMaterialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
