import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddButtonComponent } from './materials-add-button.component';

describe('MaterialsAddButtonComponent', () => {
  let component: MaterialsAddButtonComponent;
  let fixture: ComponentFixture<MaterialsAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
