import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMaterialButtonComponent } from './add-material-button.component';

describe('AddMaterialButtonComponent', () => {
  let component: AddMaterialButtonComponent;
  let fixture: ComponentFixture<AddMaterialButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaterialButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMaterialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
