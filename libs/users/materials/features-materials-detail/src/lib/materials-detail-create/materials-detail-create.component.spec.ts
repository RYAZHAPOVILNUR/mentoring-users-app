import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDetailCreateComponent } from './materials-detail-create.component';

describe('MaterialsDetailCreateComponent', () => {
  let component: MaterialsDetailCreateComponent;
  let fixture: ComponentFixture<MaterialsDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDetailCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
