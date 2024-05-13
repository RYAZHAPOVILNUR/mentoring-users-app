import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsCreateButtonComponent } from './materials-create-button.component';

describe('MaterialsCreateButtonComponent', () => {
  let component: MaterialsCreateButtonComponent;
  let fixture: ComponentFixture<MaterialsCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsCreateButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
