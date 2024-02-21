import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddBtnComponent } from './materials-add-btn.component';

describe('MaterialsAddBtnComponent', () => {
  let component: MaterialsAddBtnComponent;
  let fixture: ComponentFixture<MaterialsAddBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
