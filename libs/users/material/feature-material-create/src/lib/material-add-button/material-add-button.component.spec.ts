import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialAddButtonComponent } from './material-add-button.component';

describe('MaterialAddButtonComponent', () => {
  let component: MaterialAddButtonComponent;
  let fixture: ComponentFixture<MaterialAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialAddButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
